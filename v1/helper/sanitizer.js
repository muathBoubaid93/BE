module.exports = class SanitizerHelper
{
    isSafeInput(value, type) {
        if (type === "ALL") {
            return this.isValidForAll(value);
        } else if (type === "OBJECT") {
            return this.isValidForObject(value);
        } else if (type === "EMAIL") {
            return this.isValidForEmail(value);
        } else if (type === "CODE") {
            return this.isValidForCode(value);
        } else if (type === "TEXT") {
            return this.isValidForText(value);
        } else {
            return false;
        }
    }

    isValidForAll(value) {
        var allList = [
            '`', '!', '#', '$', '%', '&', '*', '+',
            '=', ",", '.', '/', ':', '[', ']', '{',
            '}', '\\', '|', ';', '~', "'", '"', '@',
            '^', '(', ')', '-', '_',
        ]

        var isValid = true;

        for (const c of value) {
            allList.forEach(function(illegalChar) {
                if (c === illegalChar) isValid = false;
            });
        };
        return isValid;
    }

    isValidForObject(value) {
        var objectList = [
            '`', '!', '#', '$', '%', '&', '*', '+',
            '=', '\\', '|', ';', '~', '@', '^', '(',
            ')', '\\', '/'
        ]
        var isValid = true;

        try {
            for (const c of JSON.parse(value)) {
                objectList.forEach(function(illegalChar) {
                    if (c === illegalChar) isValid = false;
                });
            };
            return isValid;
        } catch (e) {
            return isValid;
        }
    }

    isValidForEmail(value) {
        var emailList = [
            '`', '!', '#', '$', '%', '&', '*', '+',
            '=', '\\', '|', ';', '~', '"', "'", '^',
            '(', ')', ',', '\\', "/", ':', '[', ']',
            '{', '}'
        ]


        var isValid = true;

        for (const c of value) {
            emailList.forEach(function(illegalChar) {
                if (c === illegalChar) isValid = false;
            });
        };
        return isValid;
    }


    isValidForCode(value) {
        var codeList = [
            '`', '!', '#', '$', '%', '&', '*', '+',
            '=', '\\', '|', ';', '~', '"', "'", '@',
            '^', "/", '{', '}'
        ]

        var isValid = true;
        for (const c of value) {
            codeList.forEach(function(illegalChar) {
                if (c === illegalChar) {
                    isValid = false;
                }
            });
        };
        return isValid;
    }

    isValidForText(value) {
        var textList =  [
            '`', '/', '\\', "'", '"'
        ];

        var isValid = true;

        for (const c of value) {
            textList.forEach(function(illegalChar) {
                if (c === illegalChar) isValid = false;
            });
        };
        return isValid;
    }
}