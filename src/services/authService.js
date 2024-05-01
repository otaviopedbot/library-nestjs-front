import axios from "axios";
import { stringify } from "postcss";

const API_URL = import.meta.env.VITE_APIURL;

const Register = async (complete_name, username, email, password, address, phone) => {

  const query = `
  
  mutation Register($complete_name: String!, $username: String!, $email: String!, $password: String!, $address: String!, $phone: String!){
    registerUser(data: {
      complete_name: $complete_name
      username: $username
      email: $email
      password: $password
      address: $address
      phone: $phone
    }){
      token
      user{
        id
        complete_name
        phone
        address
        username
        email
        password
        is_admin
        image
        details
      favorites{
          id
          book{
            title
          }
          
        }
      }
  }

  `;

  const variables = {
    complete_name,
    username,
    email,
    password,
    address,
    phone
  }

  const response = axios.post(API_URL, { query, variables })

    // .then((response) => {

    //   if (response.data.data.registerUser.token) {
    //     localStorage.setItem("user", JSON.stringify(response.data.data.registerUser));
    //   }

    //   return response.data;
    // });
};

const Login = async (email, password) => {


  const query = `
  
  mutation Login($email: String!, $password: String!){
    login(data: {
      email: $email
      password: $password
    }){
      token
      user{
        id
        complete_name
        phone
        address
        username
        email
        password
        is_admin
        image
        details
      favorites{
          id
          book{
            title
          }
          
        }
      }
    }
  }


  `;

  const variables = {
    email,
    password,
  };

  const response = await axios.post(API_URL, { query, variables })

    .then((response) => {

      if (response.data.data.login.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data.login));
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