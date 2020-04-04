import {
    Xhr
} from './xhr'
import {
    Column
} from './column'
import {
    ContextMenuEvent
} from './contextMenuEvent'


const Task = {
    idTasks: 13,
    draggingTask: null,
    edit: false,

    //метод создания задачи, по умолчанию id и content нулевые 
    create(id = null, order, content = '') {
        //если входной id не нулевой, то задаче присваивается он
        if (id) {
            Task.idTasks = id
        }
        const newTask = document.createElement('div')

        newTask.classList.add('list-item', 'edit')
        newTask.setAttribute('data-task-id', Task.idTasks)
        newTask.setAttribute('draggable', 'true')
        newTask.setAttribute('order-task', order)
        newTask.innerHTML = content

        Task.idTasks++

        ContextMenuEvent.handler(newTask, false)
        Task.eventEdit(newTask)
        Task.addDragEndDropEventToTask(newTask)

        return newTask
    },





    eventEdit(element) {
        const axios = require('axios')
        //контент задачи до изменения
        let contentBeforeEdit = ''
        element.addEventListener('dblclick', () => {
            Task.edit = true
            contentBeforeEdit = element.innerHTML
            element.setAttribute('contenteditable', true)
            element.focus()
        })
        element.addEventListener('blur', () => {
            //контент задачи после изменения
            element.removeAttribute('contenteditable')
            const contentAfterEdit = element.innerHTML
            console.log('contentAfterEdit', contentAfterEdit)

            if (contentBeforeEdit !== contentAfterEdit) {
                const id = element.getAttribute('data-task-id')
                const idParent = element.closest('.column').getAttribute('data-column-id')
                if (Task.edit) {
                    axios.put('/update', {
                            idTask: id,
                            contentTask: contentAfterEdit
                        }).then(response => console.log(response))
                        .catch(error => console.log(error))
                }
            }

        })
    },



    addDragEndDropEventToTask(element) {
        element.addEventListener('dragstart', Task.eventDragStartTask)
        element.addEventListener('dragend', Task.eventDragEndTask)

        element.addEventListener('dragenter', Task.eventDragEnterTask)
        element.addEventListener('dragover', Task.eventDragOverTask)
        element.addEventListener('dragleave', Task.eventDragLeaveTask)
        element.addEventListener('drop', Task.eventDropTask)
    },

    eventDragStartTask(event) {
        event.stopPropagation()
        Task.draggingTask = this
        Task.draggingTask.classList.add('unvisible')
    },

    eventDragEndTask(event) {
        event.stopPropagation()
        Task.draggingTask.classList.remove('unvisible')
        Task.draggingTask = null
    },

    eventDragEnterTask(event) {
        if (this === Task.draggingTask) {
            return
        }
        this.classList.add('half-visible')
    },

    eventDragOverTask(event) {
        event.preventDefault()
        if (this === Task.draggingTask) {
            return
        }
    },

    eventDragLeaveTask(event) {
        if (this === Task.draggingTask) {
            return
        }
        this.classList.remove('half-visible')
    },

    eventDropTask(event) {
        const axios = require('axios')
        event.stopPropagation()
        this.classList.remove('half-visible')
        if (this !== Task.draggingTask) {
            //если колонка таже самая
            if (this.parentElement === Task.draggingTask.parentElement) {
                const draggingArray = Array.from(this.parentElement.querySelectorAll('.list-item'))
                const indexA = draggingArray.indexOf(this)
                const indexB = draggingArray.indexOf(Task.draggingTask)

                // console.log('draggingArray', draggingArray)
                // console.log('indexA', indexA)
                // console.log('indexB', indexB)

                const tasks = document.querySelectorAll('.list-item')

                if (indexA < indexB) {
                    this.parentElement.insertBefore(Task.draggingTask, this)
                    // if (Task.draggingTask.getAttribute('order-task') < this.getAttribute('order-task')) {
                    //     //const changeOrderArray = []
                    //     tasks.forEach(el => {
                    //         console.log('element', el)
                    //         while (el.getAttribute('order-task') < this.getAttribute('order-task') && el.getAttribute('order-task') > Task.draggingTask.getAttribute('order-task')) {
                    //             el.setAttribute('order-task') = el.getAttribute('order-task') - 1
                    //             console.log('PIU', el.getAttribute('order-task') - 1)
                    //         }
                    //     })
                } else {
                    this.parentElement.insertBefore(Task.draggingTask, this.nextElementSibling)
                }
            }
            //если колонка другая
            else {
                this.parentElement.insertBefore(Task.draggingTask, this)
                axios.put('/update', {
                        idTask: Task.draggingTask.getAttribute('data-task-id'),
                        idColumn: this.parentElement.parentElement.getAttribute('data-column-id')
                    }).then(response => console.log(response))
                    .catch(error => console.log(error))
            }
        }
    },


}

export {
    Task
}