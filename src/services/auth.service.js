import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(userName,contact, password,languageCode,currencyCode) {
    return axios.post(API_URL + "signup/entity", {
      userName,
      contact,
      password,
      languageCode,
      currencyCode
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
