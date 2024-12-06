const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const voiceSelect = document.getElementById("voiceSelect");

const speechSynth = window.speechSynthesis;
let voices = [];

function loadVoices() {
    voices = speechSynth.getVoices();
    console.log(voices);  // Check available voices

    voiceSelect.innerHTML = ''; // Clear current options
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

speechSynth.onvoiceschanged = function () {
    setTimeout(loadVoices, 100); // Retry if voices are empty
};

loadVoices();

convertBtn.addEventListener('click', function () {
    const enteredText = text.value;
    const error = document.querySelector('.error-para');
    const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);

    if (!speechSynth.speaking && !enteredText.trim().length) {
        error.textContent = `Nothing to Convert! Enter text in the text area.`;
        error.classList.add("visible");
    } else {
        error.classList.remove("visible");
        const newUtter = new SpeechSynthesisUtterance(enteredText);

        if (selectedVoice) {
            newUtter.voice = selectedVoice;
        } else {
            console.error('No voice selected');
        }

        speechSynth.speak(newUtter);

        convertBtn.classList.add("loading");
        convertBtn.textContent = "Sound is Playing...";

        newUtter.onend = function () {
            setTimeout(() => {
                convertBtn.classList.remove("loading");
                convertBtn.textContent = "Play Converted Sound";
            }, 500);
        };
    }

    setTimeout(() => {
        error.classList.remove("visible");
    }, 3000);
});

particlesJS('particles-js', {
    particles: {
        number: {
            value: 80
        },
        size: {
            value: 3
        },
        move: {
            speed: 2
        },
        line_linked: {
            enable_auto: true,
            color: "#00ff00",
            opacity: 0.4,
            width: 1
        }
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            }
        }
    }
});