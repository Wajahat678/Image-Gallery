process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

try {
    console.log('Current directory:', process.cwd());
    console.log('Attempting to require dependencies...');
    
    const express = require('express');
    console.log('Express loaded');
    
    const multer = require('multer');
    console.log('Multer loaded');
    
    const cors = require('cors');
    console.log('CORS loaded');
    
    const Database = require('better-sqlite3');
    console.log('Better-SQLite3 loaded');
    
    console.log('All dependencies loaded successfully');
    
    console.log('Starting server...');
    require('./index.js');
} catch (error) {
    console.error('Error during startup:', error);
    process.exit(1);
}