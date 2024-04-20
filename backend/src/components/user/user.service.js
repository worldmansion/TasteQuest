
const database = require("../../database/database");
const { isEmail } = require("../../utils/validationHelpers");
const { UserDAO } = require("./user.model");

const UserService = {
    getUser: (req, res) => {
        const userId = req.params.id;
        const userDao = new UserDAO(database);

        const foundUser = userDao.getUser(userId);

        res.send({ user: foundUser });
    },

    addBookmark: (req, res) => {
        const userId = req.params.id;
        const recipeId = req.params.recipeId;
        const userDao = new UserDAO(database);

        userDao.addBookmark(userId, recipeId);

        res.send({ message: "Bookmark added successfully." });
    },

    removeBookmark: (req, res) => {
        const userId = req.params.id;
        const recipeId = req.params.recipeId;

        const userDao = new UserDAO(database);

        userDao.removeBookmark(userId, recipeId);

        res.send({ message: "Bookmark removed successfully." });
    },

    createUser: (req, res) => {
        const { name, email } = req.body

        if (!name || !email) { // javascript falsy value
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

    deleteUser: (req, res) => {
        try {
            const userId = req.params.id;

            if (!isNaN(userId) && Number.isInteger(parseFloat(userId)) && userId > 0) {
                return res.status(400).send({ message: "Invalid ID!!" })
            }

            const userDao = new UserDAO(database);

            userDao.deleteUser(userId)
    
            return res.status(200).send({message: "User deleted"})
        } catch(error) {

            console.log("error")
            return res.status(400).send({message: "Invalid ID!!"})
        }
    },

    getAllBookmarkedRecipes: (req, res) => {
        // by melo zavolat dao a vratit list receptů ulozrnych
    }
};

module.exports = UserService;




