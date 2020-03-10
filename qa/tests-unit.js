const advice = require('../advice')
const assert = require('chai').assert

suite('Test get advice', () => {
    test('getAdvice() должен вернуть advice', () => {
        assert(typeof advice.getAdvice() === 'string')
    })
})