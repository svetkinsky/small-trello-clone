import advice from '../advice'
import {
    changeBackground
} from '../src/changeBackground'
import {
    Column
} from '../src/column'
import {
    expect
} from "chai"

require('jsdom-global')()



describe("Test advice", () => {
    describe("Testing advice.getAdvice()", () => {
        it("should equal string", () => {
            const str = typeof advice.getAdvice()
            expect(str).to.equal("string")
        })
    })
})

describe("Change background test", () => {
    describe("Testing changeBackground.create()", () => {
        it("should return zero", () => {
            const backgroundImage = ['url(/backgrounds/kordan1.jpg)', 'url(/backgrounds/kordan2.jpg)', 'url(/backgrounds/kordan3.jpg)', 'url(/backgrounds/kordan4.jpg)', 'url(/backgrounds/kordan5.jpg)', 'url(/backgrounds/kordan6.jpg)']
            const zero = changeBackground.create(backgroundImage)
            expect(zero).to.equal(0)
        })
    })
})

describe("Column test", () => {
    describe("Testing column.create()", () => {
        it("should return new column", () => {
            const typeColumn = typeof Column.create()
            expect(typeColumn).to.equal("object")
        })
    })
})