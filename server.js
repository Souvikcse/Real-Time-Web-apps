const express = require('express')
const socketio = require('socket.io')

const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

let usersockets = {}

io.on('connection', (socket) => {                                    //this gets copied for every socket created
                                                                       // and socketid is unique for every socket formed
    console.log('New socket formed from: '+ socket.id)
    socket.emit('connected')
    socket.on('login', (data) => {
        usersockets[data.user] = socket.id
    })
    socket.on('msg', (data) => {
        if (data.message.startsWith('@')){
            let recipient = data.message.split(' ')[0].substr(1)
            let recp_socket = usersockets[recipient]
            io.to(recp_socket).emit('recev_msg', data)
        }
        else {
        // io.emit('recev_msg', data)  used for sending to every connection
        // socket.broadcast.emit sends it to only others not itself (client)
        socket.broadcast.emit('recev_msg', data)
        }
    })
})

app.use('/', express.static(__dirname + '/public'))
server.listen(9999, () => {console.log('Website up on: http://localhost:9999')})