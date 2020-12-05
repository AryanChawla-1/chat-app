const users = []

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({id, username, room})=>{

    //validate
    if(!username || !room){
        return {
            error : 'Username and room are required!'
        }
    }

    // check for existing users
    const existUser = users.find((user)=>{
        return user.room === room && user.username === username
    })

    //validate username
    if(existUser){
        return{
            error : 'Username in use'
        }
    }

    //store user 
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id === id
    })
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id)=>{
    const userId = users.find((user)=>{
        return user.id === id
    })
    users.push(userId)
    return{ userId }
}

const getUsersInRoom = (room)=>{
    const usersinRoom = users.filter((user)=>{
        return user.room === room
    })
    users.push(usersinRoom)
    return{ usersinRoom }
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
