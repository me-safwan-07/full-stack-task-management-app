import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, Container, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { fetchMenu } from '../api/authApi';

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const items = await fetchMenu();
        setMenuItems(items);
      } catch (error) {
        console.error('Failed to load menu:', error);
      }
    };
    loadMenu();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Container maxWidth="xl" className="pt-8">
        <Grid container spacing={4} alignItems="center" className="min-h-[80vh]">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h2" 
                className="font-bold mb-4 text-gray-800"
                sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
              >
                it's not just <span className="text-red-500">Food,</span><br />
                It's Experience.
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-6 text-lg">
                Discover the best food from over 1,000 restaurants
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-full"
              >
                Order Now
              </Button>
              <div className="flex gap-4 mt-8">
                <div className="flex -space-x-4">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <img 
                        src={`/placeholder.svg?height=40&width=40`} 
                        alt={`User ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <Typography variant="subtitle1" className="font-semibold text-gray-800">
                    Our Happy Customers
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    4.8 (2.5k Reviews)
                  </Typography>
                </div>
              </div>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -z-10 w-[500px] h-[500px] bg-red-100 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f8bbd8e466de3af9ea252bbed81c8e8f-8C87b2Zj5c1bkjjPTauFfZXSpqodv5.webp"
                alt="Featured Dish"
                className="w-full max-w-[500px] mx-auto rounded-full shadow-2xl"
              />
              <div className="absolute top-0 left-0 w-full h-full">
                <img
                  src="/placeholder.svg?height=50&width=50"
                  alt="Leaf Decoration"
                  className="absolute top-10 left-10 w-12 h-12 transform -rotate-45"
                />
                <img
                  src="/placeholder.svg?height=50&width=50"
                  alt="Leaf Decoration"
                  className="absolute bottom-10 right-10 w-12 h-12 transform rotate-45"
                />
              </div>
            </motion.div>
          </Grid>
        </Grid>

        {/* Menu Section */}
        <Box className="py-16">
          <Typography variant="h4" className="mb-8 text-center font-bold text-gray-800">
            Popular Dishes
          </Typography>
          <Grid container spacing={4}>
            {menuItems.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item._id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={`/placeholder.svg?height=200&width=300`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <CardContent className="bg-white">
                      <Typography variant="h6" className="font-semibold mb-2">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="mb-4">
                        {item.category}
                      </Typography>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★★★★★</span>
                          <Typography variant="body2" className="ml-2">
                            5.0
                          </Typography>
                        </div>
                        <Button
                          variant="contained"
                          className="bg-red-500 hover:bg-red-600 rounded-full min-w-[40px] w-10 h-10 p-0"
                        >
                          +
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;

