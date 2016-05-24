module.exports = function(number, precision = 2) {
    var num = Math.round(Number.parseFloat(number) * Math.pow(10, precision)) / Math.pow(10, precision);
    if(isNaN(num)) {
        return '-';
    } else {
        return num.toFixed(precision);
    }
};