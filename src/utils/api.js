import { getCookie } from "../services/actions/auth";

export const apiConfig = {
    baseURL: 'https://norma.nomoreparties.space/api/',
    headers: {
        'Content-type': 'application/json',
    },
}

export const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const apiFetchData = () => {
    return fetch(`${apiConfig.baseURL}ingredients`)
    .then(checkResponse);
}

export const apiPostOrder = (orderData) => {
    return fetch(`${apiConfig.baseURL}orders`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify(
            { 
                "ingredients": orderData
            } 
        )
    })
    .then(checkResponse)
    .catch(err => err.status);
}

export const apiPasswordReset = (email) => {
    return fetch(`${apiConfig.baseURL}password-reset`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({
            email: email,
        }),
    })
    .then(checkResponse)
    .catch(err => err.status);
};
  
export const apiPasswordSave = (password, token) => {
    return fetch(`${apiConfig.baseURL}password-reset/reset`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({
            password: password,
            token: token,
        }),
    })
    .then(checkResponse)
    .catch(err => err.status);
};
  
export const apiLoginUser = (email, password) => {
    return fetch(`${apiConfig.baseURL}auth/login`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
    .then(checkResponse)
    .catch(err => err.status);
};
  
export const apiLogoutUser = (token) => {
    return fetch(`${apiConfig.baseURL}auth/logout`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({
            token: token,
        }),
    })
    .then(checkResponse)
    .catch(err => err.status);
};

export const apiRegisterUser = (name, email, password) => {
    return fetch(`${apiConfig.baseURL}auth/register`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
        }),
    })
    .then(checkResponse)
    .catch(err => err.status);
};

export const apiUserRequest = () => {
    return fetch(`${apiConfig.baseURL}auth/user`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })
    .then(checkResponse);
};

export const apiRefreshToken = (refreshToken) => {
    return fetch(`${apiConfig.baseURL}auth/token`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({
            token: refreshToken,
        }),
    })
    .then(checkResponse)
    .catch(err => err.status);
};
  
export const apiUpdateUser = (email, name) => {
    return fetch(`${apiConfig.baseURL}auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + getCookie("token"),
        },
        body: JSON.stringify({ email, name }),
    })
    .then(checkResponse)
    .catch(err => err.status);
};