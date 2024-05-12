import { Box, Container, CssBaseline } from '@mui/material'
import { logo } from '../assets/logo'

export const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          margin: '0 auto',
        }}
      >
        <Container
          component="main"
          sx={{
            flex: '1 0 auto',
            width: '100%',
            maxWidth: 'none',
          }}
        >
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
              alt="Logo"
              style={{
                width: '212px',
                position: 'relative',
                top: '-53px',
                left: '-20px',
              }}
            />
          </div>
          {children}
        </Container>
        <footer
          style={{
            textAlign: 'center',
            padding: '10px 0',
            backgroundColor: '#343a40',
            width: '100%',
          }}
        >
          © Katarína Marciová
        </footer>
      </Box>
    </>
  )
}
