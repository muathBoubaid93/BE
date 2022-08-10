module.exports = class ValidatorHelper
{
    isNotEmpty(value)
    {
        return (value !== undefined && value !== null && value !== '' && value?.toString()?.trim().length > 0);
    }

    isNumeric(value)
    {
        return !isNaN(value?.toString()?.trim());
    }

    isInt(value)
    {
        return /^[0-9]*$/.test(value?.toString()?.trim());
    }

    isCode(value)
    {
        return /^[A-Za-z0-9_]*$/.test(value?.toString()?.trim());
    }

    isArray(value)
    {
        try
        {
            return Array.isArray(JSON.parse(value)) && JSON.parse(value) !== null && JSON.parse(value) !== undefined && JSON.parse(value).length > 0;
        }
        catch(e)
        {
            return false;
        }
    }

    isObject(value)
    {
        try
        {
            return typeof JSON.parse(value) === 'object' && JSON.parse(value) !== null && JSON.parse(value) !== undefined && Object.keys(JSON.parse(value)).length > 0;
        }
        catch(e)
        {
            return false;
        }
    }

    isEmail(value)
    {
        return (/^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(value));
    }

    isDate(value)
    {
        return /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test(value);
    }

    isTime(value)
    {
        return /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/.test(value);
    }

    isTimestamp(value)
    {
        var timestamp = value.split(" ");
        if (timestamp.length == 2)
        {
            return this.isDate(timestamp[0]) && this.isTime(timestamp[1]);
        }
        return false;;
    }

    isFutureDate(value)
    {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        return value >= today;
    }

    isStrongPassword(value)
    {
        return /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,20}$/.test(value);
    }

    isLongPassword(value)
    {
        return value.length >= 8;
    }

    isBoolean(value)
    {
        return value === 'true' || value === 'false' || value === '1' || value === '0' || value === true || value === false || value === 1 || value === 0 ? true : false;
    }

    isFile(list, key)
    {
        var isValid = false;

        if (list[key])
        {
            isValid = true;
        }
        
        return isValid;
    }
}