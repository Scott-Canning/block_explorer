
function convertTimestamp(timestamp) {
    const milliseconds = timestamp * 1000
    const dateObject = new Date(milliseconds);
    const formatDate = dateObject.toLocaleString();
    console.log(formatDate);
    return formatDate;
}

module.exports = {
    convertTimestamp
}