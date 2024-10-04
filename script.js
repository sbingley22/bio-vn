let altEnabled = false;
let popUpEnabled = true;

document.getElementById('alt-checkbox').addEventListener('change', (event) => {
    altEnabled = event.target.checked;
});

document.getElementById('popup-checkbox').addEventListener('change', (event) => {
    popUpEnabled = event.target.checked;
});

document.getElementById('research-btn').addEventListener('click', (event) => {
	event.preventDefault()

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
        linkElement.style.display = 'block';

		if (popUpEnabled) {
		   // Open the link in a popup window when clicked
			linkElement.addEventListener('click', (e) => {
				e.preventDefault()
				window.open(url, '_blank', 'width=800,height=900,scrollbars=yes,screenX=10,screenY=10,left=30%,top=10%');
			}); 
			// Append the link to the container
			researchLinksContainer.appendChild(linkElement);
		}
		else {
			linkElement.target = "_blank"; // Open in a new tab
		}
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
	let type = sceneData[currentScene].type
	if (type === "choice") return

    currentLine++;
    if (currentLine >= sceneData[currentScene].dialogue.length) {
        currentLine = 0;
        currentScene++;
		if (type === "failure") {
			currentScene = 0
		}
        if (currentScene >= sceneData.length) {
            currentScene = 0; // Loop back to the first scene (or end the game)
        }
    }

	type = sceneData[currentScene].type
	if (type === "choice") showChoice(currentScene)
	else showScene(currentScene, currentLine, altEnabled)
});

function loadBgImg(scene, altEnabled, backgroundElement) {
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
}

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
    const scene = sceneData[sceneIndex];
	loadBgImg(scene, altEnabled, backgroundElement)

    // Set the dialogue text
    dialogueTextElement.textContent = scene.dialogue[lineIndex];
}

// Function to display the choices
function showChoice(sceneIndex, altEnabled) {
    const backgroundElement = document.getElementById('background');
    const dialogueBoxElement = document.getElementById('dialogue-box');
    const scene = sceneData[sceneIndex];

    // Clear existing dialogue text and buttons
    dialogueBoxElement.innerHTML = '';

    // Set the background image
	loadBgImg(scene, altEnabled, backgroundElement)

    // Create and append buttons for each choice
    scene.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-button');
        dialogueBoxElement.appendChild(button);

        // Add event listener for each button
        button.addEventListener('click', () => {
            if (scene.correct.includes(index)) {
                currentScene += 2
            } else {
                currentScene += 1
            }
            currentLine = 0; // Reset the line counter for the new scene
            showScene(currentScene, currentLine);
        });
		
		// Add right-click event listener for research popup
        button.addEventListener('contextmenu', (event) => {
            event.preventDefault(); // Prevent the default right-click menu

            const researchUrl = research[choice]; // Get the research URL from the research object

            if (researchUrl) {
                // Open a popup window with the research link
				window.open(researchUrl, '_blank', 'width=800,height=900,scrollbars=yes,screenX=10,screenY=10,left=30%,top=10%');
            } else {
                console.log('No research available for this choice.');
            }
        });

    });
}

