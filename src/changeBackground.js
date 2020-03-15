const changeBackground = {

    create(backgroundImage) {
        if (backgroundImage) {
            document.addEventListener('DOMContentLoaded', () => {
                let randomIndexImg = Math.round(Math.random() * (backgroundImage.length - 1))

                document.querySelector('body').style.background = backgroundImage[randomIndexImg] + ' no-repeat'
            })
        }
        return
    }
}

export {changeBackground}