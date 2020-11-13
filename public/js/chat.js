const socket = io()
const p = document.querySelector('#msg')
const message = document.querySelector('input')
const forma = document.querySelector('form')
const real = message.value 
const button1 = document.querySelector('#message')
const $messages = document.querySelector('#messages')

// templates

const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#template-location-new').innerHTML

// options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix : true })

//elements



// server (emit) --> client(receive) --> acknowledgement(server)
// server (receive) --> client(emit) --> acknowledgement(client)

socket.on('msga', (data)=>{
    console.log(data)
    const html = Mustache.render(messageTemplate , {
        username : data.username,
        message : data.text,
        Date : moment(data.Date).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})
socket.on('location-message', (data)=>{
    console.log(data)
    const html = Mustache.render(locationTemplate, {
        username : data.username,
        url : data.url,
        Date : moment(data.Date).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

forma  .addEventListener('submit', (event)=>{
    //disable
    event.preventDefault()

    button1.setAttribute('disabled', 'disabled')

    const dat = event.target.elements.messages.value
    
    //enable
    socket.emit('messages', dat, (error)=>{
        button1.removeAttribute('disabled')
        message.value = ''
        message.focus()
        if(error){
            return console.log(error)
        }
        
        console.log('the message is delievered')
    })
})

document.querySelector('#location').addEventListener('click', (event)=>{
    event.preventDefault()
    if(!navigator.geolocation){
        return alert('update for geolocation')
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('location', {
            lat : position.coords.latitude,
            lon : position.coords.longitude
        })
    })
})

socket.emit('join',  {username, room}, (error)=>{
    if(error){
        alert(error)
        location.href = '/'
    }
})