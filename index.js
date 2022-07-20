const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: 'GET,POST,PUT,DELETE,OPTIONS'
    }
});
const port = process.env.PORT || 3000;

const router = express.Router();

app.get("/", (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
});

app.use('/', router);

io.on('connection', (socket) => {
    console.log("New connection from " + socket.id);
    socket.on('addNewPublicationComment', (data) => {
        socket.broadcast.emit('addNewPublicationComment', data);
    });
    socket.on('addNewPublication', (data) => {
        socket.broadcast.emit('addNewPublication', data);
    });
    socket.on('addNewMessage', (data) => {
        socket.broadcast.emit('addNewMessage', data);
    });
    socket.on('notification', (data) => {
        socket.broadcast.emit('notification', data);
    });
});

http.listen(port, () => {
    console.log('listening on :' + port);
});