require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    // Create uploads directory if it doesn't exist
    fs.mkdir(uploadDir, { recursive: true })
      .then(() => cb(null, uploadDir))
      .catch(err => cb(err));
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Local storage for images metadata
const IMAGES_FILE = path.join(__dirname, 'images.json');

async function readImages() {
  try {
    const data = await fs.readFile(IMAGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

async function writeImages(images) {
  await fs.writeFile(IMAGES_FILE, JSON.stringify(images, null, 2));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString()
  });
});

// Upload endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    console.log('Received upload request', {
      body: req.body,
      file: req.file ? {
        fieldname: req.file.fieldname,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size
      } : 'No file'
    });

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { name, description } = req.body;
    console.log('Processing upload for:', { name, description });
    
    // Create image URL using the server's domain
    const imageUrl = `/uploads/${req.file.filename}`;
    console.log('Image saved locally:', imageUrl);

    const images = await readImages();
    const newImage = {
      id: Date.now(),
      name,
      description,
      url: imageUrl,
      filename: req.file.filename,
      created_at: new Date().toISOString()
    };
    
    images.push(newImage);
    await writeImages(images);

    console.log('Image record saved to local storage');
    res.json(newImage);
  } catch (error) {
    console.error('Upload error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: 'Failed to upload image: ' + error.message });
  }
});

// Get all images endpoint
app.get('/api/images', async (req, res) => {
  try {
    console.log('Fetching images from local storage');
    const images = await readImages();
    console.log(`Found ${images.length} images`);
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});