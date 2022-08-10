const session = require('store2');

module.exports = class SessionHelper {
    set(key, value) 
    {
        session.setItem(key, value);
    }

    get(key) 
    {
        return session.getItem(key);
    }
}