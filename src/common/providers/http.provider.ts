interface HttpOptions {
    params?: any,
    headers?: any
}

export namespace Http {

    function handlingHeaders(xmlRequest: XMLHttpRequest, headers){
        Object.keys(headers).forEach(key => {
            xmlRequest.setRequestHeader(key, headers[key]);
        });
    }

    export function get(url: string, options?: HttpOptions){
        let client = new XMLHttpRequest();
        if(options && options.headers) handlingHeaders(client, options.headers);
        client.open("GET", url, true);
        client.send();
        return new Promise((resp, rej) => {
            client.onreadystatechange = () => {
                if (client.readyState == XMLHttpRequest.DONE) {
                    resp(JSON.parse(client.responseText));
                }
            }
            client.onerror = () => rej(JSON.parse(client.responseText));
        });
    }

}