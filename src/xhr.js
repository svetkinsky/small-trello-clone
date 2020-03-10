const Xhr = {
  //xhrREsponse: {},

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
  },

  getTasks() {

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', '/tasks', true)


      xhr.onload = function () {
        if (xhr.status != 200) {
          console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`)
          let error = new Error(this.statusText)
          error.code = this.status
          reject(error)
        } else { // если всё прошло гладко, выводим результат
          console.log(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
          console.log('TYPE OF RESPONE', typeof this.response)
          resolve(JSON.parse(this.response))
          //return this.response
        }
      };


      xhr.onerror = function () {
        alert("Запрос не удался");
      }
      xhr.send()
    })

  }

}

export {
  Xhr
}