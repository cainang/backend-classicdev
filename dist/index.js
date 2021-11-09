"use strict";
var express = require('express');
var cors = require('cors');
var routes = require('./routes');
var app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333, function () {
    console.log('Server started on port 3333');
});
//# sourceMappingURL=index.js.map