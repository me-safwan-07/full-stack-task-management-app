import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Link } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/menu');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <Typography variant="h4" className="mb-4 text-center">
          Login
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </Button>
        </form>
        
        <div className="mt-4 flex justify-between">
          <Link
            href="/forgot-password"
            variant="body2"
            className="cursor-pointer"
            onClick={(e) => navigate('/forgot-password')}
          >
            Forgot Password?
          </Link>
          <Link
            href="/register"
            variant="body2"
            className="cursor-pointer"
            onClick={(e) => navigate('/register')}
          >
            Don't have an account? Create one
          </Link>
        </div>
      </Paper>
    </div>
  );
};

export default LoginPage;
