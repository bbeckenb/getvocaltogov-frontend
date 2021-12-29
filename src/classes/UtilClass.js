class UtilClass {
    static parseJwt(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    static objKeysValsToString(obj) {
        const dirtyKeys = Object.keys(obj);
        console.log('XXXXXXXX', dirtyKeys);
        let keys = [];
        for (let key of dirtyKeys) {
            console.log('XXXXXXXX', key);
            if (!['', undefined, null].includes(obj[key])) {
                keys.push(key);
            }
        }
        let outputStr = '';
        for (let key of keys) {
            if (key !== keys[keys.length-1]) {
                outputStr += `${key} - '${obj[key]}' | `;
            } else {
                outputStr += `${key} - '${obj[key]}'`;
            }
            
        }
        return outputStr;
    }
}

export default UtilClass;