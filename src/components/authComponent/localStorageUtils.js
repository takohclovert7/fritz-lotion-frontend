// localStorageUtils.js

/**
 * Stores data in localStorage with an expiration time.
 * @param {string} key - The key under which the data will be stored.
 * @param {any} data - The data to be stored.
 * @param {number} expireInDays - The number of days until the data expires.
 */
export const setDataWithExpiration = (key, data, expireInDays) => {
    const expirationTime = new Date().getTime() + expireInDays * 60 * 60 * 1000; // Calculate expiration time
    const dataWithExpiration = {
        data: data,
        expiration: expirationTime
    };
    localStorage.setItem(key, JSON.stringify(dataWithExpiration));
};

/**
 * Retrieves data from localStorage and checks for expiration.
 * @param {string} key - The key under which the data is stored.
 * @returns {any} - The stored data if it is still valid; otherwise, null.
 */
export const getDataWithExpiration = (key) => {
    const storedData = localStorage.getItem(key);
    if (!storedData) return null;

    const { data, expiration } = JSON.parse(storedData);
    const currentTime = new Date().getTime();

    if (currentTime > expiration) {
        localStorage.removeItem(key); // Remove expired data
        return null;
    }
    return data;
};

/**
 * Clears specific keys from localStorage or the entire localStorage if no key is provided.
 * @param {string} [key] - The key to be cleared from localStorage. If not provided, clears all localStorage.
 */
export const logout = (key) => {
    if (key) {
        localStorage.removeItem(key); // Remove specific key
    } else {
        localStorage.clear(); // Clear all localStorage
    }
};
