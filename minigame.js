let score = 0
let maxScore = 10
let timer = 16

// Function to start the mini-game
function startMiniGame(sceneIndex, intervalMs = 100) {
    const minigameOverlay = document.getElementById('minigame-overlay');
    const minigameContainer = document.getElementById('minigame-container');
    const scoreDisplay = document.getElementById('score');

    const scene = sceneData[sceneIndex];

    // Show the mini-game overlay
    minigameOverlay.style.display = 'flex';
    
    // Reset score
    score = 0;
    scoreDisplay.textContent = `Life Regained: ${score}`;

    // Continuously spawn characters as long as the game is running
    let spawnInterval = setInterval(() => {
		timer -= intervalMs / 1000

        if (score >= maxScore || timer <= 0) {
            clearInterval(spawnInterval)
            endMiniGame();
        } else {
			const chance = Math.random()
			const spawnChance = 0.2

            if (chance < spawnChance * 0.7) spawnCharacter(minigameContainer, false, scene);
			else if (chance < spawnChance) spawnCharacter(minigameContainer, true, scene);
        }
    }, intervalMs)
}

// Function to spawn a character at a random position
function spawnCharacter(container, ally, scene) {
	let charArray = ally ? scene.allies : scene.enemies
	const charIndex = Math.floor(Math.random() * charArray.length)
	const charImg = charArray[charIndex]

    const character = document.createElement('div');
    character.classList.add('character');
    character.style.backgroundImage = `url("assets/minigame/${charImg}")`;
    character.style.top = `${Math.random() * 80}vh`; 
    character.style.left = `${Math.random() * 80}vw`;

    // Add character to the container
    container.appendChild(character);

    // Handle click to shoot the character
    character.addEventListener('click', () => {
        container.removeChild(character);
        if (ally) score--;
		else score++;
        document.getElementById('score').textContent = `Life Regained: ${score}`;
    });

    // Make the character disappear after 2 seconds if not clicked
    setTimeout(() => {
        if (container.contains(character)) {
            container.removeChild(character);
        }
    }, 2000); // 2 seconds duration before disappearing
}

// Function to end the mini-game
function endMiniGame() {
    const minigameOverlay = document.getElementById('minigame-overlay');
    const minigameContainer = document.getElementById('minigame-container');

    // Hide mini-game and clear characters
    minigameOverlay.style.display = 'none';
    minigameContainer.innerHTML = ''; // Clear the characters
}
