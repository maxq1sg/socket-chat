const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const router = require('./routes/homeRoute')
const cors = require('cors')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

app.use('/', router)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("message", "welcome to us!!!")
    socket.on("roomAndName", ({ room, name }) => {
        try {
            const user = addUser({ id: socket.id, name, room })
            const usersList = getUsers(room)
            console.log(usersList)
            socket.join(user.room)
        } catch (error) {
            console.log(error)
        }
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(5000, () => {
    console.log('server is running')
})