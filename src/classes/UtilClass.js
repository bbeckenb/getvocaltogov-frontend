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
        let outputStr = '';
        const keys = Object.keys(obj);
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