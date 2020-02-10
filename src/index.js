import './styles/scss.scss'

const counters = {
    idTasks: 13,
    idColumns: 4,
}
const columns = document.querySelectorAll('.column')
const columnAdd = document.querySelector('.column-add')

console.log('Column', columnAdd)


 

console.log(columns)


columns.forEach(element => {
    const buttonAdd = element.querySelector('.tast-add')
    console.log('---------------- ', element)

    buttonAdd.addEventListener('click', function(event) {
        const newTask = document.createElement('div')
        
        newTask.classList.add('list-item')
        newTask.setAttribute('data-task-id', counters.idTasks)
        newTask.setAttribute('draggrable', 'true')
        counters.idTasks++

        element.querySelector('.list').append(newTask)

        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!')
        
     })

});

columnAdd.addEventListener('click', function(){
    const newColumn = document.createElement('div')
    const newColumnHead = document.createElement('div')
    const newColumnButton = document.createElement('button')
    newColumnButton.innerHTML = 'Добавьте еще одну колонку'
    newColumnHead.innerHTML = 'New List'

    

    newColumn.classList.add('column')
    newColumn.setAttribute('data-column-id', counters.idColumns)
    counters.idColumns++

    newColumnHead.classList.add('board-body-head')
    newColumnButton.classList.add('tast-add')
    

    console.log('New Column Head', newColumnHead)
    console.log('New Column Button', newColumnButton)

    newColumn.append(newColumnHead)
    newColumn.append(newColumnButton)

    console.log('New Column', newColumn)
    

    document.querySelector('.column-add').before(newColumn)
})
