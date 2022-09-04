const express = require('express');

const log = require('../services/logger');
const { getData, getAllData, getPages } = require('../db')

const router = express.Router();

router.get(
  '/api/pages',
  async (req, res, next) => {
    try {
      log.info('Retrieving pages');
      const data = await getPages();

      res.status(200).json({
        success: 1,
        message: data,
      });

    } catch (error) {
      log.error(error.message);
      res.status(403).json({ message: 'Error', Error: error.message });
    }
  },
);
router.get(
  '/api/articles',
  async (req, res, next) => {
    try {
      log.info('Retrieving all articles');
      const data = await getAllData();

      res.status(200).json({
        success: 1,
        message: data,
      });

    } catch (error) {
      log.error(error.message);
      res.status(403).json({ message: 'Error', Error: error.message });
    }
  },
);

router.get(
  '/api/article/:id',
  async (req, res, next) => {
    const id = req.params.id
    try {
      log.info(`Retrieving article [${id}]`);

      const data = await getData(id);

      res.status(200).json({
        success: 1,
        message: data,
      });

    } catch (error) {
      log.error(error.message);
      res.status(403).json({ message: 'Error', Error: error.message });
    }
  },
);

module.exports = router;
