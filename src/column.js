import {
    Task
} from './task'
import {
    Xhr
} from './xhr'
import {
    ContextMenuEvent
} from './contextMenuEvent'

const Column = {
    idColumns: 4,
    draggingColumn: null,
    maxIdTask: 0,
    addTask: false,
    edit: false,


    create(id = null, content = '') {
        if (id) {
            Column.idColumns = id
        }
        const newColumn = document.createElement('div')
        const newColumnHead = document.createElement('div')
        const newColumnButton = document.createElement('button')
        const newList = document.createElement('div')
        const newColumnTitle = document.createElement('div')
        const newColumnHeadButton = document.createElement('span')

        newColumn.classList.add('column')
        newColumnHead.classList.add('column-header')
        newColumnTitle.classList.add('column-title', 'edit')
        newColumnHeadButton.classList.add('column-header-button')
        newList.classList.add('list')
        newColumnButton.classList.add('task-add')

        newColumn.setAttribute('data-column-id', Column.idColumns)
        Column.idColumns++
        newColumn.setAttribute('draggable', 'true')

        newColumnButton.innerHTML = 'Добавьте задачу'
        newColumnTitle.innerHTML = content
        newColumnHeadButton.innerHTML = '...'

        newColumnHead.append(newColumnTitle)
        newColumnHead.append(newColumnHeadButton)
        newColumn.append(newColumnHead)
        newColumn.append(newList)
        newColumn.append(newColumnButton)

        Column.eventEdit(newColumnHead)
        Column.addTasks(newColumn)
        Column.addDragEndDropEventToColumn(newColumn)

        ContextMenuEvent.handler(newColumn, true)

        return newColumn

    },



    eventEdit(element) {
        const axios = require('axios')
        //контент заголовка колонки до изменения
        let titleBeforeEdit = ''
        element.addEventListener('dblclick', () => {
            titleBeforeEdit = element.querySelector('.column-title').innerHTML
            element.setAttribute('contenteditable', true)
            element.focus()
            Column.edit = true
        })
        element.addEventListener('blur', () => {
            //контент заголовка колонки после изменения
            const titleAfterEdit = element.querySelector('.column-title').innerHTML
            console.log('titleAfterEdit', titleAfterEdit)
            console.log('titleBeforeEdit', titleBeforeEdit)


            //удаление атрибута contenteditable после убирания фокуса
            element.removeAttribute('contenteditable')

            //проверка было ли изменение заголовка колонки
            if (titleBeforeEdit !== titleAfterEdit) {
                const id = element.closest('.column').getAttribute('data-column-id')

                if (Column.edit) {
                    axios.put('/update', {
                            idColumn: id,
                            titleColumn: titleAfterEdit
                        }).then(response => console.log(response))
                        .catch(error => console.log(error))
                }
            }
        })
    },



    addTasks(element) {
        const axios = require('axios')
        const buttonAdd = element.querySelector('.task-add')
        // const addTask = false
        buttonAdd.addEventListener('click', function (event) {
            const list = element.querySelector('.list')
            // Column.addTask = true
            list.append(Task.create(++Column.maxIdTask))

            //фокус на добавленную задачу 
            const lastTask = list.lastChild
            lastTask.setAttribute('contenteditable', 'true')
            lastTask.focus()
            lastTask.addEventListener('blur', () => {
                lastTask.removeAttribute('contenteditable')
                if (!Task.edit) {
                    axios.post('/create', {
                            idTask: lastTask.getAttribute('data-task-id'),
                            contentTask: lastTask.innerHTML,
                            idParent: list.parentElement.getAttribute('data-column-id')
                        }).then(response => console.log(response))
                        .catch(error => console.log(error))
                }
                // Column.addTask = true

            })
            //console.log('Max Id of tasks: ', Column.maxIdTask)
        })

    },

    addDragEndDropEventToColumn(element) {
        element.addEventListener('dragstart', Column.eventDragStartColumn)
        element.addEventListener('dragend', Column.eventDragEndColumn)

        element.addEventListener('dragenter', Column.eventDragEnterColumn)
        element.addEventListener('dragover', Column.eventDragOverColumn)
        element.addEventListener('dragleave', Column.eventDragLeaveColumn)
        element.addEventListener('drop', Column.eventDropColumn)
    },

    eventDragStartColumn(event) {
        event.stopPropagation()
        Column.draggingColumn = this
        Column.draggingColumn.classList.add('unvisible')


    },

    eventDragEndColumn(event) {

        if (!Task.draggingTask) {

            Column.draggingColumn.classList.remove('unvisible')
            Column.draggingColumn = null
        }

    },

    eventDragEnterColumn(event) {
        if (this === Column.draggingColumn) {
            return
        }
        this.classList.add('half-visible')
        //console.log('enter', this)
    },

    eventDragOverColumn(event) {
        event.preventDefault()
        if (this === Column.draggingColumn) {
            return
        }
    },

    eventDragLeaveColumn(event) {
        if (this === Column.draggingColumn) {
            return
        }
        this.classList.remove('half-visible')
        //console.log('leave', this)
    },

    eventDropColumn(event) {
        console.log('DROP COLUMN ELEMENT', this)
        event.stopPropagation()
        this.classList.remove('half-visible')
        if (Column.draggingColumn) {
            if (this === Column.draggingColumn) {
                return
            }


            if (this !== Column.draggingColumn) {
                if (this.parentElement === Column.draggingColumn.parentElement) {
                    const draggingArray = Array.from(document.querySelectorAll('.column'))
                    const indexA = draggingArray.indexOf(this)
                    const indexB = draggingArray.indexOf(Column.draggingColumn)

                    if (indexA < indexB) {
                        this.parentElement.insertBefore(Column.draggingColumn, this)
                    } else {
                        this.parentElement.insertBefore(Column.draggingColumn, this.nextElementSibling)
                    }
                } else {
                    this.parentElement.insertBefore(Column.draggingColumn, this)
                }
            }
        } else if (Task.draggingTask) {
            this.querySelector('.list').append(Task.draggingTask)
        }
    },

}

export {
    Column
}