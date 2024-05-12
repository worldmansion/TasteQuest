import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppRouter } from './AppRouter'
import { DataProvider } from './store/appStore'
import { Layout } from './components/Layout'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { Alerts } from './components/Alerts'

export const themeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#ef6c00',
      light: '#ffb74d',
    },
    secondary: {
      main: '#00ffeb',
    },
  },
}

const theme = createTheme(themeOptions)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <AppRouter />
          <Alerts />
        </Layout>
      </ThemeProvider>
    </DataProvider>
  </React.StrictMode>,
)
