const apiConfig = {
    baseURL: 'https://norma.nomoreparties.space/api/',
    headers: {
        'Content-type': 'application/json',
    },
}

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const fetchData = async () => {
    const res = await fetch(`${apiConfig.baseURL}ingredients`);
    return checkResponse(res);
}

export const apiPostOrder = async (orderData) => {
    return await fetch(`${apiConfig.baseURL}orders`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify(
            { 
                "ingredients": orderData
            } 
        )
    }).then(res => checkResponse(res));
}