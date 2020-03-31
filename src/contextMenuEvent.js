const ContextMenuEvent = {
    removingElement: false,
    hideElementMenu: true,

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
            ContextMenuEvent.removeElement = true
        }


        element.addEventListener('contextmenu', event => {
            ContextMenuEvent.removingElement = true
            ContextMenuEvent.hideElementMenu = false
            console.log('CONTEXT MENU EVENT on ELEMENT: ', element.getAttribute('data-task-id'))
            event.preventDefault()
            event.stopPropagation()
            showMenu(event.pageX, event.pageY)
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

        console.log('removingElement', ContextMenuEvent.removingElement)
        console.log('hideElementMenu', ContextMenuEvent.hideElementMenu)

        if (ContextMenuEvent.removingElement && !ContextMenuEvent.hideElementMenu) {

            contextMenu.querySelector('#delete').addEventListener('click', e => {
                e.preventDefault()
                console.log('CLICK on CONTEXT MENU')
                // console.log(ContextMenuEvent.removeElement)


                if (!columnFlag) {
                    e.stopPropagation()
                    element.remove()
                    hideMenu()
                    console.log(`Task ${element.getAttribute('data-task-id')} removed`)
                    // axios.delete('/remove', {
                    //         params: {
                    //             idTask: element.getAttribute('data-task-id')
                    //         }
                    //     }).then(response => console.log(response))
                    //     .catch(error => console.log(error))
                    ContextMenuEvent.removingElement = false
                } else {
                    element.remove()
                    hideMenu()
                    console.log(`Column ${ element.getAttribute('data-column-id')} removed`)
                    // axios.delete('/remove', {
                    //         params: {
                    //             idColumn: element.getAttribute('data-column-id')
                    //         }
                    //     }).then(response => console.log(response))
                    //     .catch(error => console.log(error))
                    ContextMenuEvent.removingElement = false
                }
            })
        }

    },
}

export {
    ContextMenuEvent
}