import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Link } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, username, password);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <Typography variant="h4" className="mb-4 text-center">
          Register
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            Register
          </Button>
        </form>
        
        <div className="mt-4 flex justify-center">
          <Link
            href="/login"
            variant="body2"
            className="cursor-pointer"
            onClick={(e) => navigate('/login')}
          >
            Already have an account? Login
          </Link>
        </div>
      </Paper>
    </div>
  );
};

export default RegistrationPage;
