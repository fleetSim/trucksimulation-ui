module.exports = function(number) {
    var num = Number.parseFloat(number);
    if(isNaN(num)) {
        return '-';
    } else {
        return (num / 1000).toFixed(0);
    }
};