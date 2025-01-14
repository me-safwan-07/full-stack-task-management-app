import React, { useEffect, useState } from 'react';
import { Grid, Typography, Container } from '@mui/material';
import { fetchMenu } from '../api/authApi';
// import MenuItem from '../components/MenuItem';
// import CartComponent from '../components/CartComponent';
// import { useCart } from '../context/CartContext';
// import { fetchMenuItems } from '../api/menuApi';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
//   const { cartItems } = useCart();

  useEffect(() => {
    const getMenuItems = async () => {
      try {
        const items = await fetchMenu();
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    getMenuItems();
  }, []);

  return (
    <Container maxWidth="lg" className="mt-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Menu
      </Typography>
      {/* <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {menuItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <MenuItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <CartComponent />
        </Grid>
      </Grid> */}
    </Container>
  );
};

export default MenuPage;

