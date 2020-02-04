import * as $ from 'jquery'

function createAnalytics(): object {
    let counter = 0
    let destroyed: boolean = false

    const lisener = (): number => counter++

    $(document).on('click', lisener)
    
    return {
        destroy(){
            $(document).off('click', lisener)
            destroyed = true
        },

        getClicks() {
            if(destroyed) {
                return 'Analytics is destroyed'
            }
            return counter
        }
    }
    
    
}

window['analytics'] = createAnalytics()