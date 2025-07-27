let speech = document.getElementById("speech");
let helper = document.getElementById("helper");
const downloadBtn = document.getElementById("downloadBtn");

const messages = [
    "Welcome to Idleon!",
    "Idleon is an idle MMO where progress never stops!",
    "Train multiple characters at once!",
    "Explore 6 worlds and fight epic bosses!",
    "Even offline, your team keeps farming!",
    "Click below to download Idleon!",
    "Ready for an adventure? Join now!"
];

const exitKeywords = ["download", "join"];
const speechSound = new Audio("sound/bystroe-bormotanie.mp3");
speechSound.loop = true;
speechSound.volume = 0.6;

let index = 0;
let disappeared = false;
let disappearTriggerCount = 0;

// Запуск хелпера сразу
activateHelper();

function activateHelper() {
    speechSound.play().catch(() => {
        window.addEventListener("click", () => {
            speechSound.play().catch(() => { });
        }, { once: true });
    });

    setInterval(updateSpeech, 3000);
    setInterval(moveHelperSmoothly, 2500);
    setInterval(() => {
        if (!disappeared && Math.random() < 0.5) randomScroll();
    }, 20000);
}

function updateSpeech() {
    if (disappeared) return;

    index = (index + 1) % messages.length;
    const currentMessage = messages[index].trim().toLowerCase();

    speech.style.opacity = 0;

    setTimeout(() => {
        speech.textContent = messages[index];
        speech.appendChild(downloadBtn);

        const shouldDisappear = exitKeywords.some(word => currentMessage.includes(word));
        if (shouldDisappear) {
            downloadBtn.style.display = "block";
            disappearTriggerCount++;
        } else {
            downloadBtn.style.display = "none";
        }

        if (disappearTriggerCount >= 2) {
            setTimeout(() => {
                helper.style.transition = "opacity 1s";
                helper.style.opacity = 0;
                speechSound.pause();
                speechSound.currentTime = 0;
                disappeared = true;
                setTimeout(() => helper.remove(), 1000);
            }, 3000);
        }

        speech.style.opacity = 1;
    }, 300);
}

function moveHelperSmoothly() {
    if (disappeared) return;

    const windowWidth = window.innerWidth - 120;
    const windowHeight = window.innerHeight - 120;
    const randomX = Math.floor(Math.random() * windowWidth);
    const randomY = Math.floor(Math.random() * windowHeight);

    helper.style.left = `${randomX}px`;
    helper.style.top = `${randomY}px`;
}

function randomScroll() {
    if (disappeared) return;

    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const randomScrollY = Math.floor(Math.random() * maxScroll);
    window.scrollTo({ top: randomScrollY, behavior: "smooth" });
}
