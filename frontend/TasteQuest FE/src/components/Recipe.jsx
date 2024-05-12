import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useData } from '../store/appStore'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { IconButton, CircularProgress } from '@mui/material'
import { isRecipeFavourite as findFavouriteRecipe } from '../utils/isRecipeFavourite'
import { useUserApi } from '../hooks/useUserApi'
import { useTasteQuestApi } from '../hooks/useTasteQuestApi'
import { useState } from 'react'
import { useAlert } from '../hooks/useAlert'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'

export const Recipe = ({ recipe }) => {
  const navigate = useNavigate()
  const { setData, data } = useData()
  const { favourites, user } = data
  const [isLoading, setIsLoading] = useState(false)

  const { addBookmark, removeBookmark, getAllBookmarkedRecipes } = useUserApi()
  const { createRecipe } = useTasteQuestApi()

  const { addAlert } = useAlert()

  const handleDetailClick = () => {
    setData((prevData) => ({ ...prevData, recipeDetail: recipe }))
    navigate(`/detail`)
  }

  const favouriteRecipe = findFavouriteRecipe(recipe, favourites)

  const toggleFavourite = (mode) => async () => {
    setIsLoading(true)
    if (mode === 'add_bookmark') {
      const newRecipe = await createRecipe(recipe)
      await addBookmark(user?.id, newRecipe?.id)
      getAllBookmarkedRecipes(user?.id).then((result) => {
        const favourites = result || []
        setData({ ...data, favourites })
        setIsLoading(false)
        addAlert({ key: 'add_bookmark', message: 'Added to bookmarks' })
      })

      return
    }

    await removeBookmark(user?.id, favouriteRecipe?.id)
    getAllBookmarkedRecipes(user?.id).then((result) => {
      const favourites = result || []
      setData({ ...data, favourites })
      setIsLoading(false)
      addAlert({ key: 'remove_bookmark', message: 'Removed from bookmarks' })
    })
  }

  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={recipe.imageURL}
        title={recipe.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.ingredient}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDetailClick}>
          Detail
        </Button>
        {!favouriteRecipe && !isLoading && (
          <IconButton
            color="primary"
            onClick={toggleFavourite('add_bookmark')}
            size="small"
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
        {favouriteRecipe && !isLoading && (
          <IconButton
            onClick={toggleFavourite('remove_bookmark')}
            color="secondary"
            size="small"
          >
            <FavoriteIcon />
          </IconButton>
        )}
        {isLoading && (
          <IconButton color="secondary" size="small">
            <CircularProgress size={20} />
          </IconButton>
        )}
        {!!recipe.cookingTime && (
          <Typography
            style={{ position: 'absolute', right: 11, bottom: 9 }}
            variant="body2"
            color="primary"
          >
            <AccessTimeOutlinedIcon />
            <span>{recipe.cookingTime} min</span>
          </Typography>
        )}
      </CardActions>
    </Card>
  )
}
