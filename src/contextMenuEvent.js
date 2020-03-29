const ContextMenuEvent = {

    handler(element, columnFlag) {

        const axios = require('axios')
        let contextMenu = document.querySelector('.pop-over')

        const showMenu = (x, y) => {
            contextMenu.style.left = x + 'px'
            contextMenu.style.top = y + 'px'
            contextMenu.style.display = 'inline'
        }

        const hideMenu = () => {
            contextMenu.style.display = 'none'
        }

        element.addEventListener('contextmenu', event => {
            console.log('CONTEXT MENU EVENT')
            event.preventDefault()
            showMenu(event.pageX, event.pageY)
            event.stopPropagation()

            contextMenu.querySelector('#delete').addEventListener('click', e => {

                console.log('CLICK on CONTEXT MENU')
                if (!columnFlag) {
                    element.remove()
                    hideMenu()
                    console.log(`Task ${element.getAttribute('data-task-id')} removed ${columnFlag}`)
                    // axios.delete('/remove', {
                    //         params: {
                    //             idTask: element.getAttribute('data-task-id')
                    //         }
                    //     }).then(response => console.log(response))
                    //     .catch(error => console.log(error))
                } else {
                    element.remove()
                    hideMenu()
                    console.log(`Column ${ element.getAttribute('data-column-id')} removed ${columnFlag}`)
                    // axios.delete('/remove', {
                    //         params: {
                    //             idColumn: element.getAttribute('data-column-id')
                    //         }
                    //     }).then(response => console.log(response))
                    //     .catch(error => console.log(error))
                }
            })
        })

        document.addEventListener('click', event => {
            if (event !== 2) {
                hideMenu()
            }
        })
        contextMenu.addEventListener('click', event => {
            event.stopPropagation()
        })
        // contextMenu.querySelector('#delete').addEventListener('click', event => {
        //     //e.stopPropagation()
        //     console.log('CLICK on CONTEXT MENU')
        //     if (!columnFlag) {
        //         element.remove()
        //         hideMenu()
        //         console.log(`Task ${element.getAttribute('data-task-id')} removed ${columnFlag}`)
        //         // axios.delete('/remove', {
        //         //         params: {
        //         //             idTask: element.getAttribute('data-task-id')
        //         //         }
        //         //     }).then(response => console.log(response))
        //         //     .catch(error => console.log(error))
        //     } else {
        //         element.remove()
        //         hideMenu()
        //         console.log(`Column ${ element.getAttribute('data-column-id')} removed ${columnFlag}`)
        //         // axios.delete('/remove', {
        //         //         params: {
        //         //             idColumn: element.getAttribute('data-column-id')
        //         //         }
        //         //     }).then(response => console.log(response))
        //         //     .catch(error => console.log(error))
        //     }
        // })

    },
}

export {
    ContextMenuEvent
}