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
    idParent: Number,
    orderTask: Number,
    idColumn: Number,
    titleColumn: String,
    orderColumn: Number
})
const Data = mongoose.model("Data", dataSchema)



mongoose.connect("mongodb://localhost:27017/usersdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => {
    //mongoose.connection.db.dropDatabase()
})

app.use(express.static(__dirname + '/dist'))

app.post('/create', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400)

    if (req.body.idTask) {
        Data.create({
            idTask: req.body.idTask,
            contentTask: req.body.contentTask,
            idParent: req.body.idParent
        }, (err, data) => {
            if (err) return console.log(err)
            res.send(data)
            console.log('Сохранена задача', data)
        })
    }
    if (req.body.idColumn) {
        Data.create({
            idColumn: req.body.idColumn,
            titleColumn: req.body.titleColumn,
            orderColumn: req.body.orderColumn
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
            idParent: req.body.idColumn
        }, (err, data) => {
            if (err) return console.log(err)
            res.send(data)
            console.log('Перенесена задача.', data)
        })
    }
    if (req.body.idColumn && !req.body.idTask) {
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
    if (req.query.idTask) {
        Data.remove({
            idTask: req.query.idTask
        }, (err, result) => {
            if (err) return console.log(err)
            res.send(result)
            console.log('Удалена задача.', result)
        })
    }

    if (req.query.idColumn) {
        Data.remove({
            idColumn: req.query.idColumn
        }, (err, result) => {
            if (err) return console.log(err)
            res.send(result)
            console.log('Колонка удалена.', result)
        })
        // Data.remove({
        //     idParent: req.query.idColumn
        // }, (err, result) => {
        //     if (err) return console.log(err)
        //     res.send(result)
        //     console.log(result)
        // })

    }
})

app.get('/get', (req, res) => {
    Data.find({}, (err, data) => {
        if (err) return console.log(err)
        res.type('json').send(data)
    })
})


// app.get('/get', (rq, rs) => {
//     const filePath = path.resolve(__dirname, './response.json')
//     console.log(chalk.blue('filePath', filePath))
//     fs.readFile(filePath, (error, data) => {
//         if (error) {
//             rs.status('404').send('file not found')
//         }
//         rs.type('json').send(data)
//     })
// })

app.listen(PORT, (error) => {
    if (error) {
        throw error
    }
    console.log(`сервер запущен на порту ${PORT}...`)
})

module.exports = app