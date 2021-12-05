import '../styles/globals.css'
import { AppWrapper } from '../context/AppContext'
import Layout from '../component/layout'
import ProtectedRoutes from '../ProtectedRoutes'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme'


function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <ProtectedRoutes router={router}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProtectedRoutes>
      </AppWrapper>
    </ThemeProvider>
  )
}

export default MyApp
