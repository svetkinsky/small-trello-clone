const express = require('express')
const path = require('path')
const fs = require('fs')
const PORT = process.env.PORT || 3000

const app = express()

app.use('/', express.static(__dirname + '/dist')) // 


app.get('/tasks', (rq, rs) => {
    const filePath = path.resolve(__dirname, './response.json')
    //console.log('filePath', filePath)
    fs.readFile(filePath, (error, data) => {
        if (error) {
            rs.status('404').send('file not found')
        }
        rs.type('json').send(data)
    })
    // rs.send()
})

app.use('/', (rq, rs) => {
    const filePath = path.resolve(__dirname, './dist/index.html')
    //console.log('filePath', filePath)
    //rs.setHeader('content-type', 'text/html')
    fs.readFile(filePath, 'utf-8', (error, data) => {
        if (error) {
            rs.status('404').send('file not found')
        }
        //console.log('data', data)
        rs.send(data)
    })
    // rs.send()
})

app.listen(PORT, (error) => {
    if (error) {
        throw error
    }
    console.log(`сервер запущен на порту ${PORT}...`)
})