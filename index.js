
const express = require( 'express');

const rp = require('request-promise');

const requestLatest = {
  method: 'GET',
  uri: 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    start: 1,
    limit: 500,
    convert: 'MXN'
  },
  headers: {
    'X-CMC_PRO_API_KEY': 'daf54cbe-a8d8-4076-837f-dc072fc5b453'
  },
  json: true,
  gzip: true
};


const requestInfo = {
  method: 'GET',
  uri: 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/info',
  qs: {
    id:1
  },
  headers: {
    'X-CMC_PRO_API_KEY': 'daf54cbe-a8d8-4076-837f-dc072fc5b453'
  },
  json: true,
  gzip: true
};
//Map Básci Info
const requestMap = {
  method: 'GET',
  uri: 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/map',
  qs: {
    start: 1,
    limit: 500
  },
  headers: {
    'X-CMC_PRO_API_KEY': 'daf54cbe-a8d8-4076-837f-dc072fc5b453'
  },
  json: true,
  gzip: true
};

// Set up the express app
const app = express();

// Latest all crypto
app.get('/api/latest', (req, res) => {
  rp(requestLatest).then(response => {
    res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
      crypto: response
    })
    console.log('API call response success');
  }).catch((err) => {
    res.status(200).send({
      success: 'true',
      message: err.message
      })
    console.log('API call error');
  });
  
});

//Info from specific id 
app.get('/api/info/:id', (req, res) => {
  const id =req.params.id;
  requestInfo.qs.id = id;
  rp(requestInfo).then(response => {
    res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
      crypto: response
    })
    console.log('API call response success');
  }).catch((err) => {
    res.status(200).send({
      success: 'true',
      message: err.message
      })
    console.log('API call error');
  });
  
});

//Basic Informaction
app.get('/api/basic', (req, res) => {
  rp(requestMap).then(response => {
    res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
      crypto: response
    })
    console.log('API call response success');
  }).catch((err) => {
    res.status(200).send({
      success: 'true',
      message: err.message
      })
    console.log('API call error');
  });
  
});
const PORT = process.env.port||'8080';


app.listen(PORT , function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});