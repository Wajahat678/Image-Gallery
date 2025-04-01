# Image Gallery App

A React-based image gallery application with local file storage.

## Features

- Image upload with preview
- Local file storage
- Image gallery view
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd [repo-name]
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

3. Create uploads directory:
```bash
mkdir -p server/uploads
```

## Running the Application

1. Start the backend server (from the root directory):
```bash
cd server
node index.js
```

2. In a new terminal, start the frontend development server (from the root directory):
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3002
- Backend: http://localhost:3001

## Project Structure

```
├── public/                 # Static files
├── server/                # Backend server
│   ├── uploads/          # Image storage directory
│   └── index.js          # Server entry point
└── src/                   # Frontend source code
    ├── components/       # React components
    └── App.js           # Main React component
```

## Environment Variables

Create a `.env` file in the server directory with the following content:
```
PORT=3001
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
