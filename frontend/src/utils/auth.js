class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => {
        this._getResponseData(res);
      })
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        return data;
      })
      .then((data) => {
        // console.log(data);
        return data;
      })
  }

  getInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        // authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      return this._getResponseData(res);
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .then((data) => {
      // console.log(data);
      // console.log(`Bearer ${localStorage.getItem("token")}`);
      return data;
    })
  }
}

export const auth = new Auth({
  baseUrl: 'https://api.mestoproject.nomoredomains.club',
});

