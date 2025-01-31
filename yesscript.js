document.addEventListener("DOMContentLoaded", () => {
    const images = ['con1.png', 'con3.png', 'con2.png', 'con3.png'];
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
