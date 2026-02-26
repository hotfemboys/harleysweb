const socket = io();

// Vraag gebruikersnaam bij het laden
let username = '';
while (!username) {
    username = prompt("Voer je gebruikersnaam in:");
}

const colors = [
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
    '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe'
];

// Wijs een kleur toe op basis van de gebruikersnaam
const userColor = colors[username.length % colors.length];

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', {
            user: username,
            text: input.value
        });
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    const item = document.createElement('div');
    item.classList.add('message');

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('username');
    nameSpan.textContent = msg.user + ':';
    
    // kleur per gebruiker
    nameSpan.style.color = colors[msg.user.length % colors.length];

    const textSpan = document.createElement('span');
    textSpan.textContent = ' ' + msg.text;

    item.appendChild(nameSpan);
    item.appendChild(textSpan);
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});
