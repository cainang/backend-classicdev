"use strict";
require('dotenv').config();
var express = require('express');
var cors = require('cors');
var routes = require('./routes');
var app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
//# sourceMappingURL=index.js.map