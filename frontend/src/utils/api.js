class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
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
        return data;
      })
  }

  editProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      // Метод PATCH обычно используют для обновления сущностей, уже существующих на сервере
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
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
        return data;
      })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
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
        return data;
      })
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        // console.log(data);
        return data;
      })
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
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
        return data;
      })
  }

  likeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
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
        // console.log(`Bearer ${localStorage.getItem("token")}`)
        return data;
      })
  }

  removelikeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
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
        // console.log(`Bearer ${localStorage.getItem("token")}`)
        return data;
      })
  }

  changeLikeCard(_id, isLiked) {
    console.log(_id);
    console.log(isLiked);
    return isLiked ? this.removelikeCard(_id) : this.likeCard(_id)
  }

  editAvatar(input) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: input.avatar,
      }),
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        // console.log(data);
        return data;
      })
      // .then((data) => {
      //   // console.log(data);
      //   // console.log(`Bearer ${localStorage.getItem("token")}`)
      //   return data;
      // })
  }
}

export const api = new Api({
  // baseUrl: 'https://api.mestoproject.nomoredomains.club',
  baseUrl: 'http://localhost:3000',
});
