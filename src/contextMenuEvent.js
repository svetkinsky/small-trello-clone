const ContextMenuEvent = {
    removeElement: false,

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
            // if (!ContextMenuEvent.removeElement) {
            contextMenu.querySelector('#delete').addEventListener('click', e => {
                e.preventDefault()
                console.log('CLICK on CONTEXT MENU')

                if (!columnFlag) {
                    e.stopPropagation()
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
            // }
            ContextMenuEvent.removeElement = true
        })

        document.addEventListener('click', event => {
            if (event !== 2) {
                hideMenu()
            }
        })
        contextMenu.addEventListener('click', event => {
            event.stopPropagation()
        })

        element.addEventListener('blur', event => {
            console.log('BLUR')
        })
        // contextMenu.querySelector('#delete').addEventListener('click', event => {
        //     event.stopPropagation()
        //     console.log('ololo1 remove ', element)
        //     console.log('ololo2 remove ', removeElement)
        //     console.log('CLICK on CONTEXT MENU')
        //     if (!columnFlag) {
        //         removeElement.remove()
        //         hideMenu()
        //         console.log(`Task ${element.getAttribute('data-task-id')} removed ${columnFlag}`)
        //         // axios.delete('/remove', {
        //         //         params: {
        //         //             idTask: element.getAttribute('data-task-id')
        //         //         }
        //         //     }).then(response => console.log(response))
        //         //     .catch(error => console.log(error))
        //     } else {
        //         removeElement.remove()
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