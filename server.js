const express = require('express')
const path = require('path')
const fs = require('fs')
const advice = require('./advice')
//const PORT = process.env.PORT || 3000


//********????Это инициализация того с чем будет работать express???????
const app = express()
const expressHBS = require('express-handlebars').create({defaultLayout: 'main'})  
app.engine('handlebars', expressHBS.engine)  
app.set('view engine', 'handlebars')


app.set('port', process.env.PORT || 3000)

app.use('/', express.static(__dirname + '/public'))




app.use((req, res, next) => {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1'
    next()
})

app.get('/', (req, res) => {
        // const filePath = path.resolve(__dirname, './dist/index.html')
        // fs.readFile(filePath, 'utf-8', (error, data) => {
        //     if (error) {
        //         res.status('404').send('file not found')
        //     }
        //     res.send(data)
        // })
        res.render('home')
    })

app.get('/about', (req, res) => {
   
    res.render('about', {advice: advice.getAdvice(), pageTest: '/qa/tests-about.js'})
})

app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((error, req, res, next) => {
    console.error(error.stack)
    res.status(500)
    res.render('500')
})

app.listen(app.get('port'), (error) => {
        if (error) {
            throw error
        }
        console.log(`сервер запущен на порту ${app.get('port')}...`)
    })

// app.use('/', express.static(__dirname + '/dist')) // 


// 

// 

// 