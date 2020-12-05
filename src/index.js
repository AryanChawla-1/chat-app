const socketio = require('socket.io')
const http = require('http')
const express = require('express')
const path = require('path')
const bad  = require('bad-words')
const { Generator, generateLocation } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')
const { addRooms, seeRooms } = require('./utils/rooms')
//main constants
const app = express()
const server = http.createServer(app)
const io = socketio(server)
//path 
const htmlStatic = path.join(__dirname, '../public')
app.use(express.static(htmlStatic))

app.set('views', htmlStatic)





io.on('connection', (socket)=>{
    console.log('welcome')

    socket.on('join', ({username, room}, callback)=>{
        const { error, user} = addUser({ id: socket.id, username, room })

        if(error){
            return callback(error)
        }
        socket.join(user.room)
        socket.emit('msga', Generator('Admin','Welcome!!'))
        socket.broadcast.to(user.room).emit('msga', Generator('Admin', `${user.username} has joined!!`))
        callback()
        socket.on('messages', (data, callback)=>{
        
            const filter = new bad()
    
            if(filter.isProfane(data)){
                return callback('bad words are not allowed')
            }
            
            io.to(user.room).emit('msga', Generator(user.username, data))
            callback()
        
        
        
    
        socket.on('location', (data)=>{
            io.to(user.room).emit('location-message', generateLocation(user.username, `https://google.com/maps?q=${data.lat},${data.lon}`))
        })
        })
    
    })

    // socket.emit, io.emit, socket.broadcast.emit
    // io.to.emit, socket.broadcast.to.emit
    
socket.on('disconnect', ()=>{
    const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('msga', Generator(`${user.username} has disconnected!`))
        }        
        
    })
})

app.get('', (req, res)=>{
    res.render('index.html')
})
//server start
server.listen(3000, ()=>{
    console.log('server is up and running')
})
