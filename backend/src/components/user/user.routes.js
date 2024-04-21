
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
