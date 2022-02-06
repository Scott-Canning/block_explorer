const ethers = require('ethers');

function convertTimestamp(timestamp) {
    const milliseconds = timestamp * 1000
    const dateObject = new Date(milliseconds);
    const formatDate = dateObject.toLocaleString();
    return formatDate;
}

function ethBalance(balance) {
    const ethBalance = ethers.utils.formatEther(balance);
    return ethBalance;
}

module.exports = {
    convertTimestamp,
    ethBalance
}