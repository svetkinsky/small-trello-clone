//**Задача на vanila JS** Создать функцию, которая принимает числовой аргумент и возвращает обратный ему по модулю

// function inverseValue(value) {
//         if(value == 0) {
//                 return 0
//         }
//         return (-1) * value
// }

// const inverseValue = (value) => -1 * value

const inverseValue = (value) => value == 0 ? 0 : -1 * value


console.log(inverseValue(prompt('Введите число')))


const c = a > b ? true : false