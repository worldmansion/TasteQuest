export const isRecipeFavourite = (recipe, favourites) => {
  const foundRecipe = favourites.find((recp) => recp?.url === recipe?.url)

  return foundRecipe
}
