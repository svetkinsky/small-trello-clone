async function start () {
    return await Promise.resolve('async is working')
}

start().then(console.log)

const unused = 42

class Until {
    static id = Date.now()
}

console.log('Until ID: ', Until.id)
console.log(unused)

import('lodash').then( _ => {
    console.log('Lodash', _.random(0, 42, true))
})