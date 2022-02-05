const express = require('express');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || "8000";
const { getBlockNumber, getBlockDetails } = require('./ethersFunctions');


// app vars
const app = express();


// app config
app.set("views", path.join(__dirname, "views")); // define which directory Express should use as source of view template files
app.set("view engine", "pug"); // define the template engine for Express to use -> pug
app.use(express.static(path.join(__dirname, "public")));


// routes
app.get("/", (req, res) => {
    getBlockDetails().then((result) => {

        const { blockNumber, 
                timestamp,
                blockHash,
                transactions } = result;

        res.render("index", { title: "Block Explorer", 
                              network: "Rinkeby", 
                              blockNumber: blockNumber,
                              timestamp: timestamp,
                              blockHash: blockHash,
                              blockTxs: transactions }); // arg0: render path off of app config; arg1: passes variable w/ definition
    }).catch(() => {
        res.render("index", { title: "Block Explorer", 
                              network: "Rinkeby",
                              blockNumber: "Network Error",
                              blockTxs: "Network Error"}); // arg0: render path off of app config; arg1: passes variable w/ definition
    });
});


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});