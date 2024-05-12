import { request } from '../api/request'

export const useTasteQuestApi = () => {
  const queryEdamam = async (query) => {
    const [error, result] = await request(
      'recipe/edamam/api',
      undefined,
      'GET',
      query,
    )
    if (error) {
      console.error('Error:', error)
      return null
    }
    return result
  }

  const getRecipeById = async (recipeId) => {
    const [error, result] = await request(
      `recipe/${recipeId}`,
      undefined,
      'GET',
    )
    if (error) {
      console.error('Error:', error)
      return null
    }
    return result
  }

  const createRecipe = async (recipe) => {
    const [error, result] = await request(
      `recipe`,
      recipe,
    )
    if (error) {
      console.error('Error:', error)
      return null
    }
    return result
  }

  return {
    queryEdamam,
    getRecipeById,
    createRecipe
  }
}
