const chat = document.getElementById('chat');
const input = document.getElementById('textInput');
const send = document.getElementById('send');
const mic = document.getElementById('mic');
const state = document.getElementById('state');

function addMessage(text, who) {
  const el = document.createElement('div');
  el.className = `message ${who}`;
  el.textContent = text;
  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
}

function localReply(text) {
  const t = text.toLowerCase();
  if (t.includes('hello') || t.includes('hi')) return "Hello, Mr. Hazil. Vexa is ready. ⚡";
  if (t.includes('what can you do')) return "In this web prototype I can chat, use your browser's voice recognition when supported, and speak replies. The next stage can connect a real AI backend and phone-agent system.";
  if (t.includes('time')) return `Your browser's local time is ${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}.`;
  if (t.includes('who are you')) return "I'm Vexa — the prototype identity for Mr. Hazil's personal AI assistant.";
  return `I received: "${text}". The web prototype is ready for a real AI model connection.`;
}

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1.02;
  u.pitch = 1.0;
  speechSynthesis.speak(u);
}

function sendText(text = input.value.trim()) {
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  state.textContent = 'Vexa is thinking...';
  setTimeout(() => {
    const reply = localReply(text);
    addMessage(reply, 'vexa');
    speak(reply);
    state.textContent = 'Ready when you are.';
  }, 450);
}

send.addEventListener('click', () => sendText());
input.addEventListener('keydown', e => { if (e.key === 'Enter') sendText(); });

document.querySelectorAll('.quick button').forEach(b => {
  b.addEventListener('click', () => sendText(b.dataset.msg));
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  mic.addEventListener('click', () => {
    try {
      recognition.start();
      mic.classList.add('listening');
      state.textContent = 'Vexa is listening...';
    } catch (_) {}
  });

  recognition.onresult = e => {
    input.value = e.results[0][0].transcript;
    sendText();
  };
  recognition.onerror = () => {
    state.textContent = 'Voice input was unavailable.';
  };
  recognition.onend = () => {
    mic.classList.remove('listening');
    if (state.textContent === 'Vexa is listening...') state.textContent = 'Ready when you are.';
  };
} else {
  mic.addEventListener('click', () => {
    state.textContent = 'Voice recognition is not supported by this browser.';
  });
}
