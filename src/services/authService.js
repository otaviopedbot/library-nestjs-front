import axios from "axios";

const API_URL = import.meta.env.VITE_APIURL;

const Register = (complete_name, username, email, password, address, phone) => {
  return axios
    .post(`${API_URL}/auth/register`, {
      complete_name,
      username,
      phone,
      address,
      email,
      password
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response));
      }

      return response.data;
    });
};

const Login = (email, password) => {
  return axios
    .post(`${API_URL}/auth/login/`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const Logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  Register,
  Login,
  Logout,
  getCurrentUser,
};

export default authService;