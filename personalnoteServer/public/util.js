var DateFormat = function(time) {
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    function fmtTime(n) {
        if (n<10) {
            return '0' + n;
        } else {
            return n;
        }
    }
    return year + '-' + fmtTime(month) + '-' + fmtTime(day) + ' ' + fmtTime(hour) + ':' + fmtTime(minute) + ':' + fmtTime(seconds); 
}

exports.DateFormat = DateFormat;