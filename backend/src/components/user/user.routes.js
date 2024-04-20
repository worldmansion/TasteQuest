
const express = require('express');
const UserService = require('./user.service');

const userRouter = express.Router();

userRouter.get('/:id', UserService.getUser);
userRouter.post('/', UserService.createUser);
userRouter.delete('/:id', UserService.deleteUser);
userRouter.post('/:id/bookmarks/:recipeId', UserService.addBookmark); 
userRouter.delete('/:id/bookmarks/:recipeId', UserService.removeBookmark); 
userRouter.get('/:id/bookmarks/', UserService.getAllBookmarkedRecipes)

module.exports = userRouter;




// 1) post /user (create) (dostanes user id)
// 2) edamam api
// 3) create recipe (dostanes recipe id) //tohle nemas
// 4) post na /:id/bookmarks/:recipeId - prolinkujes recept s uzivatelem (bookmark) 
                //tohle nemas
// 5) get('/:id/bookmarks/' 