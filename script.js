document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const startUI = document.getElementById('startUI');
    const contentUI = document.getElementById('contentUI');

    const card = document.getElementById('birthdayCard');
    const hiddenElems = document.querySelectorAll('.hidden-elem');
    const bgm = document.getElementById('bgm');
    const particlesContainer = document.getElementById('particles-container');
    const powerLevel = document.getElementById('powerLevel');
    const slash1 = document.getElementById('slash1');
    const slash2 = document.getElementById('slash2');
    const mainContainer = document.getElementById('mainContainer');

    let isStarted = false;

    // Optional: add a slight hover parallax effect on the card
    document.addEventListener('mousemove', (e) => {
        if (!isStarted) return;
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;
        card.style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1.05)`;
    });

    startBtn.addEventListener('click', () => {
        if (isStarted) return;
        isStarted = true;

        // Try playing BGM
        bgm.volume = 0.6;
        bgm.play().catch(e => console.log("Audio play failed:", e));

        // Hide Start UI and show Content UI
        startUI.style.display = 'none';
        contentUI.style.display = 'block';

        // SWORD SLASH EFFECT!
        slash1.classList.add('slash-active');

        setTimeout(() => {
            slash2.classList.add('slash-active');
        }, 150);

        // Shake the entire container on slash impact
        setTimeout(() => {
            mainContainer.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        }, 250);

        // Sequence Reveal
        setTimeout(() => {
            // Unhide card
            card.classList.add('active');

            // Show Power Level
            setTimeout(() => {
                powerLevel.classList.add('ready');
                startParticles();
            }, 600);

            // Show Texts
            hiddenElems.forEach((elem, index) => {
                setTimeout(() => {
                    elem.classList.add('show-elem');
                }, index * 800 + 1200);
            });
        }, 800); // Trigger after slash is done
    });

    // Particle/Aura Spawner
    function startParticles() {
        setInterval(() => {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 5 + 2; // 2px to 7px
            const left = Math.random() * 100; // 0vw to 100vw
            const duration = Math.random() * 2 + 1; // 1s to 3s

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}vw`;
            particle.style.animationDuration = `${duration}s`;

            // Randomly pick red or purple colors
            const colors = ['#ff1a1a', '#9d00ff', '#f5d300'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

            particlesContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }, 50);
    }
});

// Adding shake keyframes dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
}
`;
document.head.appendChild(style);
