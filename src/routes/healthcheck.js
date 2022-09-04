const express = require('express');

const router = express.Router();

router.get('/healthcheck', async (req, res) => {
  res.send({
    success: 1,
    message: 'OK',
    time: new Date().toISOString(),
  });
});

module.exports = router;
