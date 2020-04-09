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



const axios = require('axios')

axios.get('/get')
    .then(function (response) {
        run(response.data)
    }).catch(error => console.log(error))


const backgroundImage = ['url(/backgrounds/kordan1.jpg)', 'url(/backgrounds/kordan2.jpg)', 'url(/backgrounds/kordan3.jpg)', 'url(/backgrounds/kordan4.jpg)', 'url(/backgrounds/kordan5.jpg)', 'url(/backgrounds/kordan6.jpg)']

changeBackground.create(backgroundImage)

const columnList = document.querySelector('.column-list')


const run = (getData) => {
    //проверка на "ошибки"
    if (getData.status == 0) {
        console.log('Error: ', getData.status)
    }


    //массив колонок с "бэка"

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

    // getData.forEach(data => {
    //     if (data.idTask) {
    //         //const emptyTasks = document.querySelectorAll('.list-item')

    //     }

    // })



    // getData.sort((a, b) => {
    //     if (a.orderColumn < b.orderColumn) {
    //         return -1;
    //     }
    //     if (a.orderColumn > b.orderColumn) {
    //         return 1;
    //     }
    // })

    getData.sort((a, b) => {
        if (a.orderTask < b.orderTask) {
            return -1;
        }
        if (a.orderTask > b.orderTask) {
            return 1;
        }
    })

    console.log('getData', getData)



    let orderColumnCandidate = 0

    //максимальные id колонки и задачи
    let maxIdTaskCandidate = 0
    let maxIdColumnCandidate = 0


    contentColumns.sort((a, b) => {

        return a.orderColumn < b.orderColumn ? -1 : 1

        // if (a.orderColumn < b.orderColumn) {
        //     return -1;
        // }
        // if (a.orderColumn > b.orderColumn) {
        //     return 1;
        // }
    })






    //перебор массива контента (колонок) с бэка, создание и добавление новой колонки и заполнение ее контентом с "бэка"

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
    Column.maxIdTask = maxIdTaskCandidate


    //создание и добавление новой колонки при нажатии на кнопку "Добавьте еще одну колонку" 
    Column.addColumn(columnList, maxIdColumnCandidate, orderColumnCandidate)


    //навешивание drug&drop на все задачи
    document.querySelectorAll('[data-task-id]').forEach(task => {
        Task.addDragEndDropEventToTask
    })

    //навешивание drug&drop на все колонки
    document.querySelectorAll('[data-column-id]').forEach(column => {
        Column.addDragEndDropEventToColumn
    })
}