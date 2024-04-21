class Recipe {
    constructor({id, title, ingredient, calories, cookingTime, imageURL, url}) {
        this.id = id;
        this.title = title;
        this.ingredient = ingredient; 
        this.calories = calories;
        this.cookingTime = cookingTime; // minutes
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

        if (!Array.isArray(ingredientsArray)) {
            return
        }

        
        const newRecipe = new Recipe({
            id: this.database.newId(),
            title,
            ingredient: ingredientsArray,
            calories,
            cookingTime,
            imageURL,
            url
        });

       
        this.database.data.recipes.push(newRecipe);

        
        this.notifySubscribers();

        return newRecipe;
    }

    
    getRecipe(id) {
        return this.database.data.recipes.find(recipe => recipe.id === id);
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
