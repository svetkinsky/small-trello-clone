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

app.get('/clean', (req, res) => {
    mongoose.connection.db.dropDatabase()
    res.send('В БД чисто!')
})

app.use(express.static(__dirname + '/dist'))

app.post('/create', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400)

    if (req.body.idTask) {
        Data.create({
            idTask: req.body.idTask,
            contentTask: req.body.contentTask,
            idParent: req.body.idParent,
            orderTask: req.body.orderTask
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

app.get('/udoc', (req, res) => {
    Data.updateOne({
        orderColumn: 2
    }, {
        orderColumn: 10
    }, (err, data) => {
        if (err) return console.log(err)
        res.send('test update')
    })
})

app.put('/update', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400)

    if (req.body.idTask && !req.body.idColumn && !req.body.Orderstask) {
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
    if (req.body.idTask && req.body.idColumn && !req.body.Orderstask) {
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

    if (req.body.columnOrders) {
        (req.body.columnOrders).forEach(orderData => {
            Data.updateOne({
                idColumn: orderData.id
            }, {
                orderColumn: orderData.order
            }, (err, data) => {
                if (err) return console.log(err)
                console.log('Изменен порядок колонки', data)
            })
        })
        res.send('Изменен порядок колонок')
    }


    if (req.body.taskOrders) {
        //console.log('taskOrders', req.body.taskOrders)
        (req.body.taskOrders).forEach(order => {
            Data.updateOne({
                idTask: order.id
            }, {
                orderTask: order.order
            }, (err, data) => {
                if (err) return console.log(err)
                console.log('Изменен порядок задач', data)
            })

        })
        res.send('Изменен порядок задач')
    }


    // if (req.body.taskOrders) {
    //     //console.log('Orderstask', req.body.Orderstask)
    //     (req.body.Orderstask).forEach(orderData => {
    //         Data.updateOne({
    //             idTask: orderData.id
    //         }, {
    //             orderTask: orderData.order
    //         }, (err, data) => {
    //             if (err) return console.log(err)
    //             console.log('Изменен порядок задач', data)
    //         })
    //     })
    //     res.send('Изменен порядок задач')
    // }
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
        Data.deleteOne({
            idColumn: req.query.idColumn
        }, (err, result) => {
            if (err) return console.log(err)

            //console.log('Колонка удалена.', result)
        })
        Data.deleteMany({
            idParent: req.query.idColumn
        }, (err, result) => {
            if (err) return console.log(err)
            // res.send(result)
            // console.log(result)
        })
        res.send('Колонка удалена полностью.')
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