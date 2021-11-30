require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3251, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
