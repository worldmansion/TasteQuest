import {
  Box,
  Container,
  Divider,
  IconButton,
  InputBase,
  Paper,
  LinearProgress,
  Tooltip,
  Menu,
  MenuItem,
  TextField,
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { useTasteQuestApi } from '../hooks/useTasteQuestApi'
import { Recipe } from '../components/Recipe'
import { useData } from '../store/appStore'
import { useState, useEffect, useMemo } from 'react'
import { useUserApi } from '../hooks/useUserApi'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

export const Home = () => {
  const { data, setData } = useData()
  const [isLoading, setIsLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { search, recipes, user, favourites } = data
  const { getAllBookmarkedRecipes } = useUserApi()
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [showFavourites, setShowFavourites] = useState(false)

  const handleOpenFilter = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseFilter = () => {
    setAnchorEl(null)
  }

  const setSearch = (value) => {
    setData({ ...data, search: value })
  }

  const setRecipes = (value) => {
    setData({ ...data, recipes: value })
  }

  const { queryEdamam } = useTasteQuestApi()

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleOnSearchClick = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const newRecipes = await queryEdamam(search)
    setRecipes(newRecipes)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllBookmarkedRecipes(user?.id).then((result) => {
      const favourites = result || []
      setData({ ...data, favourites })
    })
  }, [])

  const filteredRecipes = useMemo(() => {
    if (showFavourites) {
      if (min || max) {
        return favourites.filter((rcp) => {
          if (!rcp.cookingTime) return false
          if (rcp.cookingTime > min && rcp.cookingTime < max) return true
        })
      }

      return favourites
    }
    if (min || max) {
      return recipes.filter((rcp) => {
        if (!rcp.cookingTime) return false
        if (rcp.cookingTime > min && rcp.cookingTime < max) return true
      })
    }
    return recipes
  }, [recipes, min, max, showFavourites, favourites])

  return (
    <>
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
          component="form"
          disabled={showFavourites}
          onSubmit={handleOnSearchClick}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={
              showFavourites
                ? 'All your favourites are listed here...'
                : 'Search Recipes'
            }
            value={search}
            onChange={handleChange}
            disabled={showFavourites}
            inputProps={{ 'aria-label': 'Search Recipes' }}
          />
          {!showFavourites && (
            <IconButton
              onClick={handleOnSearchClick}
              type="button"
              sx={{ p: '10px' }}
              disabled={showFavourites}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          )}
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color={min || max ? 'secondary' : 'primary'}
            sx={{ p: '10px' }}
            aria-label="directions"
            onClick={handleOpenFilter}
          >
            {(min || max) && <FilterAltIcon />}
            {!min && !max && <FilterAltOutlinedIcon />}
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Tooltip title="Show my Favourites">
            <IconButton
              color={showFavourites ? 'secondary' : 'primary'}
              sx={{ p: '10px' }}
              aria-label="directions"
              onClick={() => {
                setShowFavourites(!showFavourites)
                setSearch('')
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>

          <Menu
            id="time-range-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleCloseFilter}
          >
            <MenuItem>
              <TextField
                type="text"
                placeholder="Minimum time in minutes"
                variant="outlined"
                value={min}
                onChange={(e) => setMin(e.target.value)}
              />
            </MenuItem>
            <MenuItem>
              <TextField
                type="text"
                placeholder="Maximum time in minutes"
                variant="outlined"
                value={max}
                onChange={(e) => setMax(e.target.value)}
              />
            </MenuItem>
            {(min || max) && (
              <MenuItem>
                <Button
                  type="text"
                  onClick={() => {
                    setMin('')
                    setMax('')
                  }}
                  variant="outlined"
                >
                  Cancel Filter
                </Button>
              </MenuItem>
            )}
          </Menu>
        </Paper>
        {isLoading && <LinearProgress color="secondary" />}
      </Container>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          p: 1,
          pt: 3,
          justifyContent: 'center',
        }}
      >
        {filteredRecipes &&
          filteredRecipes.map((recipe, index) => (
            <Recipe key={`${recipe.title}${index}`} recipe={recipe} />
          ))}
      </Box>
    </>
  )
}
