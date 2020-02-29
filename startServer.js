const http = require('http')
const PORT = process.env.PORT || 3000

const requestResponse = (requst, response) => {
    console.log('requestResponse')

    response.end('response.end')
}

const server = http.createServer(requestResponse)

server.listen(PORT, (error) => {
    if(error) {
        throw error
    } 
    console.log('сервер запущен')
})