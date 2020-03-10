const advice = ['advice1', 'advice2', 'advice3', 'advice4']

exports.getAdvice = () => {
    return advice[Math.floor(Math.random() * advice.length)]
}