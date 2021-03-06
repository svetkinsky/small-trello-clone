import './styles/scss.scss'
//import './xhr'

import changeBackground from './changeBackground'
import {Task} from './task'
import {Column} from './column'
import response from '../response.json'



const backgroundImage = ['url(/src/backgrounds/kordan1.jpg)', 'url(/src/backgrounds/kordan2.jpg)', 'url(/src/backgrounds/kordan3.jpg)', 'url(/src/backgrounds/kordan4.jpg)', 'url(/src/backgrounds/kordan5.jpg)', 'url(/src/backgrounds/kordan6.jpg)']

changeBackground.create(backgroundImage)

let columnAdd = document.querySelector('.column-add')
let columns = document.querySelectorAll('.column')
let editItems = document.querySelectorAll('.edit')


const respJSON  = response //Почему сделали константу? Это экземпляр?
const columnList = document.querySelector('.column-list')


//проверка на "ошибки"
if(respJSON.status.code !== 0) {
    console.log('Error')
} 


//массив колонок с "бэка"
const content = respJSON.content || []

//перебор массива контента (колонок) с json (бэка), создание и добавление новой колонки и заполнение ее контентом с "бэка"
//здесь column - элемент массива content
content.forEach((column) => {
    const newColumn = Column.create(column.id, column.name)
    //массив задач текущей колонки
    const tasks = column.tasks || []

    //перебор массива задач для добавления их в колонку
    tasks.forEach((taskElement) => {
        const newTask = Task.create(taskElement.id, taskElement.text)
        newColumn.querySelector('.list').append(newTask)
        
    }) 
    columnList.append(newColumn)
})


//создание и добавление новой колонки при нажатии на кнопку "Добавьте еще одну колонку" 
columnAdd.addEventListener('click', function () {
    
    columnList.append(Column.create())

    //фокус на заголовке новой колонки
    columnList.lastChild.querySelector('.board-body-head').focus()
})


//функция создания и добавления новой задачи при нажатии на кнопку "Добавьте задачу"
const addTasks = element => {
    const buttonAdd = element.querySelector('.tast-add')

    buttonAdd.addEventListener('click', function (event) {
        const list = element.querySelector('.list')
        list.append(Task.create())

        //фокус на добавленную задачу 
        list.lastChild.focus()
    })


}

//добавление задачи в каждую колонку
columns.forEach(addTasks);


//функция задач и заголовков колонок
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






