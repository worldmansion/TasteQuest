const database = require("../../database/database");
const fetchData = require("../../utils/fetchData");
const fetchRecipes = require("./recipe.edamam.query");

const { Recipe, RecipeDAO } = require("./recipe.model");
const ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";
const APP_ID = "55480d47";
const API_KEY = "ec08cfc8cccee574ad4e25218cc677cf";

const RecipeService = {
  getRecipe: (req, res) => {
    const recipeId = req.params.id;
    const recipeDao = new RecipeDAO(database);

    const foundRecipe = recipeDao.getRecipe(recipeId);

    res.send({
      recipe: foundRecipe,
    });
  },

  createRecipe: (req, res) => {
    const { title, ingredient, calories, cookingTime, imageURL, url } =
      req.body;

    const recipeDao = new RecipeDAO(database);
    const newRecipe = recipeDao.createRecipe({
      title,
      ingredient,
      calories,
      cookingTime,
      imageURL,
      url,
    });

    if (!newRecipe) {
      return res.status(500).send({ message: "Failed to create recipe" });
    }

    return res.status(201).json(newRecipe);
  },

  getRecipeFromEdamam: async (req, res) => {
    try {
      const query = req.query.q;
      const edamamResponse = await fetchRecipes(query);

      const recipes = edamamResponse.hits.map(({ recipe }) => {
        return new Recipe({
          calories: recipe.calories, // zaokruhlovanie v FE
          cookingTime: recipe.totalTime,
          url: recipe.url,
          ingredient: recipe.ingredientLines?.join(", "),
          imageURL: recipe.image,
          title: recipe.label,
        });
      });

      console.log("recipe", edamamResponse.hits[0]);

      res.status(200).send(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
      res.status(500).send({ message: "Failed to fetch recipes from Edamam" });
    }
  },
};

module.exports = RecipeService;
