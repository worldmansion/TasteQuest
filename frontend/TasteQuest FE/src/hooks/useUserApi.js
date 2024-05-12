import { request } from "../api/request";

export const useUserApi = () => {
  const getUser = async (id) => {
    const [error, result] = await request(`user/${id}`, undefined, 'GET');
    if (error) {
      console.error(`Error fetching user by ID ${id}:`, error);
      return null;
    }
    return result;
  };

  const getAllUsers = async () => {
    const [error, result] = await request('user', undefined, 'GET');
    if (error) {
      console.error('Error fetching all users:', error);
      return null;
    }
    return result;
  };

  const createUser = async (user) => {
    const [error, result] = await request('user', user);
    if (error) {
      console.error('Error creating user:', error);
      return null;
    }
    return result;
  };

  const addBookmark = async (userId, recipeId) => {
    const [error, result] = await request(`user/${userId}/bookmarks/${recipeId}`, undefined, 'POST');
    if (error) {
      console.error(`Error adding bookmark for user ID ${userId} and recipe ID ${recipeId}:`, error);
      return null;
    }
    return result;
  };

  const removeBookmark = async (userId, recipeId) => {
    const [error, result] = await request(`user/${userId}/bookmarks/${recipeId}`, undefined, 'DELETE');
    if (error) {
      console.error(`Error removing bookmark for user ID ${userId} and recipe ID ${recipeId}:`, error);
      return null;
    }
    return result;
  };

  const getAllBookmarkedRecipes = async (userId) => {
    const [error, result] = await request(`user/${userId}/bookmarks`, undefined, 'GET');
    if (error) {
      console.error(`Error fetching bookmarked recipes for user ID ${userId}:`, error);
      return null;
    }
    return result;
  };

  return {
    getUser,
    getAllUsers,
    createUser,
    addBookmark,
    removeBookmark,
    getAllBookmarkedRecipes,
  };
};
