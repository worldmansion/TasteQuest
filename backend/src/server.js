const express = require('express');
const userRouter = require('./components/user/user.routes');
const recipeRouter = require('./components/recipe/recipe.routes');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json())
app.use('/user', userRouter)
app.use('/recipe', recipeRouter)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
