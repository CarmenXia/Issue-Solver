import axios from "axios";
import removeToken from "./tokenHandling";
const BASE_URL = "/api/users";

//signup
function register(user, email, pw) {
  return axios
    .post(`${BASE_URL}/register`, {
      username: user,
      email: email,
      password: pw,
    })
    .catch((err) => {
      console.log(err);
      alert("This email is already taken");
    });
}

//login
function login(email, pw) {
  return axios
    .post(`${BASE_URL}/login`, {
      email: email,
      password: pw,
    })
    .then(({ data: token }) => {
      localStorage.setItem("token", token);
      //console.log(token);
    })
    .catch((err) => {
      console.log(err);
      alert("Invalid password or email");
    });
}
//getAll
async function getAll() {
  const response = await axios.get(`${BASE_URL}/all`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}
//showMe
async function showMe() {
  const response = await axios.get(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}
//getByName
async function getByName(username) {
  const response = await axios.get(`${BASE_URL}/${username}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

//get userById
async function getNameById(id) {
  const response = await axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

//logout
function logout() {
  return removeToken();
}
export { register, login, getAll, showMe, getNameById, logout, getByName };
