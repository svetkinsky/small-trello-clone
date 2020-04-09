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
    idColumns: 1,
    draggingColumn: null,
    maxIdTask: 0,
    addTask: false,
    edit: false,
    orderTaskCandidate: 0,


    create(id = null, order, content = '') {
        if (id) {
            Column.idColumns = id
        }
        const newColumn = document.createElement('div')
        const newColumnHead = document.createElement('div')
        const newColumnButton = document.createElement('button')
        const newList = document.createElement('div')
        const newColumnTitle = document.createElement('div')
        const newColumnHeadButton = document.createElement('span')
        const newDeleteButton = document.createElement('span')

        newColumn.classList.add('column')
        newColumnHead.classList.add('column-header')
        newColumnTitle.classList.add('column-title', 'edit')
        newColumnHeadButton.classList.add('column-header-button')
        newList.classList.add('list')
        newColumnButton.classList.add('task-add')
        newDeleteButton.classList.add('pop-over')

        newColumn.setAttribute('data-column-id', Column.idColumns)
        Column.idColumns++
        newColumn.setAttribute('draggable', 'true')
        newColumn.setAttribute('order-column', order)

        newColumnButton.innerHTML = 'Добавьте задачу'
        newColumnTitle.innerHTML = content
        newColumnHeadButton.innerHTML = '...'
        newDeleteButton.innerHTML = 'Удалить'

        newColumnHead.append(newColumnTitle)
        newColumnHead.append(newColumnHeadButton)
        newColumn.append(newColumnHead)
        newColumn.append(newList)
        newColumn.append(newColumnButton)
        newColumn.prepend(newDeleteButton)

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


    addColumn(list, maxId, order) {
        const axios = require('axios')
        const columnAdd = document.querySelector('.column-add')
        columnAdd.addEventListener('click', function () {
            //console.log('orderColumnCandidate', order)

            list.append(Column.create(++maxId, ++order))

            //фокус на заголовке новой колонки
            const lastColumnHead = list.lastChild.querySelector('.column-header')
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
                            orderColumn: list.lastChild.getAttribute('order-column')
                        }).then(response => console.log(response))
                        .catch(error => console.log(error))
                }
            })
        })
    },


    addTasks(element) {
        const axios = require('axios')
        const buttonAdd = element.querySelector('.task-add')
        buttonAdd.addEventListener('click', function (event) {
            const list = element.querySelector('.list')
            list.append(Task.create(++Column.maxIdTask))

            console.log('add tasks')

            const listTasks = Array.from(list.querySelectorAll('.list-item'))
            listTasks.forEach((task, index) => {
                task.setAttribute('order-task', index + 1)
            })

            //фокус на добавленную задачу 
            const lastTask = list.lastChild
            console.log('last task', lastTask)

            lastTask.lastChild.setAttribute('contenteditable', 'true')
            lastTask.lastChild.focus()

            lastTask.lastChild.addEventListener('blur', () => {
                console.log('piu')
                lastTask.lastChild.removeAttribute('contenteditable')
                if (!Task.edit) {
                    axios.post('/create', {
                            idTask: lastTask.getAttribute('data-task-id'),
                            contentTask: lastTask.lastChild.innerHTML,
                            idParent: list.parentElement.getAttribute('data-column-id'),
                            orderTask: lastTask.getAttribute('order-task')
                        }).then(response => console.log(response))
                        .catch(error => console.log(error))
                }
            })
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

    order() {
        const columnsArray = Array.from(document.querySelectorAll('.column'))
        const axios = require('axios')
        const orderColumnData = []

        columnsArray.forEach((column, index) => {
            column.setAttribute('order-column', index + 1)
            console.log('index', index)
            orderColumnData.push({
                id: column.getAttribute('data-column-id'),
                order: index + 1
            })
        })
        axios.put('/update', {
                columnOrders: orderColumnData
            }).then(response => console.log(response))
            .catch(error => console.log(error))
    },

    eventDropColumn(event) {
        const axios = require('axios')
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
                        Column.order()
                    } else {
                        this.parentElement.insertBefore(Column.draggingColumn, this.nextElementSibling)
                        Column.order()
                    }
                } else {
                    this.parentElement.insertBefore(Column.draggingColumn, this)
                    Column.order()
                }
            }
        } else if (Task.draggingTask) {
            this.querySelector('.list').append(Task.draggingTask)
            axios.put('/update', {
                    idTask: Task.draggingTask.getAttribute('data-task-id'),
                    idColumn: this.getAttribute('data-column-id')
                }).then(response => console.log(response))
                .catch(error => console.log(error))
        }
    },

}

export {
    Column
}