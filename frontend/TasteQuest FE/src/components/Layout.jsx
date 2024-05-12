import { Box, Container, CssBaseline } from '@mui/material'
import { logo } from '../assets/logo'

export const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />

      <Box sx={{ width: '100%', p: 2 }}>
        <Container maxWidth="sm">
          <div
            style={{
              overflow: 'hidden',
              width: '170px',
              height: '100px',
              borderRadius: '5px',
              margin: 'auto',
              marginBottom: '20px',
            }}
          >
            <img
              src={`data:image/png;base64,${logo}`}
              alt="Description of image"
              style={{
                width: '212px',
                position: 'relative',
                top: '-53px',
                left: '-20px',
              }}
            />
          </div>
        </Container>
        {children}
      </Box>
    </>
  )
}
