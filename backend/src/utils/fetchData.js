const https = require('https');

async function fetchData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';

            if (response.statusCode < 200 || response.statusCode >= 300) {
                reject(new Error(`HTTP error! status: ${response.statusCode}`));
            }

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

module.exports = fetchData