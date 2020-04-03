const hotClient = require('webpack-hot-client')
const middleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const config = require('./webpack.config')
const app = require('./stub')

const compiler = webpack(config)
const {
    publicPath
} = config.output
const options = {}
const client = hotClient(compiler, options)
const {
    server
} = client


server.on('listening', () => {
    app.use(middleware(compiler, {
        publicPath
    }))
})






// const http = require('http')
// 

// // const server = http.createServer((req, res) => {
// //     res.end('Hello!!')
// // })

// // server.listen(PORT, (err) =>{
// //     if(err) {
// //         throw err
// //     }
// //     console.log('сервер запущен')
// // })

// const requestResponse = (requst, response) => {
//     console.log('requestResponse')
//     response.end('Hello')
// }

// const server = http.createServer(requestResponse)

// server.listen(PORT, (error) => {
//     if(error) {
//         throw error
//     } 
//     console.log('сервер запущен...')
// })