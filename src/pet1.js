//**Задача на vanilla JS** Из массива нулей и единиц полученного на входе после преобразования вывести десятичное число



let binNum = [1, 1, 1, 0]


function binToDec(binNumberArr){
    let decNumber = 0
    for (let i = 0; i < binNumberArr.length; i++) {
        decNumber = decNumber + binNumberArr[i] * Math.pow(2, binNumberArr.length - (i + 1))
    }
    return decNumber
}

console.log(binToDec(binNum))

const binArrayToDec = (array) => parseInt(array.join(''), 2)

console.log(binArrayToDec(binNum))


class String1 {
    constructor(str) {
        this.str = str
    }

    print() {
        console.log(this.str)
    }
}

const printStr = new String1('Hello!')

printStr.print()

const fun = n => n + 1

const sum = (a, b) => a + b 

