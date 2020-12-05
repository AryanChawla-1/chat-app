const fs = require('fs')
const roomsnames = []
const addRooms = (roomname)=>{
// saving name 
    const room = loadRooms()
    roomsnames.push(roomname)
    saveRooms(roomsnames)
}
// it saves the notes
const saveRooms = function(room){
    const datason =  JSON.stringify(room)
    fs.writeFileSync('rooms.json', datason)
}

// it reads the data
const loadRooms = function(){
    try {
    const data1 = fs.readFileSync('rooms.json')
    const data = data1.toString()
    return JSON.parse(data)

    } catch(e){
        return []

    }
    
}

const seeRooms = (roomname)=>{
    const index = roomsnames.findIndex((name)=>{
        return roomsnames.roomname === roomname
    })
}

module.exports = {
    seeRooms,
    addRooms
}