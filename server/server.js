const express = require('express');
const bodyParser = require('body-parser');

// Set up Express server and JSON parsing of API requests
const app = express();
// Allow Cross Origin Requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Content-Type, X-Requested-With, Range'
  );
  if (req.method === 'OPTIONS') {
    return res.send(200);
  }
  return next();
});

// Serve up front end files
app.use(express.static('client/dist'));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
/* --------------------------------------------------------------------------------------------- */
