suite('Global test', () => {
    test('У данной страницы есть заголовок', () => {
        assert(document.title && document.title.match(/\S/))
    })
})