const ObservableDatabase = require("./ObservableDatabase");
const saveToFile = require("./saveDbToFile");

const database = new ObservableDatabase()
database.subscribe(saveToFile);


module.exports = database;