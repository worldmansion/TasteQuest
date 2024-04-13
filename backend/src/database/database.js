const { User } = require("../components/user/user.model")


const michal = new User(1, "Michal", "traktor@gmail.com");
const julia = new User (2, "Julia", "nova@gmail.com")

const database = {
    users: [michal, julia]
}


module.exports = database