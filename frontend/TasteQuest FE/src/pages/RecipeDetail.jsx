import { Box, Typography, IconButton, Link } from '@mui/material'
import { useData } from '../store/appStore'
import { Navigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

export const RecipeDetail = () => {
  const { data } = useData()
  const { recipeDetail } = data
  const navigate = useNavigate()

  console.log('recipeDetail', recipeDetail)

  if (!recipeDetail) return <Navigate to="/" replace />

  return (
    <Box>
      <IconButton
        style={{ position: 'absolute', top: 20 }}
        color="primary"
        variant="contained"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box>
        <Typography variant="h4">{recipeDetail.title}</Typography>
        <Link href={recipeDetail.url}>Stránka receptu</Link>
      </Box>
      <iframe
        style={{
          all: 'revert',
          isolation: 'isolate',
          width: '100%',
          height: 'calc(100vh - 200px)',
          position: 'fixed',
          marginTop: 200,
          top: 0,
          left: 0,
        }}
        sandbox
        src={recipeDetail.url}
        frameBorder="0"
      />
    </Box>
  )
}
