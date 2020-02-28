import {Task} from './task'

const Column = {
    idColumns: 4,
    draggingColumn: null,

    create(id = null, content = '') {
        if(id) {
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
        element.addEventListener('dblclick', () => {
            element.setAttribute('contenteditable', true)
            element.focus()
        })
        element.addEventListener('blur', () => {
            element.removeAttribute('contenteditable')
        })


    },

    addTasks(element) {
        const buttonAdd = element.querySelector('.tast-add')
    
        buttonAdd.addEventListener('click', function (event) {
            const list = element.querySelector('.list')
            list.append(Task.create())
    
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
        if (this === Column.draggingColumn ) {
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
        } else if (Task.draggingTask){
            this.querySelector('.list').append(Task.draggingTask)
        }
    },

}

export {Column}