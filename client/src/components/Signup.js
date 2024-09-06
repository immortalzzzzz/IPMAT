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

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
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

    if (!form.name) validationErrors.name = 'Name is required';
    if (!form.email) validationErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) validationErrors.email = 'Email is not valid';
    if (!form.age) validationErrors.age = 'Age is required';
    if (!form.password) validationErrors.password = 'Password is required';
    else if (!validatePassword(form.password)) validationErrors.password = 'Password must have at least one uppercase letter, one lowercase letter, one number, and one special character';
    if (!form.confirmPassword) validationErrors.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';
    if (!form.captcha) validationErrors.captcha = 'Please verify that you are not a robot';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', form);
      console.log(response.data);
      navigate('account/login');
    } catch (error) {
      console.error('There was an error signing up!', error);
    }
  };

  const handleCaptchaChange = (value) => {
    setForm({ ...form, captcha: value });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
      theme={theme}
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
      <Box mt={2} mb={2}>
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
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
