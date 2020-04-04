const ContextMenuEvent = {
    removingElement: false,
    hideElementMenu: true,

    handler(element, columnFlag) {
        const axios = require('axios')
        let contextMenu = document.querySelector('#delete')

        const showMenu = (x, y) => {
            contextMenu.style.left = x + 'px'
            contextMenu.style.top = y + 'px'
            contextMenu.style.display = 'inline'
            ContextMenuEvent.hideElementMenu = false
        }

        const hideMenu = () => {
            contextMenu.style.display = 'none'
            ContextMenuEvent.hideElementMenu = true
            //ContextMenuEvent.removeElement = true
        }


        element.addEventListener('contextmenu', event => {
            ContextMenuEvent.removingElement = true
            console.log('CONTEXT MENU EVENT on ELEMENT: ', element.getAttribute('data-task-id'))
            event.preventDefault()
            event.stopPropagation()
            showMenu(event.pageX, event.pageY)

            console.log('contextMenu', contextMenu)
            element.remove()

            // if (ContextMenuEvent.removingElement && !ContextMenuEvent.hideElementMenu) {

            //     contextMenu.addEventListener('click', e => {
            //         e.stopPropagation()
            //         e.preventDefault()
            //         console.log('CLICK on CONTEXT MENU')
            //         // console.log(ContextMenuEvent.removeElement)


            //         if (!columnFlag) {


            //             hideMenu()
            //             console.log(`Task ${element.getAttribute('data-task-id')} removed`)
            //             // axios.delete('/remove', {
            //             //         params: {
            //             //             idTask: element.getAttribute('data-task-id')
            //             //         }
            //             //     }).then(response => console.log(response))
            //             //     .catch(error => console.log(error))
            //             ContextMenuEvent.removingElement = false
            //         } else {
            //             element.remove()
            //             hideMenu()
            //             console.log(`Column ${ element.getAttribute('data-column-id')} removed`)
            //             // axios.delete('/remove', {
            //             //         params: {
            //             //             idColumn: element.getAttribute('data-column-id')
            //             //         }
            //             //     }).then(response => console.log(response))
            //             //     .catch(error => console.log(error))
            //             ContextMenuEvent.removingElement = false
            //         }
            //     })
            // }
            console.log('removingElement', ContextMenuEvent.removingElement)
            console.log('hideElementMenu', ContextMenuEvent.hideElementMenu)
        })


        document.addEventListener('click', event => {
            if (event !== 2) {
                hideMenu()
                ContextMenuEvent.hideElementMenu = true
            }
        })
        contextMenu.addEventListener('click', event => {
            event.stopPropagation()
        })

        element.addEventListener('blur', event => {
            console.log('BLUR')
        })

        // console.log('removingElement', ContextMenuEvent.removingElement)
        // console.log('hideElementMenu', ContextMenuEvent.hideElementMenu)



    },
}

export {
    ContextMenuEvent
}