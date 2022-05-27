const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.auth);
  res.send(req.auth);
});

module.exports = router;
