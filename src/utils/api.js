import { getCookie, refreshTokenAction } from '../services/actions/auth';

export const apiConfig = {
    baseURL: 'https://norma.nomoreparties.space/api/',
    headers: {
        'Content-type': 'application/json',
    },
};

export const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const apiFetchData = () => {
    return fetch(`${apiConfig.baseURL}ingredients`).then(checkResponse);
};

export const apiPasswordReset = (email) => {
    return fetch(`${apiConfig.baseURL}password-reset`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            email: email,
        }),
    }).then(checkResponse);
};

export const apiPasswordSave = (password, token) => {
    return fetch(`${apiConfig.baseURL}password-reset/reset`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            password: password,
            token: token,
        }),
    }).then(checkResponse);
};

export const apiLoginUser = (email, password) => {
    return fetch(`${apiConfig.baseURL}auth/login`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    }).then(checkResponse);
};

export const apiLogoutUser = (token) => {
    return fetch(`${apiConfig.baseURL}auth/logout`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            token: token,
        }),
    }).then(checkResponse);
};

export const apiRegisterUser = (name, email, password) => {
    return fetch(`${apiConfig.baseURL}auth/register`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
        }),
    }).then(checkResponse);
};

export const apiUserRequest = () => {
    return fetch(`${apiConfig.baseURL}auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('tokenn'),
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }).then(checkResponse);
};

export const apiRefreshToken = (refreshToken) => {
    return fetch(`${apiConfig.baseURL}auth/token`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            token: refreshToken,
        }),
    }).then(checkResponse);
};

export const apiUpdateUser = (email, name) => {
    return fetch(`${apiConfig.baseURL}auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('tokenn'),
        },
        body: JSON.stringify({ email, name }),
    }).then(checkResponse);
};

export const apiGetUserOrder = (id) => {
    return fetch(`${apiConfig.baseURL}orders/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('tokenn'),
        },
    }).then(checkResponse);
};

export const apiPostOrder = (orderData) => {
    return fetch(`${apiConfig.baseURL}orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('tokenn'),
        },
        body: JSON.stringify({
            ingredients: orderData,
        }),
    }).then(checkResponse);
};

export const apiGetOrders = () => {
    return fetch(`${apiConfig.baseURL}orders`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('tokenn'),
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }).then(checkResponse);
};
