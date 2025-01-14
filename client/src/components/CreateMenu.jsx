import { useState, useRef } from 'react'
import { 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Alert, 
  CircularProgress 
} from '@mui/material'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase'; // Ensure 'app' is being correctly imported
import { Upload, X, ImageIcon } from 'lucide-react'

const CreateMenu = ({ onSuccess }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Unauthorized')
    }
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    availability:true
    // description: ''
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCategoryChange = (e) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB')
        return
      }
      
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      setError('') // Clear the error if a valid image is selected
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
  
    try {
      if (!image) {
        throw new Error('Please select an image');
      }
  
      console.log('Uploading image...');
      const storage = getStorage(app);
      const storageRef = ref(storage, `menu-items/${Date.now()}-${image.name}`);
      const uploadResult = await uploadBytesResumable(storageRef, image);
      const imageUrl = await getDownloadURL(uploadResult.ref);
      console.log('Image uploaded, URL:', imageUrl);
  
      console.log('Sending API request...');
      const response = await fetch('http://localhost:5000/api/v1/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          image: imageUrl,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create menu item');
      }
  
      console.log('API request successful');
      setSuccess(true);
      setFormData({ name: '', price: '', category: '', availability: true });
      setImage(null);
      setImagePreview('');
      onSuccess?.();
    } catch (err) {
      console.error('Error occurred:', err.message);
      setError(err.message);
    } finally {
      console.log('Reached finally block');
      setLoading(false);
    }
  };
  

  const removeImage = () => {
    setImage(null)
    setImagePreview('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Typography variant="h5" component="h2" className="font-bold">
            Create New Menu Item
          </Typography>
          {loading && <CircularProgress size={24} />}
        </div>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" className="mb-4">
            Menu item created successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label="Item Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              fullWidth
            />

            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              required
              fullWidth
              inputProps={{ min: 0, step: 0.01 }}
            />
          </div>

          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="appetizers">Appetizers</MenuItem>
              <MenuItem value="main-course">Main Course</MenuItem>
              <MenuItem value="desserts">Desserts</MenuItem>
              <MenuItem value="beverages">Beverages</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
          />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outlined"
                component="label"
                startIcon={<Upload />}
                className="relative"
              >
                Upload Image
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {imagePreview && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={removeImage}
                  startIcon={<X />}
                >
                  Remove Image
                </Button>
              )}
            </div>

            {imagePreview ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-64 rounded-lg border-2 border-dashed border-gray-300">
                <ImageIcon className="w-12 h-12 text-gray-400" />
                <Typography className="mt-2 text-sm text-gray-500">
                  No image selected
                </Typography>
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            className="bg-primary hover:bg-primary/90"
          >
            {loading ? 'Creating...' : 'Create Menu Item'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateMenu
