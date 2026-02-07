// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const urlFrom = urlParams.get("from");
const urlTo = urlParams.get("to");

// Elements
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const startCard = document.getElementById("startCard")
const mainCard = document.getElementById("mainCard");
const yesScreen = document.getElementById("yesScreen");
const createLinkBtn = document.getElementById("createLinkBtn");
const errorMsg = document.getElementById("error");
const displayFromName = document.getElementById("displayFromName");
const displayToName = document.getElementById("displayToName");

if (!urlFrom && !urlTo) {
    mainCard.classList.add("hidden")
    startCard.classList.remove("hidden")
} else {
    startCard.classList.add("hidden")

}

displayToName.innerText = urlTo;

createLinkBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const from = document.querySelector('input[placeholder="from"]').value;
    const to = document.querySelector('input[placeholder="to"]').value;

    if (to) {
        const link = `https://will-you-be-my-valentine-theta-five.vercel.app/?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;

        const a = document.createElement("a"); // Use document, not startCard
        a.setAttribute("href", link);
        a.setAttribute("target", "_blank"); // Open in new tab
        a.innerText = link; // Use = not () for innerText
        a.style.display = "block";
        a.style.marginTop = "15px";
        a.style.padding = "10px";
        a.style.background = "#f0f7ff";
        a.style.borderRadius = "8px";
        a.style.wordBreak = "break-all";
        a.style.textDecoration = "none";
        a.style.color = "#ff758c";

        const buymeacoffee = document.createElement("a");
        buymeacoffee.setAttribute("href", "https://buymeacoffee.com/krishsehgal");
        buymeacoffee.setAttribute("target", "_blank");
        buymeacoffee.innerText = "Buy me a Coffee"
        buymeacoffee.style.display = "block";
        buymeacoffee.style.marginTop = "25px";
        buymeacoffee.style.padding = "15px";
        buymeacoffee.style.background = "#3f99ff";
        buymeacoffee.style.color = "#313131"
        buymeacoffee.style.textDecoration = "none";
        buymeacoffee.style.borderRadius = "15px";

        startCard.appendChild(a);
        startCard.appendChild(buymeacoffee);
    } else {
        errorMsg.innerText = "aap uska naam likhna bhul gaye ha"
        setTimeout(() => {
            errorMsg.innerText = ""
        }, 2000)
    }
})

// No button escape behavior
function moveNoButton() {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

// Yes button click
yesBtn.onclick = () => {
    mainCard.classList.add("hidden");
    yesScreen.classList.remove("hidden");
    createConfetti();
};

// Confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#c06c84', '#f67280', '#ff8fab', '#ffd5e5'];
    const symbols = ['❤️', '💕', '💖', '💗', '💝', '✨', '💘'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
            confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            confetti.style.zIndex = '10000';
            confetti.style.pointerEvents = 'none';

            document.body.appendChild(confetti);

            const duration = 3000 + Math.random() * 2000;
            const drift = (Math.random() - 0.5) * 100;
            const startTime = Date.now();

            function animate() {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / duration;

                if (progress < 1) {
                    const yPos = progress * 120;
                    const xPos = Math.sin(progress * Math.PI * 2) * drift;
                    confetti.style.top = yPos + '%';
                    confetti.style.transform = `translateX(${xPos}px) rotate(${progress * 360 * 3}deg)`;
                    confetti.style.opacity = 1 - progress;
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            }

            animate();
        }, i * 50);
    }
}

if (urlFrom) {
    displayFromName.innerText = `— ${urlFrom}`
} else {
    displayFromName.innerText = '— Your Secret Admirer'
}