const express = require('express');
console.log('Express loaded successfully');

const app = express();
console.log('Express app created');

app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});
console.log('Route handler configured');

const PORT = 5001;
console.log('Attempting to start server on port', PORT);

try {
    app.listen(PORT, () => {
        console.log(`Test server running on port ${PORT}`);
    }).on('error', (error) => {
        console.error('Server failed to start:', error);
    });
} catch (error) {
    console.error('Error starting server:', error);
}