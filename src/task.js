import {
    Xhr
} from './xhr'
import {
    Column
} from './column'


const Task = {
    idTasks: 13,
    draggingTask: null,
    edit: false,

    //метод создания задачи, по умолчанию id и content нулевые 
    create(id = null, content = '') {
        //если входной id не нулевой, то задаче присваивается он
        if (id) {
            Task.idTasks = id
        }
        const newTask = document.createElement('div')

        newTask.classList.add('list-item', 'edit')
        newTask.setAttribute('data-task-id', Task.idTasks)
        newTask.setAttribute('draggable', 'true')
        newTask.innerHTML = content

        Task.idTasks++

        // console.log('Column.addTask', Column.addTask)
        Task.eventEdit(newTask)

        Task.addDragEndDropEventToTask(newTask)

        //console.log(Task.idTasks)


        return newTask
    },


    contentEditSendRequest(element, contentBeforeEdit, contentAfterEdit, body) {
        // let contentBeforeEdit = element.innerHTML

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
            const contentAfterEdit = element.innerHTM

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


            //удаление атрибута contenteditable после убирания фокуса
            element.removeAttribute('contenteditable')


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
        event.stopPropagation()
        this.classList.remove('half-visible')
        if (this !== Task.draggingTask) {
            if (this.parentElement === Task.draggingTask.parentElement) {
                const draggingArray = Array.from(this.parentElement.querySelectorAll('.list-item'))
                const indexA = draggingArray.indexOf(this)
                const indexB = draggingArray.indexOf(Task.draggingTask)

                if (indexA < indexB) {
                    this.parentElement.insertBefore(Task.draggingTask, this)
                } else {
                    this.parentElement.insertBefore(Task.draggingTask, this.nextElementSibling)
                }
            } else {
                this.parentElement.insertBefore(Task.draggingTask, this)
            }
        }
    },

}

export {
    Task
}