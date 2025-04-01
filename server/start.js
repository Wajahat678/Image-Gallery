try {
  console.log('Starting server...');
  require('./index.js');
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}