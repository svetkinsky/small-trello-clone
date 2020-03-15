const advice = require('../advice')
const changeBg = require('../src/changeBackground')
const assert = require('chai').assert

const backgroundImage = ['url(/backgrounds/kordan1.jpg)', 'url(/backgrounds/kordan2.jpg)', 'url(/backgrounds/kordan3.jpg)', 'url(/backgrounds/kordan4.jpg)', 'url(/backgrounds/kordan5.jpg)', 'url(/backgrounds/kordan6.jpg)']

suite('Test get advice', () => {
    test('getAdvice() должен вернуть advice', () => {
        assert(typeof advice.getAdvice() === 'string')
    })
})

suite('ChangeBackground() test', () => {
    test('ChangeBackground() должен вернуть 0', () => {
        assert(changeBg.create(backgroundImage) === 0, 'Провал')
    })
})