suite('About page tests', () => {
    test('Содержит ссылку на ya.ru', () => {
        assert(document.querySelector('a[href = "ya.ru"]'))
    })
    test('Содержит ссылку на vk.ru', () => {
        assert(document.querySelector('a[href = "vk.ru"]'))
    })
})