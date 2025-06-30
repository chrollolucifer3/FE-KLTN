const CLIENT_TOKEN_KEY = 'clientToken';
const ADMIN_TOKEN_KEY = 'adminToken';

export const setClientToken = (token) => {
    localStorage.setItem(CLIENT_TOKEN_KEY, token);
};

export const getClientToken = () => {
    return localStorage.getItem(CLIENT_TOKEN_KEY);
};

export const removeClientToken = () => {
    localStorage.removeItem(CLIENT_TOKEN_KEY);
};

export const hasClientToken = () => {
    return !!getClientToken();
};

// ------------------------------

export const setAdminToken = (token) => {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const getAdminToken = () => {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const removeAdminToken = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const hasAdminToken = () => {
    return !!getAdminToken();
};

// ------------------------------

export const removeItem = (key) => {
    localStorage.removeItem(key);
};
