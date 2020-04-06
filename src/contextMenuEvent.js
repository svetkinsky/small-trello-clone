const ContextMenuEvent = {

    handler(element, columnFlag) {
        const axios = require('axios')
        let contextMenu = element.querySelector('.pop-over')

        const showMenu = (x, y) => {
            contextMenu.style.left = x + 'px'
            contextMenu.style.display = 'inline'
        }

        const hideMenu = () => {
            contextMenu.style.display = 'none'
        }


        element.addEventListener('contextmenu', event => {
            event.preventDefault()
            event.stopPropagation()
            showMenu(event.layerX, event.layerY)

            contextMenu.addEventListener('click', e => {
                e.stopPropagation()
                e.preventDefault()
                console.log('CLICK on CONTEXT MENU')
                if (!columnFlag) {
                    element.remove()
                    hideMenu()
                    console.log(`Task ${element.getAttribute('data-task-id')} removed`)
                    axios.delete('/remove', {
                            params: {
                                idTask: element.getAttribute('data-task-id')
                            }
                        }).then(response => console.log(response))
                        .catch(error => console.log(error))
                } else {
                    element.remove()
                    hideMenu()
                    console.log(`Column ${ element.getAttribute('data-column-id')} removed`)
                    axios.delete('/remove', {
                            params: {
                                idColumn: element.getAttribute('data-column-id')
                            }
                        }).then(response => console.log(response))
                        .catch(error => console.log(error))
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

        contextMenu.addEventListener('mouseout', event => {
            //console.log(event)
            hideMenu()
        })
    },
}

export {
    ContextMenuEvent
}