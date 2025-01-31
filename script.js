// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to generate a random color palette
function generateRandomPalette() {
    const palette = [];
    const numberOfColors = Math.floor(Math.random() * 2) + 4; // 4 to 5 colors
    for (let i = 0; i < numberOfColors; i++) {
        palette.push(getRandomColor());
    }
    return palette;
}

// Function to display the color palette
function displayPalette(palette) {
    const paletteDisplay = document.getElementById('paletteDisplay');
    paletteDisplay.innerHTML = ''; // Clear previous palette
    palette.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color;
        colorBox.addEventListener('click', () => copyToClipboard(color));
        colorBox.title = color; // Show hex code on hover
        paletteDisplay.appendChild(colorBox);
    });
}

// Function to copy hex code to clipboard
function copyToClipboard(color) {
    navigator.clipboard.writeText(color).then(() => {
        alert(`Copied ${color} to clipboard!`);
    });
}

// Function to save the current palette to local storage
function savePalette(palette) {
    const existingPalettes = JSON.parse(localStorage.getItem('colorPalettes')) || [];
    existingPalettes.push(palette);
    localStorage.setItem('colorPalettes', JSON.stringify(existingPalettes));
}

// Function to load saved palettes from local storage
function loadPalettes() {
    const existingPalettes = JSON.parse(localStorage.getItem('colorPalettes')) || [];
    const savedPalettesDisplay = document.getElementById('savedPalettesDisplay');
    savedPalettesDisplay.innerHTML = ''; // Clear previous saved palettes
    existingPalettes.forEach((palette, index) => {
        const paletteDiv = document.createElement('div');
        paletteDiv.innerText = `Palette ${index + 1}: ${palette.join(', ')}`;
        savedPalettesDisplay.appendChild(paletteDiv);
    });
}

// Event listeners
document.getElementById('generatePaletteButton').addEventListener('click', () => {
    const palette = generateRandomPalette();
    displayPalette(palette);
});

document.getElementById('