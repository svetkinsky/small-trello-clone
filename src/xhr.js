const Xhr = {
  xhrREsponse: {},

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

    getTasks(){
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '/tasks', true)
        xhr.send()
       

        xhr.onload = function() {
            if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
              console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
            } else { // если всё прошло гладко, выводим результат
              console.log(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
              
              Xhr.xhrREsponse = JSON.parse(xhr.response)
              console.log('type of response: ', typeof Xhr.xhrREsponse)
              return xhr.response
            }
          };
          
         
          xhr.onerror = function() {
            alert("Запрос не удался");
          }

    }

}

export {Xhr}