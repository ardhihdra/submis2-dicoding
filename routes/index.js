var express = require('express');
var router = express.Router();
const { Connection, Request } = require('tedious');
const { postData, getData } = require('./helper');
const { initBlob } = require('./blob')
// create connection
const config = {
  authentication: {
      options: {
          userName: 'ardhihdra',
          password: 'password123!'
      },
      type: 'default'
  },
  server: 'submission1appserver.database.windows.net',
  options: {
      database: 'submission1db',
      encrypte: true,
      rowCollectionOnRequestCompletion: true
  }   
};   

// const containerClient = initBlob();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root: './views' }); // __dirname   
  // res.render('index', { title: 'Express' });
});

router.post('/book/new', function(req, res) {  
  console.log("BOSY", JSON.stringify(req.file)) 
  // let connection = new Connection(config);
  connection.on('connect', err => {
      if (err) {
        console.log(err);
      } else {
        console.log('post connected');
        postData(req, res, connection, containerClient);
      }
  })
});

router.get('/books', function(req, res) {
  let list = ``;
  let connection = new Connection(config);
  connection.on('connect', err => {
      if (err) {
        console.log(err);
      } else {
        console.log('connected');
        getData(req, res, connection, containerClient);
      }
  })
  
});


module.exports = router;
