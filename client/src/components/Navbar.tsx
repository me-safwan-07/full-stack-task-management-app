import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar position="sticky" className="bg-white shadow-none">
      <Container maxWidth="xl" className='bg-white'>
        <Toolbar className="justify-between p-4">
          <div className="text-2xl font-bold text-gray-800">
            Foo<span className="text-red-500">dy</span>
          </div>
          <div className="md:flex items-center gap-8">
            <Button className="text-gray-600 hover:text-red-500">Home</Button>
            <Button className="text-gray-600 hover:text-red-500">Menu</Button>
            <Button className="text-gray-600 hover:text-red-500">About Us</Button>
            <Button className="text-gray-600 hover:text-red-500">Contact</Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outlined"
              className="border-red-500 text-red-500 hover:bg-red-50"
              startIcon={<ShoppingCart />}
            >
              Cart
            </Button>
            <Button
              variant="contained"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Sign In
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;