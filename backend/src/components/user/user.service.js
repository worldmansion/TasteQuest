
const database = require("../../database/database");
const { isEmail } = require("../../utils/validationHelpers");
const { UserDAO } = require("./user.model");

const UserService = {
    getUser: (req, res) => {
        const userId = req.params.id;

        if (typeof(userId) !== 'string') {
            return res.status(400).send({ message: "Invalid ID!!" })
        }

        const userDao = new UserDAO(database);

        const foundUser = userDao.getUser(userId);

        if (!foundUser) {
            return res.status(404).send({ message: "User not found." })
        }

        res.send({ user: foundUser });
    },

    getAllUsers: (req, res) => {
        const userDao = new UserDAO(database);
        res.send(userDao.getAllUsers())
    },

    addBookmark: (req, res) => {
        const userId = req.params.id;
        const recipeId = req.params.recipeId;

        if (typeof(userId) !== 'string' || typeof(recipeId) !== 'string' ) {
            return res.status(400).send({ message: "Invalid ID!!" })
        }

        const userDao = new UserDAO(database);

        const wasSuccesful = userDao.addBookmark(userId, recipeId);

        if (wasSuccesful) {
            return res.send({ message: "Bookmark added successfully." });
        }

        return res.status(500).send({ message: "Bookmark addition wasn't successful" });
    },

    removeBookmark: (req, res) => {
    const userId = req.params.id;
    const recipeId = req.params.recipeId;

    if (typeof(userId) !== 'string' || typeof(recipeId) !== 'string') {
        return res.status(400).send({ message: "Invalid ID!!" })
    }

    const userDao = new UserDAO(database);
    const wasSuccessful = userDao.removeBookmark(userId, recipeId);

    if (wasSuccessful) {
        return res.send({ message: "Bookmark removed successfully." });
    }

    return res.status(500).send({ message: "Bookmark removal wasn't successful" });
},


    createUser: (req, res) => {
        const { name, email } = req.body

        if (!name || !email) { 
            return res.status(400).send({ message: "Email or name isn't filled" });
        }

        if (typeof(name) !== 'string' || typeof(email) !== 'string' ) {
            return res.status(400).send({ message: "Invalid properties." })
        }

        if (!isEmail(email)) {
            return res.status(400).send({ message: "Send valid email!" })
        }

        const userDao = new UserDAO(database);

        const newUser = userDao.createUser({ name, email })

        if (!newUser) {
            return res.status(400).send({ message: "Email already exists" })
        }

        return res.status(201).send(newUser)
    },


    getAllBookmarkedRecipes: (req, res) => {
        const userId = req.params.id;

        if (typeof(userId) !== 'string') {
            return res.status(400).send({ message: "Invalid ID!!" })
        }

        const userDao = new UserDAO(database)

        return res.status(200).send(userDao.getBookmarkedRecipes(userId))
    }
};

module.exports = UserService;




