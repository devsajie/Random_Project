const noButton = document.getElementById('no-button');
const boundingBox = document.getElementById('bounding-box');
const yesButton = document.getElementById("yes-button");

// Generate random positions for the balloons
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');

    // Randomize balloon position horizontally across the entire width of the screen
    balloon.style.left = `${Math.random() * window.innerWidth}px`;

    // Apply an animation delay to stagger balloon movements
    balloon.style.animationDelay = `${Math.random() * 0.1}s`;

    document.body.appendChild(balloon);

    // Remove balloon after animation ends
    balloon.addEventListener('animationend', () => {
        balloon.remove();
    });
}

// Spawn balloons continuously
setInterval(createBalloon, 400);

// Function to move the "NO" button to a random position within the bounding box
function moveNoButton() {
    const boxRect = boundingBox.getBoundingClientRect();
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    // Generate random positions within the bounding box
    let newLeft = Math.random() * (boxRect.width - buttonWidth);
    let newTop = Math.random() * (boxRect.height - buttonHeight);

    // Ensure the button stays within the bounding box
    noButton.style.position = 'absolute';
    noButton.style.left = `${newLeft}px`;
    noButton.style.top = `${newTop}px`;
}

//###############################################################################

// Function to increase the size of the "YES" button by a factor of 1.5
function increaseYesButtonSize() {
    let currentScale = parseFloat(yesButton.style.transform.replace("scale(", "").replace(")", "")) || 1;
    yesButton.style.transform = `scale(${currentScale * 1.5})`;
}

//###############################################################################

// Event listeners for hover and click events
noButton.addEventListener("mouseenter", () => {
    moveNoButton();
    increaseYesButtonSize(); // Increase size of YES button
});
noButton.addEventListener("click", () => {
    moveNoButton();
    increaseYesButtonSize(); // Increase size of YES button
});

document.addEventListener("DOMContentLoaded", () => {
    const yesButton = document.getElementById("yes-button");
    const noButton = document.getElementById("no-button");

    yesButton.addEventListener("click", () => {
        window.location.href = "./Page/yes.html"; // Redirect to yes.html
    });
});
