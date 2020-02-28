const Xhr = {
     //метод формирования запроса на сервер
    sendTaskRequest(url, method, body) {
        //создание экземпляра объекта XHR
        const xhr = new XMLHttpRequest()

        //формирование параметров запроса (инициализация)
        xhr.open(method, url, true)
        //
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        //отправка запроса
        xhr.send(body)
    }
}

export {Xhr}