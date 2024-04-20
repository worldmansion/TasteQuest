const path = require('path');
const fs = require('fs');

function saveToFile(data) {
    try {
        const filePath = path.join(__dirname, 'database.json');
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error('Failed to save database:', err);
            } else {
                console.log('Database saved to', filePath);
            }
        });
    } catch (error) {
        console.error(error)
    }
}

module.exports = saveToFile