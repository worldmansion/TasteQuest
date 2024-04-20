const https = require('https');

async function fetchRecipes(query) {
    const app_id = '55480d47';
    const app_key = 'ec08cfc8cccee574ad4e25218cc677cf';
    const url = `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${app_id}&app_key=${app_key}`;
  
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(new Error(`HTTP error! status: ${response.statusCode}`));
            }
            response.on('data', (chunk) => data += chunk);
            response.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error("Error parsing JSON!"));
                }
            });
        }).on('error', reject);
    });
}

module.exports = fetchRecipes;
