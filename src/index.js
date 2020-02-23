import './styles/scss.scss'

const fs = ('fs')
const path = ('path')
//import './pet1.js'
//import './pet2.js'
import {changeBackground} from './changeBackground'
import {Task} from './task'
import {Column} from './column'

const backgroundImage = ['url(/src/backgrounds/kordan1.jpg)', 'url(/src/backgrounds/kordan2.jpg)', 'url(/src/backgrounds/kordan3.jpg)', 'url(/src/backgrounds/kordan4.jpg)', 'url(/src/backgrounds/kordan5.jpg)', 'url(/src/backgrounds/kordan6.jpg)']

changeBackground.create(backgroundImage)

let columnAdd = document.querySelector('.column-add')
let columns = document.querySelectorAll('.column')
let editItems = document.querySelectorAll('.edit')
let dragElements = document.querySelectorAll('[draggable]')



columnAdd.addEventListener('click', function () {
    const columnList = document.querySelector('.column-list')
    columnList.append(Column.create())

    //фокус на заголовке новой колонки
    // TODO: сделать выледение заголовка новой колонки

    columnList.lastChild.querySelector('.board-body-head').focus()
    //columnList.lastChild.querySelector('.board-body-head').select()
})



const addTasks = element => {
    const buttonAdd = element.querySelector('.tast-add')

    buttonAdd.addEventListener('click', function (event) {
        const list = element.querySelector('.list')
        list.append(Task.create())

        //фокус на добавленную задачу 
        list.lastChild.focus()
    })


}

columns.forEach(addTasks);

const eventEdit = element => {
    element.addEventListener('dblclick', () => {
        element.setAttribute('contenteditable', true)
        element.focus()
    })
    element.addEventListener('blur', () => {
        element.removeAttribute('contenteditable')
    })


}

editItems.forEach(eventEdit)

document.querySelectorAll('[data-task-id]').forEach(Task.addDragEndDropEventToTask)

document.querySelectorAll('[data-column-id]').forEach(Column.addDragEndDropEventToColumn)






