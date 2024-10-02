const dialogueData = [
    {
        "background": "black.jpg",
		"type": "dialogue",
        "dialogue": [
            "Urghh...",
        ]
    },
    {
        "background": "hospital-room-bed.png",
		"type": "dialogue",
        "dialogue": [
            "Where am I?",
            "..."
        ]
    },
    {
        "background": "hospital-room-sitting-orig.png",
		"type": "dialogue",
        "dialogue": [
            "I feel so groggy...",
            "I should lay down...",
            "No! I need to stay awake!",
			"[The door suddenly opens]"
        ]
    },
    {
        "background": "hospital-room-nurse-1.png",
		"type": "dialogue",
        "dialogue": [
			"Oh dear your awake.",
            "Your dosage needs to be increased again dear. Don't worry, I'll let the doctor know asap.",
			"Now, would you kindly take your Xanax.",
			"[The nurse hands you the Xanax bottle from the pile of medication on your bedside cabinet]",
			"Take the medicine:",
        ]
    },
    {
        "background": "hospital-room-nurse-1.png",
		"type": "choice",
		"choices": [
			"Xanax",
			"Modafinil",
			"Adderall",
			"Benadryl",
			"Valium",
		],
		"correct": [1,2],
    },
    {
        "background": "hospital-room-nurse-2.png",
		"type": "dialogue",
        "dialogue": [
            "SPIT IT OUT!",
            "SPIT IT OUT! NOW! YOU STUPID GIRL!",
			"[You swallow the pill]",
        ]
    },
]

const research = {
	"Xanax": "https://pubmed.ncbi.nlm.nih.gov/3655003/",
	"Modafinil": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2654794/",
	"Adderall": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3965894/",
	"Benadryl": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4592307/",
	"Valium": "https://pubmed.ncbi.nlm.nih.gov/3183072/",
}

let altEnabled = false;

document.getElementById('alt-checkbox').addEventListener('change', (event) => {
    altEnabled = event.target.checked;
    // console.log('Alt enabled:', altEnabled);
});


document.getElementById('research-btn').addEventListener('click', () => {
    // Display the overlay
    const overlay = document.getElementById('research-overlay');
    overlay.style.display = 'flex'; // Show the overlay with flex positioning

    // Get the research links container
    const researchLinksContainer = document.getElementById('research-links');
    researchLinksContainer.innerHTML = ''; // Clear any existing content

    // Loop through the research object and create links for each drug
    for (const [drug, url] of Object.entries(research)) {
        // Create a new link element
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.textContent = drug;
        linkElement.target = "_blank"; // Open in a new tab
        linkElement.style.display = 'block'; // Make each link display on a new line
        
        // Append the link to the container
        researchLinksContainer.appendChild(linkElement);
    }
});

// Event listener to close the overlay
document.getElementById('close-research').addEventListener('click', () => {
    document.getElementById('research-overlay').style.display = 'none';
});


let currentScene = 0;
let currentLine = 0;

// Display the first scene
showScene(currentScene, currentLine, altEnabled);

// Set up the next button
document.getElementById('dialogue-box').addEventListener('click', () => {
	let type = dialogueData[currentScene].type
	if (type === "choice") return

    currentLine++;
    if (currentLine >= dialogueData[currentScene].dialogue.length) {
        currentLine = 0;
        currentScene++;
        if (currentScene >= dialogueData.length) {
            currentScene = 0; // Loop back to the first scene (or end the game)
        }
    }

	type = dialogueData[currentScene].type
	if (type === "choice") showChoice(currentScene)
	else showScene(currentScene, currentLine, altEnabled)
});

// Function to display the scene and dialogue
function showScene(sceneIndex, lineIndex, altEnabled) {
    const backgroundElement = document.getElementById('background');
    const dialogueBoxElement = document.getElementById('dialogue-box');
    
    // Clear the dialogue box before adding the dialogue text
    dialogueBoxElement.innerHTML = '';

    // Recreate the dialogue text element
    const dialogueTextElement = document.createElement('p');
    dialogueTextElement.id = 'dialogue-text';
	dialogueTextElement.classList.add('dialogue-text')
    dialogueBoxElement.appendChild(dialogueTextElement);
	
	// Set the background and display dialogue
    const scene = dialogueData[sceneIndex];
	const altLocation = altEnabled ? "dev/" : "";
    const altImagePath = `assets/scenes/${altLocation}${scene.background}`;
    const defaultImagePath = `assets/scenes/${scene.background}`;

    // Create an image to test if the alt image exists
    const img = new Image();
    img.onload = function() {
        // If the alt image loads successfully
        backgroundElement.style.backgroundImage = `url('${altImagePath}')`;
    };
    img.onerror = function() {
        // If the alt image fails to load, fall back to the default image
        backgroundElement.style.backgroundImage = `url('${defaultImagePath}')`;
    };

    // Try to load the alt image
    img.src = altImagePath;

    // Set the dialogue text
    dialogueTextElement.textContent = scene.dialogue[lineIndex];
}

// Function to display the choices
function showChoice(sceneIndex, altEnabled) {
    const backgroundElement = document.getElementById('background');
    const dialogueBoxElement = document.getElementById('dialogue-box');
    const scene = dialogueData[sceneIndex];

    // Clear existing dialogue text and buttons
    dialogueBoxElement.innerHTML = '';

    // Set the background image
    backgroundElement.style.backgroundImage = `url('assets/scenes/${scene.background}')`;

    // Create and append buttons for each choice
    scene.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-button');
        dialogueBoxElement.appendChild(button);

        // Add event listener for each button
        button.addEventListener('click', () => {
            if (scene.correct.includes(index)) {
                currentScene++;
            } else {
                currentScene = 0;
            }
            currentLine = 0; // Reset the line counter for the new scene
            showScene(currentScene, currentLine);
        });
    });
}

