const express = require('express');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || "8000";
const { getBlockNumber, 
        getBlockDetails, 
        getTransaction, 
        getAddress } = require('./ethersFunctions');
const { convertTimestamp } = require('./utilities');


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

        const time = convertTimestamp(timestamp);

        res.render("index", { title: "Block Explorer", 
                              network: "Rinkeby", 
                              blockNumber: blockNumber,
                              time: time,
                              blockHash: blockHash,
                              blockTxs: transactions }); // arg0: render path off of app config; arg1: passes variable w/ definition
    }).catch(() => {
        res.render("index", { title: "Block Explorer", 
                              network: "Rinkeby",
                              blockNumber: "Network Error",
                              blockTxs: ""}); // arg0: render path off of app config; arg1: passes variable w/ definition
    });
});

app.get("/transaction", (req, res) => {
    const txHash = req.query.txHash;

    getTransaction(txHash).then((result) => {

        const { blockNumber, 
                confirmations,
                data,
                from,
                to,
                gasLimit,
                gasPrice,
                value
               } = result;

        res.render("transaction", { title: "Transaction",
                                    network: "Rinkeby",
                                    txHash: txHash,
                                    blockNumber: blockNumber,
                                    confirmations: confirmations,
                                    data: data,
                                    from: from,
                                    to: to,
                                    gasLimit: gasLimit,
                                    gasPrice: gasPrice,
                                    value: value
                                });

    }).catch(() => {
        res.render("transaction", { title: "Block Explorer", 
                                network: "Rinkeby",
                                blockNumber: "Network Error",
                            }); // arg0: render path off of app config; arg1: passes variable w/ definition
    });
});

app.get("/search", (req, res) => {
    const input = req.query.input;
    console.log(input);

    if(input.length > 42) {

        getTransaction(input).then((result) => {

            const { blockNumber, 
                    confirmations,
                    data,
                    from,
                    to,
                    gasLimit,
                    gasPrice,
                    value
                } = result;

            res.render("transaction", { title: "Transaction",
                                        network: "Rinkeby",
                                        txHash: input,
                                        blockNumber: blockNumber,
                                        confirmations: confirmations,
                                        data: data,
                                        from: from,
                                        to: to,
                                        gasLimit: gasLimit,
                                        gasPrice: gasPrice,
                                        value: value
                                    });

        }).catch(() => {
            res.render("transaction", { title: "Transaction", 
                                    network: "Rinkeby",
                                    blockNumber: "Network Error",
                                }); // arg0: render path off of app config; arg1: passes variable w/ definition
        });
    } else {

        getAddress(input).then((result) => {
            console.log(result);

            const { balance,
                    txCount
                   } = result;

            res.render("address", { title: "Address",
                                    network: "Rinkeby",
                                    address: input,
                                    balance: balance,
                                    txCount: txCount
                                    });
        }).catch(() => {
            res.render("address", { title: "Address", 
                                    network: "Rinkeby",
                                    balance: "Network Error"
                                }); // arg0: render path off of app config; arg1: passes variable w/ definition
        });
    };
});

app.get("/address", (req, res) => {
    const address = req.query.address;

    getAddress(address).then((result) => {

        const { balance,
                txCount
               } = result;

        res.render("address", { title: "Address",
                                network: "Rinkeby",
                                address: address,
                                balance: balance,
                                txCount: txCount
                                });
    }).catch(() => {
        res.render("address", { title: "Address", 
                                network: "Rinkeby",
                                address: "Network Error"
                            }); // arg0: render path off of app config; arg1: passes variable w/ definition
    });
});


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});