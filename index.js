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

var data = {
    x: 123
};

io.on('connection', (socket) => {
    console.log("New connection from " + socket.remotePort);
    socket.emit('data', data);
    socket.on('increment', value => {
        data.x += value;
        io.emit('data', data);
    });
});

http.listen(port, () => {
    console.log('listening on :' + port);
});