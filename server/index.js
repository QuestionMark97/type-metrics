const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files in 'client/build' folder under '/build route'
app.use('/build', express.static(path.resolve(__dirname, '../client/build')));

// Serve client entrypoint
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error',
    status: 500,
    msg: { err: 'An unknown error occured' }
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.msg);
});

// Listen on port
app.listen(PORT, () => console.log('Listening on port 3000'));
