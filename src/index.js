import './styles/scss.scss'


import {
    changeBackground
} from './changeBackground'
import {
    Task
} from './task'
import {
    Column
} from './column'
import {
    ContextMenuEvent
} from './contextMenuEvent'


const axios = require('axios')

axios.get('/get')
    .then(function (response) {
        run(response.data)
    }).catch(error => console.log(error))


const backgroundImage = ['url(/backgrounds/kordan1.jpg)', 'url(/backgrounds/kordan2.jpg)', 'url(/backgrounds/kordan3.jpg)', 'url(/backgrounds/kordan4.jpg)', 'url(/backgrounds/kordan5.jpg)', 'url(/backgrounds/kordan6.jpg)']

changeBackground.create(backgroundImage)

let columnAdd = document.querySelector('.column-add')
let columns = document.querySelectorAll('.column')
let editItems = document.querySelectorAll('.edit')
const columnList = document.querySelector('.column-list')


const run = (getData) => {
    // console.log('getData: ', getData)
    // console.log('type of getData.data: ', typeof getData.data)



    //проверка на "ошибки"
    if (getData.status == 0) {
        console.log('Error: ', getData.status)
    }


    //массив колонок с "бэка"
    //const content = getData //|| []

    console.log('content from DB', getData)

    const contentTasks = []
    const contentColumns = []

    // getData.forEach(data => {
    //     if (data.idTask) {
    //         // console.log('DATA idTask', data.idTask)
    //         contentTasks.push(data)
    //     }
    //     if (data.idColumn) {
    //         console.log('DATA Column', data)
    //         contentColumns.push(data)
    //     }
    // })

    getData.forEach(data => {
        if (data.idColumn) {

            contentColumns.forEach(column => {
                if (column.idColumn === data.idColumn) column.titleColumn = data.titleColumn
            })
        }
    })




    let orderColumnCandidate = 0

    //максимальные id колонки и задачи
    let maxIdTaskCandidate = 0
    let maxIdColumnCandidate = 0


    contentColumns.sort((a, b) => {
        if (a.orderColumn < b.orderColumn) {
            return -1;
        }
        if (a.orderColumn > b.orderColumn) {
            return 1;
        }
    })






    //перебор массива контента (колонок) с бэка, создание и добавление новой колонки и заполнение ее контентом с "бэка"
    //здесь column - элемент массива content



    contentColumns.forEach((column) => {
        if (maxIdColumnCandidate < column.idColumn) {
            maxIdColumnCandidate = column.idColumn
        }

        //максимальное значение order колонки
        if (orderColumnCandidate < column.orderColumn) {
            orderColumnCandidate = column.orderColumn
        }

        //массив задач текущей колонки
        const tasks = []
        contentTasks.forEach(data => {
            if (data.idParent === column.idColumn) tasks.push(data)
        })

        tasks.sort((a, b) => {
            if (a.orderTask < b.orderTask) {
                return -1;
            }
            if (a.orderTask > b.orderTask) {
                return 1;
            }
        })


        const newColumn = Column.create(column.idColumn, column.orderColumn, column.titleColumn)
        //перебор массива задач для добавления их в колонку
        tasks.forEach((taskElement) => {
            if (maxIdTaskCandidate < taskElement.idTask) {
                maxIdTaskCandidate = taskElement.idTask
            }


            const newTask = Task.create(taskElement.idTask, taskElement.orderTask, taskElement.contentTask)
            newColumn.querySelector('.list').append(newTask)

        })
        columnList.append(newColumn)
    })


    //bruteForce(contentColumns)



    Column.maxIdTask = maxIdTaskCandidate

    //создание и добавление новой колонки при нажатии на кнопку "Добавьте еще одну колонку" 
    columnAdd.addEventListener('click', function () {
        //console.log('orderColumnCandidate', orderColumnCandidate)

        columnList.append(Column.create(++maxIdColumnCandidate, ++orderColumnCandidate))

        //фокус на заголовке новой колонки
        const lastColumnHead = columnList.lastChild.querySelector('.column-header')
        const lastColumnTitle = lastColumnHead.querySelector('.column-title')

        lastColumnTitle.setAttribute('contenteditable', 'true')
        lastColumnTitle.focus()

        lastColumnTitle.addEventListener('blur', () => {
            lastColumnTitle.removeAttribute('contenteditable')

            if (!Column.edit) {
                console.log('Last Column ID', lastColumnHead.parentElement.getAttribute('data-column-id'))
                axios.post('/create', {
                        idColumn: lastColumnHead.parentElement.getAttribute('data-column-id'),
                        titleColumn: lastColumnTitle.innerHTML,
                        orderColumn: columnList.lastChild.getAttribute('order-column')
                    }).then(response => console.log(response))
                    .catch(error => console.log(error))
            }
        })
    })


    //навешивание drug&drop на все задачи
    document.querySelectorAll('[data-task-id]').forEach(task => {
        Task.addDragEndDropEventToTask
    })

    //навешивание drug&drop на все колонки
    document.querySelectorAll('[data-column-id]').forEach(column => {
        Column.addDragEndDropEventToColumn
    })
}