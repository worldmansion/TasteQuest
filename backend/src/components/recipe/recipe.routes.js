const express = require('express');
const RecipeService = require('./recipe.service');

const recipeRouter = express.Router();

recipeRouter.get('/:id', RecipeService.getRecipe); // get a specific recipe
// recipeRouter.get('/', RecipeService.getAllRecipes); // get all recipes

recipeRouter.post('/', RecipeService.createRecipe); //dodelat

recipeRouter.get('/edamam/api/', RecipeService.getRecipeFromEdamam)

module.exports = recipeRouter;

