console.log('Starting minimal test...');

try {
    console.log('Current directory:', process.cwd());
    console.log('Attempting to require express...');
    
    const express = require('express');
    console.log('Express loaded successfully');
    
    const app = express();
    console.log('Express app created');
    
    app.get('/', (req, res) => {
        res.send('Hello World');
    });
    
    const server = app.listen(5001, () => {
        console.log('Server is running on port 5001');
    });
    
    // Handle server errors
    server.on('error', (e) => {
        console.error('Server error:', e);
    });
    
} catch (error) {
    console.error('Error occurred:', error);
}