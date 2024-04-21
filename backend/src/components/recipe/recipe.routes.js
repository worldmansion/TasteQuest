const express = require('express');
const RecipeService = require('./recipe.service');

const recipeRouter = express.Router();

recipeRouter.get('/:id', RecipeService.getRecipe); 
recipeRouter.post('/', RecipeService.createRecipe);
recipeRouter.get('/edamam/api/', RecipeService.getRecipeFromEdamam)

module.exports = recipeRouter;

