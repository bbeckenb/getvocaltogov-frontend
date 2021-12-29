class UtilClass {
    static parseJwt(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    static omitEmptyVals(obj) {
        const dirtyKeys = Object.keys(obj);
        let outObj = {};
        for (let key of dirtyKeys) {
            if (!['', undefined, null].includes(obj[key])) {
                outObj[key] = obj[key];
            }
        }
        return outObj
    }

    static objKeysValsToString(obj) {
        const cleanObj = UtilClass.omitEmptyVals(obj);
        const keys = Object.keys(cleanObj);
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