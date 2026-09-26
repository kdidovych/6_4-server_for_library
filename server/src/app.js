const express = require('express');
const cors = require('cors');
const apiV1Router = require('./routers/api/v1');
const errorHandler = require('./handlerError/request');

const app = express();
app.use(express.json());
app.use(cors());
/** app.use(generalRouterLike404); */
app.use('/api/v1', apiV1Router);
app.use(errorHandler);

module.exports = app;