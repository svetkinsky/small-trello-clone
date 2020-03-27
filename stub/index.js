const express = require('express')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const jsonParser = express.json()



const app = express()
const PORT = process.env.PORT || 3000


const dataSchema = new Schema({
    idTask: Number,
    contentTask: String,
    idColumn: Number,
    titleColumn: String
})
const Data = mongoose.model("Data", dataSchema)


mongoose.connect("mongodb://localhost:27017/usersdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.use(express.static(__dirname + '/dist'))

app.post('/create', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400)

    if (req.body.idTask) {
        Data.create({
            idTask: req.body.idTask,
            contentTask: req.body.contentTask,
            idColumn: req.body.idColumn
        }, (err, data) => {
            if (err) return console.log(err)
            res.send(data)
            console.log('Сохранена задача', data)
        })
    } else {
        Data.create({
            idColumn: req.body.idColumn,
            titleColumn: req.body.titleColumn
        }, (err, data) => {
            if (err) return console.log(err)
            res.send(data)
            console.log('Сохранена колонка', data)
        })
    }
})

app.put('/update', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400)

    if (req.body.idTask && !req.body.idColumn) {
        Data.updateOne({
            idTask: req.body.idTask
        }, {
            contentTask: req.body.contentTask
        }, (err, data) => {
            if (err) return console.log(err)
            res.send(data)
            console.log('Обновоена задача.', data)
        })
    }
    if (req.body.idTask && req.body.idColumn) {
        Data.updateOne({
            idTask: req.body.idTask
        }, {
            idColumn: req.body.idColumn
        }, (err, data) => {
            if (err) return console.log(err)
            res.send(data)
            console.log('Перенесена задача.', data)
        })
    }
    if (req.body.idColumn) {
        Data.updateOne({
            idColumn: req.body.idColumn
        }, {
            titleColumn: req.body.titleColumn
        }, (err, data) => {
            if (err) return console.log(err)
            res.send(data)
            console.log('Обновоен заголовок колонки.', data)
        })
    }

})


app.delete('/remove', (req, res) => {
    console.log('REQUEST BODY', req.params.idTask)
    // if (req.params.idTask) {
    Data.remove({
        idTask: req.params.idTask
    }, (err, result) => {
        if (err) return console.log(err)
        res.send(result)
        console.log('Удалена задача ', result)
    })
    // }
})

app.get('/tasks', (req, res) => {
    Data.find({}, (err, data) => {
        if (err) return console.log(err)
        res.type('json').send(data)
    })
})


// app.get('/tasks', (rq, rs) => {
//     const filePath = path.resolve(__dirname, './response.json')
//     console.log(chalk.blue('filePath', filePath))
//     fs.readFile(filePath, (error, data) => {
//         if (error) {
//             rs.status('404').send('file not found')
//         }
//         rs.type('json').send(data)
//     })
//     // rs.send()
// })

// app.get('/test', (rq, rs) => {
//     Task.find({}, function (err, docs) {
//         if (err) return console.log(err)
//         rs.send(docs)
//         console.log(docs)
//     });

// })

app.listen(PORT, (error) => {
    if (error) {
        throw error
    }
    console.log(`сервер запущен на порту ${PORT}...`)
})

module.exports = app