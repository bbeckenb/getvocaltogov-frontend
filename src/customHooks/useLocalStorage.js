import { useState } from 'react';

function useLocalStorage(key) {
    const [storedVal, setStoredVal] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (err) {
            console.error(err);
            return null;
        }
    });
    const setVal = (val) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(val));
            setStoredVal(val);
        } catch (err) {
            console.error(err);
        };
    };
    return [storedVal, setVal];
};

export default useLocalStorage;