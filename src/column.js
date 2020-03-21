import {
    Task
} from './task'
import {
    Xhr
} from './xhr'
import {
    request,
    response
} from 'express'

const Column = {
    idColumns: 4,
    draggingColumn: null,
    maxIdTask: 0,


    create(id = null, content = '') {
        if (id) {
            Column.idColumns = id
        }
        const newColumn = document.createElement('div')
        const newColumnHead = document.createElement('div')
        const newColumnButton = document.createElement('button')
        const newList = document.createElement('div')

        newColumn.classList.add('column')
        newColumnHead.classList.add('board-body-head', 'edit')
        newList.classList.add('list')
        newColumnButton.classList.add('tast-add')

        newColumn.setAttribute('data-column-id', Column.idColumns)
        Column.idColumns++
        newColumn.setAttribute('draggable', 'true')

        newColumnButton.innerHTML = 'Добавьте задачу'
        newColumnHead.innerHTML = content

        newColumn.append(newColumnHead)
        newColumn.append(newList)
        newColumn.append(newColumnButton)

        Column.eventEdit(newColumnHead)
        Column.addTasks(newColumn)
        Column.addDragEndDropEventToColumn(newColumn)

        return newColumn

    },



    eventEdit(element) {
        //контент заголовка колонки до изменения
        let titleBeforeEdit = ''
        element.addEventListener('dblclick', () => {
            titleBeforeEdit = element.innerHTML
            element.setAttribute('contenteditable', true)
            element.focus()
        })
        element.addEventListener('blur', () => {
            //контент заголовка колонки после изменения
            const axios = require('axios')
            const titleAfterEdit = element.innerHTML

            //удаление атрибута contenteditable после убирания фокуса
            element.removeAttribute('contenteditable')

            //проверка было ли изменение заголовка колонки
            if (titleBeforeEdit !== titleAfterEdit) {
                const id = element.closest('.column').getAttribute('data-column-id')

                axios.put('/update', {
                        idColumn: id,
                        columnTitle: titleAfterEdit
                    }).then(response => console.log(response))
                    .catch(error => console.log(error))


                //формирование body для передачи в запрос
                // const body = JSON.stringify({
                //     "id": id,
                //     "title": titleAfterEdit
                // })

                //отправка запроса
                // Xhr.sendTaskRequest('/submit', 'POST', body)
            }
        })
    },



    addTasks(element) {
        const axios = require('axios')
        //добавление новой задачи по нажатию кнопки "добавьте задачу"
        const buttonAdd = element.querySelector('.tast-add')
        buttonAdd.addEventListener('click', function (event) {
            const list = element.querySelector('.list')

            list.append(Task.create(++Column.maxIdTask))

            //фокус на добавленную задачу 

            list.lastChild.setAttribute('contenteditable', 'true')
            list.lastChild.focus()
            list.lastChild.addEventListener('blur', () => {
                list.lastChild.removeAttribute('contenteditable')
                axios.post('/create', {
                        idTask: list.lastChild.getAttribute('data-task-id'),
                        contentTask: list.lastChild.innerHTML,
                        idColumn: list.parentElement.getAttribute('data-column-id')
                    }).then(response => console.log(response))
                    .catch(error => console.log(error))

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
        console.log('enter', this)
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
        console.log('leave', this)
    },

    eventDropColumn(event) {
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