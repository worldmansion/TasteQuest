class User {
    constructor(id, name, email) {
        this.id = id;       
        this.name = name;   
        this.email = email;
    }

}

class UserDAO {
    constructor(databaseConnection) {
        // Design pattern DEPENDENCY INJECTION
        this.database = databaseConnection;
    }

    getUser(id) {
        const user = this.database.users.find((user) => {
            return user.id == id
        })

        return user
    }

}

module.exports = {User, UserDAO};