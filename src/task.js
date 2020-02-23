const Task = {
    idTasks: 13,
    draggingTask: null,

    create(id = null, content = '') {
        const newTask = document.createElement('div')

        newTask.classList.add('list-item', 'edit')
        newTask.setAttribute('data-task-id', Task.idTasks)
        newTask.setAttribute('draggable', 'true')

        Task.idTasks++
        //фокус на добавленную задачу 

        newTask.setAttribute('contenteditable', 'true')
        newTask.addEventListener('blur', () => {
            newTask.removeAttribute('contenteditable')
        })

        Task.eventEdit(newTask)
        Task.addDragEndDropEventToTask(newTask)

        return newTask
    },

    eventEdit(element) {
        element.addEventListener('dblclick', () => {
            element.setAttribute('contenteditable', true)
            element.focus()
        })
        element.addEventListener('blur', () => {
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
        if (this === Task.draggingTask ) {
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