class ApiClient {
    constructor() {

    }

    get(url, data) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let config = {
            method: "GET",
            headers: headers
        };

        if (data) {
            let jsonData = JSON.stringify(data);
            config.body = jsonData;
        }

        let miPromesa = new Promise((resolve, reject) => {
            fetch(url, config).then((response) => {
                response.json().then((data) => {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            }).catch((reason)=> {
                console.log(reason);

                reject({
                    message:"Error de conexión con el servicio"
                });
            });
        });

        return miPromesa;
    }

    post(url, data) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let config = {
            method: "POST",
            headers: headers
        };

        if (data) {
            let jsonData = JSON.stringify(data);
            config.body = jsonData;
        }

        let miPromesa = new Promise((resolve, reject) => {
            fetch(url, config).then((response) => {
                response.json().then((data) => {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            }).catch((reason)=> {
                console.log(reason);
                reject({
                    message:"Error de conexión con el servicio"
                });
            });
        });

        return miPromesa;
    }

    put(url, data) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let config = {
            method: "PUT",
            headers: headers
        };

        if (data) {
            let jsonData = JSON.stringify(data);
            config.body = jsonData;
        }

        let miPromesa = new Promise((resolve, reject) => {
            fetch(url, config).then((response) => {
                response.json().then((data) => {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            }).catch((reason)=> {
                console.log(reason);
                reject({
                    message:"Error de conexión con el servicio"
                });
            });
        });

        return miPromesa;
    }

    delete(url, data) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let config = {
            method: "DELETE",
            headers: headers
        };

        if (data) {
            let jsonData = JSON.stringify(data);
            config.body = jsonData;
        }

        let miPromesa = new Promise((resolve, reject) => {
            fetch(url, config).then((response) => {
                response.json().then((data) => {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            }).catch((reason)=> {
                console.log(reason);
                reject({
                    message:"Error de conexión con el servicio"
                });
            });
        });

        return miPromesa;
    }
}