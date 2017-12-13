const http = require('http');

http.get('http://localhost/login?username=ray&password=test', (res) => {
    res.setEncoding('utf-8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
        } catch (error) {
            console.error(error);
        }
    });
});

http.get('http://localhost/getCategory?category=A', (res) => {
    res.setEncoding('utf-8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
        } catch (error) {
            console.error(error);
        }
    });
});