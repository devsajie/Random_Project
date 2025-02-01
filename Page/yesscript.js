document.addEventListener("DOMContentLoaded", () => {
    const images = ['images/con1.png', 'images/con3.png', 'images/con2.png', 'images/con3.png'];
    let currentImageIndex = 0;

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundImage = `url(${images[currentImageIndex]})`;
        currentImageIndex = (currentImageIndex + 1) % images.length;
        document.body.appendChild(confetti);
        
        // Remove the confetti after the animation to avoid clutter
        setTimeout(() => {
            document.body.removeChild(confetti);
        }, 10000);
    }
    // Spawn a confetti immediately
    createConfetti();

    // Spawn a new confetti every 3 seconds
    setInterval(createConfetti, 3000)
});
