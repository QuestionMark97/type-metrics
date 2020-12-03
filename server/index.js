const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const tokenRouter = require('./routes/tokenRouter');
const markovRouter = require('./routes/markovRouter');

if (process.env.NODE_ENV === 'development') dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(bodyParser.json());

// Serve static files in 'client/build' folder under '/build route'
app.use('/build', express.static(path.resolve(__dirname, '../client/build')));

// User route
app.use('/users', userRouter);

// Token route
app.use('/token', tokenRouter);

// Serve Markov chain obj for text generation
app.use('/markov-chain-object', markovRouter);

// Serve client entrypoint
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error',
    status: 500,
    msg: { err: 'An error occured.  See logs for details' }
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.msg);
});

// Listen on port
app.listen(PORT, () => console.log('Listening on port 3000'));
