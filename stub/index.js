const express = require('express')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const mongoose = require("mongoose")
const Schema = mongoose.Schema



const app = express()
const PORT = process.env.PORT || 3000


const tasksSchema = new Schema({
    id: Number,
    idParend: Number,
    text: String
})

mongoose.connect("mongodb://localhost:27017/usersdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const Task = mongoose.model("Tasks", tasksSchema)
const task = new Task({
    id: 10,
    idParend: 36,
    text: 'abcd'
});

task.save(function (err) {
    if (err) return console.log(err)
    console.log("Сохранен объект", task)
})


app.use(express.static(__dirname + '/dist'))

app.get('/tasks', (rq, rs) => {
    const filePath = path.resolve(__dirname, './response.json')
    console.log(chalk.blue('filePath', filePath))
    fs.readFile(filePath, (error, data) => {
        if (error) {
            rs.status('404').send('file not found')
        }
        rs.type('json').send(data)
    })
    // rs.send()
})

app.get('/test', (rq, rs) => {
    Task.find({}, function(err, docs){         
        if(err) return console.log(err)
        rs.send(docs)
        console.log(docs)
    });
  
})

app.listen(PORT, (error) => {
    if (error) {
        throw error
    }
    console.log(`сервер запущен на порту ${PORT}...`)
})

module.exports = app