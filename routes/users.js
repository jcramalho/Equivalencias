var express = require('express');
var router = express.Router();

/* GET users listing. */
// Login page
router.get('/login', function(req, res) {
  console.log('Na cb do GET login...')
  console.log(req.sessionID)
  res.render('login')
})
  
router.post('/', function(req, res) {
  console.log('Na cb do POST login...')
  console.log(req.body)
  res.send('Login recebido e tratado...')
})
  

module.exports = router;
