const Generator = (username, text)=>{
    return {
        username,
        text,
        Date : new Date().getTime()
    }
}

const generateLocation = (username, url)=>{
    return {
        username,
        url,
        Date : new Date().getTime()
    }
}

module.exports = {
    Generator,
    generateLocation
}