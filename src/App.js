import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ImageUploadForm from './components/ImageUploadForm';
import ImageGallery from './components/ImageGallery';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-4 items-center">
                <Link to="/" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md">
                  Upload Image
                </Link>
                <Link to="/gallery" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md">
                  Gallery
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ImageUploadForm />} />
            <Route path="/gallery" element={<ImageGallery />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
