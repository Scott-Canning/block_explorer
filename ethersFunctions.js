const ethers = require('ethers');
const url = process.env.RINKEBY_URL;
const provider = new ethers.providers.JsonRpcProvider(url);
require('dotenv').config();

async function getBlockNumber() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log("ethersFunctions: ", blockNumber);
        return blockNumber;
    }
    catch(error) {
        logError(error);
    };
};

async function getBlockDetails() { 
    try {
            const blockNumber = await provider.getBlockNumber();
            const blockDetails = await provider.getBlockWithTransactions(blockNumber);
            const timestamp = blockDetails.timestamp;
            const blockHash = blockDetails.hash;
            const transactions = blockDetails.transactions;

            return { blockNumber: blockNumber, 
                     timestamp: timestamp,
                     blockHash: blockHash,
                     transactions: transactions 
                    } ;
    }
    catch(error) {
        logError(error);
    };
}

module.exports = {
    getBlockNumber,
    getBlockDetails
}