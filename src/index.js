import './styles/scss.scss'
//import './xhr'

import changeBackground from './changeBackground'
import {
    Task
} from './task'
import {
    Column
} from './column'
import response from '../response.json'
import {
    Xhr
} from './xhr'



const backgroundImage = ['url(/src/backgrounds/kordan1.jpg)', 'url(/src/backgrounds/kordan2.jpg)', 'url(/src/backgrounds/kordan3.jpg)', 'url(/src/backgrounds/kordan4.jpg)', 'url(/src/backgrounds/kordan5.jpg)', 'url(/src/backgrounds/kordan6.jpg)']

changeBackground.create(backgroundImage)

let columnAdd = document.querySelector('.column-add')
let columns = document.querySelectorAll('.column')
let editItems = document.querySelectorAll('.edit')



let respJSON = response //Xhr.getTasks()

// setTimeout(() => {
//     respJSON = Xhr.getTasks()

// }, 2000)
const columnList = document.querySelector('.column-list')

console.log('respJSON: ', respJSON)


//проверка на "ошибки"
if (respJSON.status.code !== 0) {
    console.log('Error')
}




//массив колонок с "бэка"
const content = respJSON.content || []

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


            //*****************Пришлось сделать ДВА цикла, чтобы в строку 71 передался нужный maxIdTaskCandidate*/
            tasks.forEach((taskElement) => {
                    if (maxIdTaskCandidate < taskElement.id) {
                        maxIdTaskCandidate = taskElement.id
                    }
                })
                const newColumn = Column.create(column.id, column.name, ++maxIdTaskCandidate)
                //перебор массива задач для добавления их в колонку
                tasks.forEach((taskElement) => {
                    const newTask = Task.create(taskElement.id, taskElement.text)
                    newColumn.querySelector('.list').append(newTask)

                })

                columnList.append(newColumn)
            })



        // maxId(elements, attribute) {
        //     let ids = []
        //     elements.forEach(function(element) {
        //         ids.push(element.getAttribute(attribute))
        //     })

        //     let maxId = Math.max(ids)
        //     return maxId
        // }


        //создание и добавление новой колонки при нажатии на кнопку "Добавьте еще одну колонку" 
        columnAdd.addEventListener('click', function () {

            columnList.append(Column.create(++maxIdColumnCandidate))

            //фокус на заголовке новой колонки
            columnList.lastChild.querySelector('.board-body-head').focus()
            console.log('maxIdColumnCandidate: ', maxIdColumnCandidate)
        })




        //функция редактирования задач и заголовков колонок
        const eventEdit = element => {
            element.addEventListener('dblclick', () => {
                element.setAttribute('contenteditable', true)
                element.focus()
            })
            element.addEventListener('blur', () => {
                element.removeAttribute('contenteditable')
            })


        }


        //навешивание релактирования на каждый элемент с классом edit
        editItems.forEach(eventEdit)

        //навешивание drug&drop на все задачи
        document.querySelectorAll('[data-task-id]').forEach(Task.addDragEndDropEventToTask)

        //навешивание drug&drop на все колонки
        document.querySelectorAll('[data-column-id]').forEach(Column.addDragEndDropEventToColumn)