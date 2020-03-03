const http = require('http')
const PORT = process.env.PORT || 3000

// const server = http.createServer((req, res) => {
//     res.end('Hello!!')
// })

// server.listen(PORT, (err) =>{
//     if(err) {
//         throw err
//     }
//     console.log('сервер запущен')
// })

const requestResponse = (requst, response) => {
    console.log('requestResponse')
    response.end('Hello')
}

const server = http.createServer(requestResponse)

server.listen(PORT, (error) => {
    if(error) {
        throw error
    } 
    console.log('сервер запущен...')
})