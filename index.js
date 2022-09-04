const config = require('config');
const express = require('express');
const morgan = require('morgan');
const { v1: uuid } = require('uuid');

const log = require('./src/services/logger');
const apiRoutes = require('./src/routes/api');
const healthcheckRoute = require('./src/routes/healthcheck');

const app = express();
const port = config.get('port');

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  req.reqid = uuid();
  next();
});

morgan.token('request_id', (req) => req.reqid);
app.use(morgan(':method :url :status :response-time :request_id', { stream: log.stream }));

app.use('/', [apiRoutes, healthcheckRoute]);

app.listen(port, () => {
  log.info(`Example app listening on port ${port}`);
});
