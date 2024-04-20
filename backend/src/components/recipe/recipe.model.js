class Recipe {
    constructor({id, title, ingredient, calories, cookingTime, imageURL, url}) {
        this.id = id;
        this.title = title;
        this.ingredient = ingredient; // Array of ingredient names
        this.calories = calories;
        this.cookingTime = cookingTime; // In minutes
        this.imageURL = imageURL;
        this.url = url;
    }
}

class RecipeDAO {
    constructor(databaseConnection) {
        this.database = databaseConnection;
    }

    createRecipe({ title, ingredient, calories, cookingTime, imageURL, url }) {
        
        const ingredientsArray = typeof ingredient === 'string' ? ingredient.split(',').map(item => item.trim()) : ingredient;

       
        if (this.database.recipes.some(recipe => recipe.url === url)) {
            console.log("Recipe with the same URL already exists.", url);
            return null;  
        }

        
        const newId = (this.database.lastRecipeId = (this.database.lastRecipeId || 0) + 1);

        
        const newRecipe = new Recipe({
            id: newId,
            title,
            ingredient: ingredient.split(',').map(ing => ing.trim()), // ingredientsArray,
            calories,
            cookingTime,
            imageURL,
            url
        });

       
        this.database.recipes.push(newRecipe);

        
        this.notifySubscribers();

        // Return the newly created recipe
        return newRecipe;
    }

    
    getRecipe(id) {
        return this.database.recipes.find(recipe => recipe.id === id);
    }
    
    
    deleteRecipe(recipeId) {
            const newRecipes = this.database.data.recipes.filter((recipes) => recipes.id !== recipesId)
    
            this.database.updateData({ recipes: newRecipes })
    }
    
    notifySubscribers() {
        this.database.notify();
    }
}

module.exports = { Recipe, RecipeDAO };
