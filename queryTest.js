const http = require('http');

http.get('http://localhost:8080/login?username=ray&password=test', (res) => {
    res.setEncoding('utf-8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        try {
            console.log(rawData);
        } catch (error) {
            console.error(error);
        }
    });
});

http.get('http://localhost:8080/getStatus?category=B', (res) => {
    res.setEncoding('utf-8');
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk;
    });
    res.on('end', () => {
        try {
            console.log(rawData);
        } catch (error) {
            console.error(error);
        }
    });
});