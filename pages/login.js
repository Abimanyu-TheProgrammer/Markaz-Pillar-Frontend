import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useRouter} from 'next/router'
import { useState } from 'react';
import LoginForm from '../component/modules/LoginForm';
import { useAppContext } from '../context/AppContext'
import { dispatchTypes } from '../context/AppReducer';
import jwtDecode from 'jwt-decode';


const theme = createTheme();

export default function Login() {
  const router = useRouter();

  const { state, dispatch } = useAppContext();
  const { currentUser } = state;
  console.log(currentUser)

  const [value, setValue] = useState({
    "email": "",
    "password": "",
  });
  const [error, setError] = useState({
    "status": 201,
    "statusText": ""
  })

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/api/login`, {
      body: JSON.stringify(value),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then(preResponse => {
        console.log("Pre response", preResponse)
        preResponse.json()
          .then(response => {
            if (preResponse.status === 200) {
              console.log("page success", response)
              dispatch({
                type: dispatchTypes.LOGIN_SUCCEED,
                payload: {
                  currentUser: jwtDecode(response.result.accessToken).sub,
                  currentAccessToken: response.result.accessToken,
                  currentRefreshToken: response.result.refreshToken
                }
              });
            } else {
              console.log("Login Error", response)
            }
          })
          .catch(error => {
            console.log("response error", error)
          });
      })
      .catch(error => {
        console.log(error)
      })
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/landing")
    }
  }, [router, currentUser])

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
            <LoginForm value={value} error={error} handleChange={handleChange} handleSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
