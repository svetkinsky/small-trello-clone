import './styles/scss.scss'
const fs = ('fs')
const path = ('path')
//import './pet1.js'
//import './pet2.js'

const counters = {
    idTasks: 13,
    idColumns: 4,
}

let draggingTask = null
let draggingColumn = null


let columnAdd = document.querySelector('.column-add')
let columns = document.querySelectorAll('.column')
let editItems = document.querySelectorAll('.edit')
let dragElements = document.querySelectorAll('[draggable]')



const createColumn = () => {
    const newColumn = document.createElement('div')
    const newColumnHead = document.createElement('div')
    const newColumnButton = document.createElement('button')
    const newList = document.createElement('div')

    newColumnButton.innerHTML = 'Добавьте задачу'
    newColumnHead.innerHTML = 'New List'

    newColumn.classList.add('column')
    newColumn.setAttribute('data-column-id', counters.idColumns)
    newColumn.setAttribute('draggable', 'true')
    counters.idColumns++

    newColumnHead.classList.add('board-body-head', 'edit')
    //newColumnHead.focus()
    eventEdit(newColumnHead)

    newList.classList.add('list')
    newList.append(createTask())

    newColumnButton.classList.add('tast-add')

    newColumn.append(newColumnHead)
    newColumn.append(newList)
    newColumn.append(newColumnButton)
    addTasks(newColumn)
    addDragEndDropEventToColumn(newColumn)

    return newColumn
}


columnAdd.addEventListener('click', function () {
    document.querySelector('.column-list').append(createColumn())
})



const createTask = () => {
    const newTask = document.createElement('div')

    newTask.classList.add('list-item', 'edit')
    newTask.setAttribute('data-task-id', counters.idTasks)
    newTask.setAttribute('draggable', 'true')

    counters.idTasks++
    // TODO: необходимо добавить фокус на добавленную задачу 

    newTask.setAttribute('contenteditable', 'true')
    //newTask.focus()
    newTask.addEventListener('blur', () => {
        newTask.removeAttribute('contenteditable')
    })

    eventEdit(newTask)
    addDragEndDropEventToTask(newTask)


    return newTask
}


const addTasks = element => {
    const buttonAdd = element.querySelector('.tast-add')

    buttonAdd.addEventListener('click', function (event) {
        const list = element.querySelector('.list')
        list.append(createTask())
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



// document.querySelectorAll('[data-column-id]').forEach(element => {
//     element.addEventListener('dragstart', eventDragStart)
//     element.addEventListener('dragend', eventDragEnd)

//     element.addEventListener('dragenter', eventDragEnter)
//     element.addEventListener('dragover', eventDragOver)
//     element.addEventListener('dragleave', eventDragLeave)

//     element.addEventListener('drop', function (event) {

//         this.classList.remove('half-visible')
//         if (this !== draggingElement) {
//             if (this.parentElement === draggingElement.parentElement) {
//                 const draggingArray = Array.from(this.parentElement.querySelectorAll('.column-list'))
//                 const indexA = draggingArray.indexOf(this)
//                 const indexB = draggingArray.indexOf(draggingElement)

//                 if (indexA < indexB) {
//                     this.parentElement.insertBefore(draggingElement, this)
//                 } else {
//                     this.parentElement.insertBefore(draggingElement, this.nextElementSibling)
//                 }
//             } else {
//                 this.parentElement.insertBefore(draggingElement, this)
//             }
//             console.log('eventDrop')
//         }
//         event.stopPropagation()
//     })
// })


const addDragEndDropEventToTask = element => {
    element.addEventListener('dragstart', eventDragStartTask)
    element.addEventListener('dragend', eventDragEndTask)

    element.addEventListener('dragenter', eventDragEnterTask)
    element.addEventListener('dragover', eventDragOverTask)
    element.addEventListener('dragleave', eventDragLeaveTask)
    element.addEventListener('drop', eventDropTask)
}

document.querySelectorAll('[data-task-id]').forEach(addDragEndDropEventToTask)


function eventDragStartTask(event) {
    event.stopPropagation()
    draggingTask = this
    draggingTask.classList.add('unvisible')
}

function eventDragEndTask(event) {
    event.stopPropagation()
    draggingTask.classList.remove('unvisible')
    draggingTask = null
}

function eventDragEnterTask(event) {
    if (this === draggingTask || draggingColumn) {
        return
    }
    this.classList.add('half-visible')
}

function eventDragOverTask(event) {
    event.preventDefault()
    if (this === draggingTask || draggingColumn) {
        return
    }
}

function eventDragLeaveTask(event) {
    if (this === draggingTask || draggingColumn) {
        return
    }
    this.classList.remove('half-visible')
}

function eventDropTask(event) {
    event.stopPropagation()
    this.classList.remove('half-visible')
    if (this !== draggingTask && !draggingColumn) {
        if (this.parentElement === draggingTask.parentElement) {
            const draggingArray = Array.from(this.parentElement.querySelectorAll('.list-item'))
            const indexA = draggingArray.indexOf(this)
            const indexB = draggingArray.indexOf(draggingTask)

            if (indexA < indexB) {
                this.parentElement.insertBefore(draggingTask, this)
            } else {
                this.parentElement.insertBefore(draggingTask, this.nextElementSibling)
            }
        } else {
            this.parentElement.insertBefore(draggingTask, this)
        }
    }

}

// document.querySelectorAll('.list').forEach(element => {
//     element.addEventListener('dragstart', function(event) {
//         event.stopPropagation()
//         console.log('dragstart column')
//     })
//     element.addEventListener('dragend', function(event) {
//         event.stopPropagation()
//         console.log('dragend column')
//     })
//     element.addEventListener('dragenter', function(event) {
//         event.stopPropagation()
//         console.log('dragenter column')
//     })
//     element.addEventListener('dragleave', function(event) {
//         event.stopPropagation()
//         console.log('dragleave column')
//     })
//     element.addEventListener('dragover', function(event) {
//         event.preventDefault()
//         console.log('dragover column')
//     })
//     element.addEventListener('drop', function(event) {
//         event.stopPropagation()
//         console.log('drop column')
//     })
// })


const addDragEndDropEventToColumn = element => {
    element.addEventListener('dragstart', eventDragStartColumn)
    element.addEventListener('dragend', eventDragEndColumn)

    element.addEventListener('dragenter', eventDragEnterColumn)
    element.addEventListener('dragover', eventDragOverColumn)
    element.addEventListener('dragleave', eventDragLeaveColumn)
    element.addEventListener('drop', eventDropColumn)

    console.log(element)
}


document.querySelectorAll('[data-column-id]').forEach(addDragEndDropEventToColumn)


function eventDragStartColumn(event) {
    event.stopPropagation()
    draggingColumn = this
    draggingColumn.classList.add('unvisible')

    console.log('start', draggingColumn)
}

function eventDragEndColumn(event) {
    console.log(draggingTask)
    console.log(draggingColumn)
    if (!draggingTask) {
        console.log('end', draggingColumn)
        draggingColumn.classList.remove('unvisible')
        draggingColumn = null
    }

}

function eventDragEnterColumn(event) {
    if (this === draggingColumn || draggingTask) {
        return
    }
    this.classList.add('half-visible')
    console.log('enter', this)
}

function eventDragOverColumn(event) {
    event.preventDefault()
    if (this === draggingColumn || draggingTask) {
        return
    }
}

function eventDragLeaveColumn(event) {
    if (this === draggingColumn || draggingTask) {
        return
    }
    this.classList.remove('half-visible')
    console.log('leave', this)
}

function eventDropColumn(event) {
    event.stopPropagation()
    this.classList.remove('half-visible')
    if (this === draggingColumn || draggingTask) {
        return
    }


    if (this !== draggingColumn) {
        if (this.parentElement === draggingColumn.parentElement) {
            const draggingArray = Array.from(document.querySelectorAll('.column'))
            const indexA = draggingArray.indexOf(this)
            const indexB = draggingArray.indexOf(draggingColumn)

            if (indexA < indexB) {
                this.parentElement.insertBefore(draggingColumn, this)
            } else {
                this.parentElement.insertBefore(draggingColumn, this.nextElementSibling)
            }
        } else {
            this.parentElement.insertBefore(draggingColumn, this)
        }
    }
    console.log('drop under', this)
    console.log('droped', draggingColumn)
}



const changeBackground = () => {
    const backgroundImage = ['url(/src/backgrounds/kordan1.jpg)', 'url(/src/backgrounds/kordan2.jpg)', 'url(/src/backgrounds/kordan3.jpg)', 'url(/src/backgrounds/kordan4.jpg)', 'url(/src/backgrounds/kordan5.jpg)', 'url(/src/backgrounds/kordan6.jpg)']

    document.addEventListener('DOMContentLoaded', () => {
        let randomIndexImg = Math.round(Math.random() * (backgroundImage.length - 1))

        console.log(randomIndexImg)
        document.querySelector('body').style.background = backgroundImage[randomIndexImg] + ' no-repeat'
    })
}

changeBackground()