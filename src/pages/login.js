import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router'

import { useAppContext } from '../context/AppContext'
import { dispatchTypes } from '../context/AppReducer';
import jwtDecode from 'jwt-decode';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Copyright from '../component/modules/Copyright'
import OAuthButton from '../component/modules/OAuthButton'

import { FormHelperText, IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { axiosMain } from '../axiosInstances';
import Image from 'next/image'
import useOnlineStatus from '../hook/useOnlineStatus';
import Fallback from './_offline';

export default function Login() {
  const router = useRouter();
  const isOnline = useOnlineStatus()


  const { state, dispatch } = useAppContext();
  const { currentUser } = state;


  const [data, setData] = useState({
    "email": "",
    "password": "",
  });
  const [error, setError] = useState(false)

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError(false);
  };


  const [loading, setLoading] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    await axiosMain
      .post("/authenticate", data)
      .then(response => {
        setLoading(false)

        const decodedJWT = jwtDecode(response.data.result.accessToken)
        dispatch({
          type: dispatchTypes.LOGIN_SUCCEED,
          payload: {
            currentUser: decodedJWT.sub,
            currentUserRole: decodedJWT.role,
            currentExpirationDate: decodedJWT.exp,
            currentAccessToken: response.data.result.accessToken,
            currentRefreshToken: response.data.result.refreshToken
          }
        });
      })
      .catch(e => {
        setLoading(false)
        return(<Fallback />)
        setError(true)
        dispatch({
          type: dispatchTypes.LOGIN_FAIL
        })
      })
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/")
    }
  }, [router, currentUser])

  // Show Password functionality
  const [show, setShow] = useState(false)
  const handleClickShowPassword = () => {
    setShow(!show)
  };
  return (
    <div>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
        >
          <Box sx={{ position: 'relative', width: '100%', height: '100%', zIndex: '-100' }}
          >
            <Image src='https://source.unsplash.com/random' layout='fill'
              objectFit='cover' alt='Backdrop' />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Masuk ke akun anda
            </Typography>
            {/* OAuth */}
            <OAuthButton text={"Masuk dengan Google"}/>
            <Divider orientation="horizontal" flexItem>
              atau
            </Divider>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                value={data.email}
                error={(error && data.email.length > 0) || (error && data.email.length === 0)}
                helperText={(error && data.email.length > 0) && "" || (error && data.email.length === 0 && "Email harus diisi")}
                placeholder="Hazmi@gmail.com"
              />
              <FormControl
                fullWidth margin="normal" variant="outlined"
                required
                error={error && 'Password harus diisi' || data.password.length > 0 && data.password.length < 8}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={show ? 'text' : 'password'}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        id='togglePasswordAtLogin'
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {show ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  placeholder="Pass1234"

                />
                <FormHelperText>
                  {error && data.password.length === 0 && "Password harus diisi" || data.password.length > 0 && data.password.length < 8 &&
                    "Password harus minimal terdiri dari 8 karakter"
                  }
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                id='submitAtLogin'
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Masuk
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/registration" passHref>
                    <Button sx={{ pl: 0 }} variant='text' >Belum memiliki akun? Registrasi</Button>
                  </Link>

                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
