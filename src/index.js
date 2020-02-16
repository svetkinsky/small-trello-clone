import './styles/scss.scss'
const fs = ('fs')
const path = ('path')
//import './pet1.js'
//import './pet2.js'

const counters = {
    idTasks: 13,
    idColumns: 4,
}

let daggingElement = null

let columnAdd = document.querySelector('.column-add')
let columns = document.querySelectorAll('.column')
let editItems = document.querySelectorAll('.edit')
let dragElements = document.querySelectorAll('[draggable]')


columnAdd.addEventListener('click', function () {
    const newColumn = document.createElement('div')
    const newColumnHead = document.createElement('div')
    const newColumnButton = document.createElement('button')
    const newList = document.createElement('div')

    newColumnButton.innerHTML = 'Добавьте задачу'
    newColumnHead.innerHTML = 'New List'

    newColumn.classList.add('column')
    newColumn.setAttribute('data-column-id', counters.idColumns)
    //newColumn.setAttribute('draggable', 'true')
    counters.idColumns++

    newColumnHead.classList.add('board-body-head', 'edit')
    eventEdit(newColumnHead)

    newList.classList.add('list')
    newColumnButton.classList.add('tast-add')

    newColumn.append(newColumnHead)
    newColumn.append(newList)
    newColumn.append(newColumnButton)

    document.querySelector('.column-add').before(newColumn)

    addTasks(newColumn)
    //eventsDrag(newColumn)


})

const addTasks = element => {
    const buttonAdd = element.querySelector('.tast-add')

    buttonAdd.addEventListener('click', function (event) {
        const newTask = document.createElement('div')

        newTask.classList.add('list-item', 'edit')
        //newTask.classList.add('edit')
        newTask.setAttribute('data-task-id', counters.idTasks)
        newTask.setAttribute('draggrable', 'true')

        counters.idTasks++

        element.querySelector('.list').append(newTask)

        eventEdit(newTask)
        // eventsDrag(newTask)      
    })


}


columns.forEach(addTasks);

const eventsDrag = element => {
    element.addEventListener('dragstart', eventDragStart)
    element.addEventListener('dragend', eventDragEnd)

    element.addEventListener('dragenter', eventDragEnter)
    element.addEventListener('dragover', eventDragOver)
    element.addEventListener('dragleave', eventDragLeave)
    element.addEventListener('drop', eventDrop)

}

dragElements.forEach(eventsDrag);



function eventDragStart(e) {
    daggingElement = this
    daggingElement.classList.add('unvisible')
    console.log('eventDragStart', this, e)
}

function eventDragEnd(e) {
    daggingElement.classList.remove('unvisible')
    daggingElement = null
    //console.log('eventDragEnd', this, e)
}

function eventDragEnter(e) {
    if (this !== daggingElement) {
        // console.log('eventDragEnteris', e)
    }
}

function eventDragOver(e) {
    if (this !== daggingElement) {
        e.preventDefault()
        //console.log('eventDragOver', this, e)
    }
}

function eventDragLeave(e) {
    if (this !== daggingElement) {
        //console.log('eventDragLeave', this, e)
    }
}

function eventDrop(e) {
    e.stopPropagation()
    if (this !== daggingElement) {
        if (this.parentElement === daggingElement.parentElement) {
            const draggingArray = Array.from(this.parentElement.querySelectorAll('.list-item'))
            const a = draggingArray.indexOf(this)
            const b = draggingArray.indexOf(daggingElement)
            if (a < b) {
                this.parentElement.insertBefore(daggingElement, this)
            } else {
                this.parentElement.insertBefore(daggingElement, this.nextElementSibling)
            }
            console.log('eventDrop', this, e)
        } else {
            this.parentElement.insertBefore(daggingElement, this)
        }
    }
}

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





const changeBackground = () => {
    const backgroundImage = ['url(/src/backgrounds/kordan1.jpg)', 'url(/src/backgrounds/kordan2.jpg)', 'url(/src/backgrounds/kordan3.jpg)', 'url(/src/backgrounds/kordan4.jpg)', 'url(/src/backgrounds/kordan5.jpg)', 'url(/src/backgrounds/kordan6.jpg)']

    document.addEventListener('DOMContentLoaded', () => {
        let randomIndexImg = Math.round(Math.random() * (backgroundImage.length - 1))

        console.log(randomIndexImg)
        document.querySelector('body').style.background = backgroundImage[randomIndexImg]
    })
}

changeBackground()