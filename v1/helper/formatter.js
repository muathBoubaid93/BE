module.exports = class Formatter 
{
    stringToNumberWithCommas(number)
    {
        if (number !== undefined && number !== null)
        {
            return parseFloat(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else
        {
            return "";
        }
    };
    
    stringToNumberWithCommasAndDicimals(number)
    {
        if(number !== undefined && number !== null)
        {
            return parseFloat(number).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else
        {
            return "";
        }
    };
    
    timestampToDateTimeString(timestamp, lang)
    {
        const constants = require('../lang/' + lang + '/common/constants.json');

        var timestampFormatted = constants["common_unknown"];
    
        if (timestamp !== undefined && timestamp !== null) {
            const timestampArray = timestamp.split(" ");
    
            if (timestampArray.length === 2) {
                const dateArray = timestampArray[0].split("-");
                const timeArray = timestampArray[1].split(":");
    
                if (dateArray.length === 3 && timeArray.length === 3) {
                    var monthName = "";
    
                    if (dateArray[1] === 1 || dateArray[1] === "1" || dateArray[1] === "01") {
                        monthName = constants["common_month_jan"];
                    } else if (dateArray[1] === 2 || dateArray[1] === "2" || dateArray[1] === "02") {
                        monthName = constants["common_month_feb"];
                    } else if (dateArray[1] === 3 || dateArray[1] === "3" || dateArray[1] === "03") {
                        monthName = constants["common_month_mar"];
                    } else if (dateArray[1] === 4 || dateArray[1] === "4" || dateArray[1] === "04") {
                        monthName = constants["common_month_apr"];
                    } else if (dateArray[1] === 5 || dateArray[1] === "5" || dateArray[1] === "05") {
                        monthName = constants["common_month_may"];
                    } else if (dateArray[1] === 6 || dateArray[1] === "6" || dateArray[1] === "06") {
                        monthName = constants["common_month_jun"];
                    } else if (dateArray[1] === 7 || dateArray[1] === "7" || dateArray[1] === "07") {
                        monthName = constants["common_month_jul"];
                    } else if (dateArray[1] === 8 || dateArray[1] === "8" || dateArray[1] === "08") {
                        monthName = constants["common_month_aug"];
                    } else if (dateArray[1] === 9 || dateArray[1] === "9" || dateArray[1] === "09") {
                        monthName = constants["common_month_sep"];
                    } else if (dateArray[1] === 10 || dateArray[1] === "10" || dateArray[1] === "10") {
                        monthName = constants["common_month_oct"];
                    } else if (dateArray[1] === 11 || dateArray[1] === "11" || dateArray[1] === "11") {
                        monthName = constants["common_month_nov"];
                    } else if (dateArray[1] === 12 || dateArray[1] === "12" || dateArray[1] === "12") {
                        monthName = constants["common_month_dec"];
                    }
    
                    timestampFormatted = dateArray[2] + " " + monthName + " " + dateArray[0];
                    timestampFormatted += " " + constants["common_timestampAt"] + " ";
                    timestampFormatted += timeArray[0] + ":" + timeArray[1];
                }
            }
        }
        return timestampFormatted;
    };
    
    timestampToDateString(timestamp, lang)
    {
        const constants = require('../lang/' + lang + '/common/constants.json');

        var timestampFormatted = constants["common_unknown"];
    
        if (timestamp !== undefined && timestamp !== null) {
            const timestampArray = timestamp.split(" ");
    
            if (timestampArray.length === 2) {
                const dateArray = timestampArray[0].split("-");
    
                if (dateArray.length === 3) {
                    var monthName = "";
    
                    if (dateArray[1] === 1 || dateArray[1] === "1" || dateArray[1] === "01") {
                        monthName = constants["common_month_jan"];
                    } else if (dateArray[1] === 2 || dateArray[1] === "2" || dateArray[1] === "02") {
                        monthName = constants["common_month_feb"];
                    } else if (dateArray[1] === 3 || dateArray[1] === "3" || dateArray[1] === "03") {
                        monthName = constants["common_month_mar"];
                    } else if (dateArray[1] === 4 || dateArray[1] === "4" || dateArray[1] === "04") {
                        monthName = constants["common_month_apr"];
                    } else if (dateArray[1] === 5 || dateArray[1] === "5" || dateArray[1] === "05") {
                        monthName = constants["common_month_may"];
                    } else if (dateArray[1] === 6 || dateArray[1] === "6" || dateArray[1] === "06") {
                        monthName = constants["common_month_jun"];
                    } else if (dateArray[1] === 7 || dateArray[1] === "7" || dateArray[1] === "07") {
                        monthName = constants["common_month_jul"];
                    } else if (dateArray[1] === 8 || dateArray[1] === "8" || dateArray[1] === "08") {
                        monthName = constants["common_month_aug"];
                    } else if (dateArray[1] === 9 || dateArray[1] === "9" || dateArray[1] === "09") {
                        monthName = constants["common_month_sep"];
                    } else if (dateArray[1] === 10 || dateArray[1] === "10" || dateArray[1] === "10") {
                        monthName = constants["common_month_oct"];
                    } else if (dateArray[1] === 11 || dateArray[1] === "11" || dateArray[1] === "11") {
                        monthName = constants["common_month_nov"];
                    } else if (dateArray[1] === 12 || dateArray[1] === "12" || dateArray[1] === "12") {
                        monthName = constants["common_month_dec"];
                    }
    
                    timestampFormatted = dateArray[2] + " " + monthName + " " + dateArray[0];
                }
            }
        }
        return timestampFormatted;
    };
    
    dateToDateString(timestamp, lang)
    {
        const constants = require('../lang/' + lang + '/common/constants.json');

        var timestampFormatted = constants["common_unknown"];
    
        if (timestamp !== undefined && timestamp !== null) {
            const dateArray = timestamp.split("-");
    
            if (dateArray.length === 3) {
                var monthName = "";
    
                if (dateArray[1] === 1 || dateArray[1] === "1" || dateArray[1] === "01") {
                    monthName = constants["common_month_jan"];
                } else if (dateArray[1] === 2 || dateArray[1] === "2" || dateArray[1] === "02") {
                    monthName = constants["common_month_feb"];
                } else if (dateArray[1] === 3 || dateArray[1] === "3" || dateArray[1] === "03") {
                    monthName = constants["common_month_mar"];
                } else if (dateArray[1] === 4 || dateArray[1] === "4" || dateArray[1] === "04") {
                    monthName = constants["common_month_apr"];
                } else if (dateArray[1] === 5 || dateArray[1] === "5" || dateArray[1] === "05") {
                    monthName = constants["common_month_may"];
                } else if (dateArray[1] === 6 || dateArray[1] === "6" || dateArray[1] === "06") {
                    monthName = constants["common_month_jun"];
                } else if (dateArray[1] === 7 || dateArray[1] === "7" || dateArray[1] === "07") {
                    monthName = constants["common_month_jul"];
                } else if (dateArray[1] === 8 || dateArray[1] === "8" || dateArray[1] === "08") {
                    monthName = constants["common_month_aug"];
                } else if (dateArray[1] === 9 || dateArray[1] === "9" || dateArray[1] === "09") {
                    monthName = constants["common_month_sep"];
                } else if (dateArray[1] === 10 || dateArray[1] === "10" || dateArray[1] === "10") {
                    monthName = constants["common_month_oct"];
                } else if (dateArray[1] === 11 || dateArray[1] === "11" || dateArray[1] === "11") {
                    monthName = constants["common_month_nov"];
                } else if (dateArray[1] === 12 || dateArray[1] === "12" || dateArray[1] === "12") {
                    monthName = constants["common_month_dec"];
                }
    
                timestampFormatted = dateArray[2] + " " + monthName + " " + dateArray[0];
            }
    
        }
        return timestampFormatted;
    };

    dateObjectToTimestamp(obj, shouldReturnUndefinedOnFail = false)
    {
        if(!obj instanceof Date)
        {
            return shouldReturnUndefinedOnFail ? undefined : "0000-00-00 00:00:00";
        }

        var date = obj.getFullYear() + '-' + 
                   (obj.getMonth()+1<10?'0':'') + (obj.getMonth()+1) + '-' + 
                   (obj.getDate()<10?'0':'') + obj.getDate();

        var time = (obj.getHours()<10?'0':'') + obj.getHours() + ":" + 
                   (obj.getMinutes()<10?'0':'') + obj.getMinutes() + ":" + 
                   (obj.getSeconds()<10?'0':'') + obj.getSeconds();

        return date + " " + time;
    }

    timestampToDateObject(timestamp)
    {
        var toReturn = undefined;

        var arr = timestamp.split(" ");

        if(arr.length == 2)
        {
            var date = arr[0].split("-");
            var time = arr[1].split(":");

            if(date.length == 3 && time.length == 3)
            {
                toReturn = new Date(Date.UTC(date[0], parseInt(date[1])-1, date[2], time[0], time[1], time[2]));
            }
        }
        
        return toReturn;
    }
    
    monthNumberToMonthName(monthNumber, lang)
    {
        const constants = require('../lang/' + lang + '/common/constants.json');
        
        var monthName = constants["common_unknown"];
    
        if (monthNumber === 1 || monthNumber === "1" || monthNumber === "01") {
            monthName = constants["common_month_jan"];
        } else if (monthNumber === 2 || monthNumber === "2" || monthNumber === "02") {
            monthName = constants["common_month_feb"];
        } else if (monthNumber === 3 || monthNumber === "3" || monthNumber === "03") {
            monthName = constants["common_month_mar"];
        } else if (monthNumber === 4 || monthNumber === "4" || monthNumber === "04") {
            monthName = constants["common_month_apr"];
        } else if (monthNumber === 5 || monthNumber === "5" || monthNumber === "05") {
            monthName = constants["common_month_may"];
        } else if (monthNumber === 6 || monthNumber === "6" || monthNumber === "06") {
            monthName = constants["common_month_jun"];
        } else if (monthNumber === 7 || monthNumber === "7" || monthNumber === "07") {
            monthName = constants["common_month_jul"];
        } else if (monthNumber === 8 || monthNumber === "8" || monthNumber === "08") {
            monthName = constants["common_month_aug"];
        } else if (monthNumber === 9 || monthNumber === "9" || monthNumber === "09") {
            monthName = constants["common_month_sep"];
        } else if (monthNumber === 10 || monthNumber === "10" || monthNumber === "10") {
            monthName = constants["common_month_oct"];
        } else if (monthNumber === 11 || monthNumber === "11" || monthNumber === "11") {
            monthName = constants["common_month_nov"];
        } else if (monthNumber === 12 || monthNumber === "12" || monthNumber === "12") {
            monthName = constants["common_month_dec"];
        }
    
        return monthName;
    };
}