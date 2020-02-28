const Xhr = {
     //
     saveTask(id, content, idParent) {
        //создание нового объекта
        const xhr = new XMLHttpRequest();

        //формирование параметров запроса (метод, url, синх/асинх)
        xhr.open("POST", '/submit', true);
        
        //HTTP-заголовок Content-Type со значением application/x-www-form-urlencoded ДЛЯ ЧЕГО??
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //
        const body = 'id=' + encodeURIComponent(id) +
            '&content=' + encodeURIComponent(content) + 
            '&idParent=' + encodeURIComponent(idParent);


        

        //xhr.onreadystatechange = ...;

        xhr.send(body);
    },

    sendTaskRequest(url, method, body) {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(body)
    }
}

export {Xhr}