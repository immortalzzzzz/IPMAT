import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, CssBaseline, Grid, Avatar } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { login, getUserData } from '../redux/userDataSlice';
import '../styles/Account.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#66cdaa',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: '5px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

const AuthForm = ({ isSignup, handleSwitch }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    captcha: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUser = useSelector(getUserData);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (isSignup && !form.name) validationErrors.name = 'Name is required';
    if (!form.email) validationErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) validationErrors.email = 'Email is not valid';
    if (isSignup && !form.age) validationErrors.age = 'Age is required';
    if (!form.password) validationErrors.password = 'Password is required';
    else if (!validatePassword(form.password))
      validationErrors.password = 'Password must have at least one uppercase letter, one lowercase letter, one number, and one special character';
    if (isSignup && !form.confirmPassword) validationErrors.confirmPassword = 'Please confirm your password';
    else if (isSignup && form.password !== form.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';
    if (!form.captcha) validationErrors.captcha = 'Please verify that you are not a robot';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = isSignup
        ? await axios.post('http://localhost:5000/api/signup', form)
        : await axios.post('http://localhost:5000/api/login', form);
      console.log(response.data); // temp del after development not req.

      navigate(isSignup ? '/account' : '/');
      if (!isSignup) {
        const userData = response.data.userData;
        console.log(userData);

        dispatch(login(userData));
      }
      if (isSignup) {
        handleSwitch('login');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleCaptchaChange = (value) => {
    setForm({ ...form, captcha: value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? 'Sign Up' : 'Log In'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          {isSignup && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={!isSignup}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          {isSignup && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
              autoComplete="age"
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          {isSignup && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          )}
          <Box mt={2} mb={2}>
            <ReCAPTCHA
              sitekey="6Ldph_MpAAAAAA91HIAm1ngL_571RJmZBrEOkjXI"
              onChange={handleCaptchaChange}
              onExpired={() => setForm({ ...form, captcha: '' })}
              onErrored={() => setForm({ ...form, captcha: '' })}
            />
            {errors.captcha && (
              <Typography variant="caption" color="error">
                {errors.captcha}
              </Typography>
            )}
          </Box>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            {isSignup ? 'Sign Up' : 'Log In'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button fullWidth onClick={() => handleSwitch(isSignup ? 'login' : 'signup')} sx={{ mt: 1 ,alignItems: 'center'}}>
                {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

const AuthContainer = () => {
  const [activeForm, setActiveForm] = useState('login');

  const handleSwitch = (form) => {
    setActiveForm(form);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {activeForm === 'login' ? <AuthForm isSignup={false} handleSwitch={handleSwitch} /> : <AuthForm isSignup={true} handleSwitch={handleSwitch} />}
      </Box>
    </ThemeProvider>
  );
};

export default AuthContainer;
