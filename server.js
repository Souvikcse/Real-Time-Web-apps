const express = require('express')
const socketio = require('socket.io')

const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {                                    //this gets copied for every socket created
                                                                       // and socketid is unique for every socket form
    console.log('New socket formed from: '+ socket.id)
    socket.emit('connected')
    socket.on('msg', (data) => {
        // io.emit('recev_msg', data)  used for sending to every connection
        // socket.broadcast.emit sends it to only others not itself (client)
        socket.broadcast.emit('recev_msg', data)
    })
})

app.use('/', express.static(__dirname + '/public'))
server.listen(9999, () => {console.log('Website up on: http://localhost:9999')})