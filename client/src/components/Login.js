import React, { useState } from 'react';
import axios from 'axios';
import {TextField} from '@mui/material';
import {Button} from '@mui/material';
import {Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#66cdaa',
    },
    secondary: {
      main: '#ffff',
    },
  },
});



const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    captcha: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!form.email) validationErrors.email = 'Email is required';
    if (!form.password) validationErrors.password = 'Password is required';
    if (!form.captcha) validationErrors.captcha = 'Please verify that you are not a robot';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', form);
      console.log(response.data);
      navigate('account/protected'); // Redirect to a protected route
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  const handleCaptchaChange = (value) => {
    setForm({ ...form, captcha: value });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        theme={theme}
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        theme={theme}
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
      <Box mt={2} mb={2} theme = {theme}>
        
        <ReCAPTCHA
          sitekey="6Ldph_MpAAAAAA91HIAm1ngL_571RJmZBrEOkjXI" // replace with your own reCAPTCHA site key
          onChange={handleCaptchaChange}
        />
        {errors.captcha && <p style={{ color: 'red' }}>{errors.captcha}</p>}
      </Box>
      <Button
      theme={theme}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Log In
      </Button>
    </Box>
  );
};

export default Login;
