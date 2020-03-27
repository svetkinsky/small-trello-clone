import './styles/scss.scss'
//import './xhr'

import {
    changeBackground
} from './changeBackground'
import {
    Task
} from './task'
import {
    Column
} from './column'
// import {
//     Xhr
// } from './xhr'

const axios = require('axios')

axios.get('/tasks')
    .then(function (response) {
        run(response)
    }).catch(error => console.log(error))

// axios.get('/test')
//     .then(function (response) {
//         console.log('MongoDB data: ', response.data)
//     })



const backgroundImage = ['url(/backgrounds/kordan1.jpg)', 'url(/backgrounds/kordan2.jpg)', 'url(/backgrounds/kordan3.jpg)', 'url(/backgrounds/kordan4.jpg)', 'url(/backgrounds/kordan5.jpg)', 'url(/backgrounds/kordan6.jpg)']

changeBackground.create(backgroundImage)

let columnAdd = document.querySelector('.column-add')
let columns = document.querySelectorAll('.column')
let editItems = document.querySelectorAll('.edit')
//console.log('EDIT ITEMS: ', editItems)



//let respJSON = response 

//let respJSON = Xhr.getTasks()

// respJSON.then((data) =>{
//     run(data)
// })

const run = (getTaskData) => {
    console.log('getTaskData: ', getTaskData)
    console.log('type of getTaskData: ', typeof getTaskData.data)

    const columnList = document.querySelector('.column-list')


    //проверка на "ошибки"
    if (getTaskData.status !== 0) {
        console.log('Error')
    }




    //массив колонок с "бэка"
    const content = getTaskData //.content || []

    //максимальные id колонки и задачи
    let maxIdTaskCandidate = 0
    let maxIdColumnCandidate = 0

    //перебор массива контента (колонок) с json (бэка), создание и добавление новой колонки и заполнение ее контентом с "бэка"
    //здесь column - элемент массива content
    content.forEach((column) => {
        if (maxIdColumnCandidate < column.id) {
            maxIdColumnCandidate = column.id
        }

        //массив задач текущей колонки
        const tasks = column.tasks || []

        const newColumn = Column.create(column.id, column.name)
        //перебор массива задач для добавления их в колонку
        tasks.forEach((taskElement) => {
            if (maxIdTaskCandidate < taskElement.id) {
                maxIdTaskCandidate = taskElement.id
            }
            const newTask = Task.create(taskElement.id, taskElement.text)
            newColumn.querySelector('.list').append(newTask)

        })



        columnList.append(newColumn)
    })
    Column.maxIdTask = maxIdTaskCandidate
    console.log('maxIdTaskCandidate', maxIdTaskCandidate)


    //создание и добавление новой колонки при нажатии на кнопку "Добавьте еще одну колонку" 
    columnAdd.addEventListener('click', function () {

        columnList.append(Column.create(++maxIdColumnCandidate))

        //фокус на заголовке новой колонки
        const lastColumnHead = columnList.lastChild.querySelector('.column-header')
        const lastColumnTitle = lastColumnHead.querySelector('.column-title')

        console.log(lastColumnHead)

        lastColumnTitle.setAttribute('contenteditable', 'true')
        lastColumnTitle.focus()
        lastColumnTitle.addEventListener('blur', () => {
            lastColumnTitle.removeAttribute('contenteditable')

            if (!Column.edit) {
                axios.post('/create', {
                        idColumn: lastColumnTitle.parentElement.getAttribute('data-column-id'),
                        titleColumn: lastColumnTitle.innerHTML
                    }).then(response => console.log(response))
                    .catch(error => console.log(error))
            }
        })
        //console.log('maxIdColumnCandidate: ', maxIdColumnCandidate)
    })




    //let  = false


    //навешивание drug&drop на все задачи и запрос на удаление
    document.querySelectorAll('[data-task-id]').forEach((task) => {
        Task.addDragEndDropEventToTask
        Task.contextMenuEvent(task)
    })

    //навешивание drug&drop на все колонки и запрос на удаление
    document.querySelectorAll('[data-column-id]').forEach((column) => {
        Column.addDragEndDropEventToColumn
        const columnTitle = column.querySelector('.column-header')
        Task.contextMenuEvent(columnTitle)
    })

}