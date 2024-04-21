const { RecipeDAO } = require("../recipe/recipe.model");

class User {
    constructor(id, name, email, bookmarkList) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.bookmarkList = bookmarkList || [];
    
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
        const newUser = new User(this.database.newId(), name, email, [] );
        
        const newUsers = [...this.database.data.users, newUser]

        this.database.updateData({ users: newUsers   })

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
            if (!user.bookmarkList.includes(recipeId)) {
                user.bookmarkList.push(recipeId);
            }
            this.notifySubscribers();
            return true
        }
        return false
    }

    removeBookmark(userId, recipeId) {
        const user = this.getUser(userId);
        if (user) {
            user.bookmarkList = user.bookmarkList.filter(iteratedRecipeId => iteratedRecipeId !== recipeId);
            this.notifySubscribers();
            return true;
        }
        return false;
    }
    
    getBookmarkedRecipes(userId) {
        const user = this.getUser(userId);
        const recipeDao = new RecipeDAO(this.database);
        const recipes = user.bookmarkList.map(recipeId => recipeDao.getRecipe(recipeId));
        return recipes;
    }
    
    notifySubscribers() {
        this.database.notify();
    }
}

module.exports = { User, UserDAO };