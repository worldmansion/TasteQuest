const fs = require('fs');
const path = require('path');

function loadJSONFile(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}


class ObservableDatabase {
    constructor() {
        try {
            const filePath = path.join(__dirname, 'database.json');
            this.data = loadJSONFile(filePath)
        } catch (error) {
            this.data = {
                lastUserId: 0,
                lastRecipeId: 0,
                users: [],
                recipes: []
            }
        }

        this.subscribers = [];
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notify() {
        this.subscribers.forEach(callback => callback(this.data));
    }

    updateData(newData) {
        this.data = {...this.data, ...newData};
        this.notify();
    }
}

module.exports = ObservableDatabase