import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRouter } from './routes/AppRouter'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

function App() {

  const theme = createTheme({
    palette: {

      primary: {
        main: '#FF6F00',
        contrastText: '#fff',
      },
      secondary: {
        main: '#1E3A8A',
        contrastText: '#fff',
      },

    }
  })

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
