let speech = new SpeechSynthesisUtterance();
let button = document.querySelector('button');
let selectVoice = document.querySelector('select');
let voices = [];

// Função para carregar e exibir as vozes
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    selectVoice.innerHTML = '';
    voices.forEach((voice, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.innerHTML = `${voice.name} (${voice.lang})`;
        selectVoice.appendChild(option);
    });
    // Define a voz padrão
    if (voices.length > 0) {
        speech.voice = voices[0];
    }
}

// Verifica se as vozes estão carregadas
if (typeof speechSynthesis.onvoiceschanged !== 'undefined') {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// Carrega as vozes na inicialização e exibe no console
window.onload = () => {
    loadVoices();
    if (voices.length === 0) {
        setTimeout(loadVoices, 100); // Tenta carregar as vozes novamente após um pequeno atraso
    }
    const availableVoices = window.speechSynthesis.getVoices();
    console.log("Vozes disponíveis:");
    availableVoices.forEach((voice, index) => {
        console.log(`${index}: ${voice.name} (${voice.lang})`);
    });
};

button.addEventListener('click', () => {
    speech.text = document.querySelector('textarea').value;
    window.speechSynthesis.speak(speech);
});

selectVoice.addEventListener('change', () => {
    speech.voice = voices[selectVoice.value];
});

// Verifica suporte à API de síntese de fala
if (!('speechSynthesis' in window)) {
    alert('Desculpe, seu navegador não suporta a API de síntese de fala.');
}
