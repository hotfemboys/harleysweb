const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('Een gebruiker is verbonden');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Stuurt naar iedereen
    });

    socket.on('disconnect', () => {
        console.log('Een gebruiker is losgekoppeld');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
