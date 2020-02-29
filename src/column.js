import {
    Task
} from './task'
import {
    Xhr
} from './xhr'

const Column = {
    idColumns: 4,
    draggingColumn: null,

    create(id = null, content = '') {
        if (id) {
            Column.idColumns = id
        }
        const newColumn = document.createElement('div')
        const newColumnHead = document.createElement('div')
        const newColumnButton = document.createElement('button')
        const newList = document.createElement('div')

        newColumnButton.innerHTML = 'Добавьте задачу'
        newColumnHead.innerHTML = content

        newColumn.classList.add('column')
        newColumn.setAttribute('data-column-id', Column.idColumns)
        newColumn.setAttribute('draggable', 'true')
        Column.idColumns++

        newColumnHead.classList.add('board-body-head', 'edit')
        newColumnHead.setAttribute('contenteditable', 'true')
        newColumnHead.addEventListener('blur', () => {
            newColumnHead.removeAttribute('contenteditable')
        })

        Column.eventEdit(newColumnHead)
        newList.classList.add('list')
        newColumnButton.classList.add('tast-add')

        newColumn.append(newColumnHead)
        newColumn.append(newList)
        newColumn.append(newColumnButton)

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
            const title = element.innerHTML

            //удаление атрибута contenteditable после убирания фокуса
            element.removeAttribute('contenteditable')

            //проверка было ли изменение заголовка колонки
            if (titleBeforeEdit !== title) {
                const id = element.closest('.column').getAttribute('data-column-id')

                //формирование body для передачи в запрос
                const body = 'id=' + encodeURIComponent(id) +
                    '&title=' + encodeURIComponent(title)

                //отправка запроса
                Xhr.sendTaskRequest('/submit', 'POST', body)
            }
        })


    },

    addTasks(element) {
        const buttonAdd = element.querySelector('.tast-add')
        buttonAdd.addEventListener('click', function (event) {
            //все задачи
            const tasks = document.querySelectorAll('[data-task-id]')
            
            //массив id задач
            let idTask = []
           
            //формирование массива id задач
            tasks.forEach(function(task) {
               idTask.push(task.getAttribute('data-task-id'))
            })       
            
            //console.log(idTask)

            //макс id задач
            let maxIdTask = Math.max(idTask)

            const list = element.querySelector('.list')

            //при создании новой задачи передается id следующий после максимального
            list.append(Task.create(maxIdTask++))

            //фокус на добавленную задачу 
            list.lastChild.focus()
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