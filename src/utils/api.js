const apiConfig = {
    baseURL: 'https://norma.nomoreparties.space/api/',
    headers: {
        'Content-type': 'application/json',
    },
}

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const fetchData = () => {
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