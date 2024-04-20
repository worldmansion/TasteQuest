const { RecipeDAO } = require("../recipe/recipe.model");

class User {
    constructor(id, name, email, bookmarkList) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.bookmarkList = bookmarkList || [];
    
    }

    bookmarkRecipe(recipeId) {
        if (!this.bookmarkList.includes(recipeId)) {
            this.bookmarkList.push(recipeId);
        }
    }

    removeBookmark(recipeId) {
        this.bookmarkList = this.bookmarkList.filter(id => id !== recipeId);
    }
}

class UserDAO {
    constructor(databaseConnection) {
        // Design pattern DEPENDENCY INJECTION
        this.database = databaseConnection;
    }

    getUser(id) {
        const user = this.database.data.users.find((user) => {
            return user.id == id
        })

        return user
    }

    createUser({ name, email }) {
        const newUser = new User(this.database.data.lastUserId + 1, name, email, [] );
        // check if email already exists .find(user . email == email)
        const newUsers = [...this.database.data.users, newUser]

        this.database.updateData({ users: newUsers, lastUserId: newUser.id   })

        return newUser
    }

    deleteUser(userId) {
        const newUsers = this.database.data.users.filter((usr) => usr.id !== userId)

        this.database.updateData({ users: newUsers })
    }

    getUserList() {
        return this.database.users.data
    }

    addBookmark(userId, recipeId) {
        const user = this.getUser(userId);
        if (user) {
            user.bookmarkRecipe(recipeId);
        }
    }

    removeBookmark(userId, recipeId) {
        const user = this.getUser(userId);
        if (user) {
            user.removeBookmark(recipeId);
        }
    }

    getBookmarkedRecipes(userId) {
        const user = this.getUser(userId);
        const recipeDao = new RecipeDAO(this.database);

        const recipes = user.bookmarkList.map(recipeId => recipeDao.getRecipe(recipeId));

        return recipes
    }
}

module.exports = { User, UserDAO };