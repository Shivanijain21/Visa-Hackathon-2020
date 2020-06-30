"use strict";
var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
// origin: frontendURI,
// app.use(cors({ credentials: true }));

// //Allow Access Control
// app.use(function (req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//     );
//     res.setHeader("Cache-Control", "no-cache");
//     next();
// });

app.get("/updateRecords", (req, res) => {
    console.log("in back-end");
    return res.status(200).send("done");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Jobify Server listening on port ${port}`);
});
