import axios from "axios";

const instance = axios.create({
  baseURL: "https://jobs-api.squareboat.info/api/v1",
});

const AUTH_TOKEN = JSON.parse(localStorage.getItem("authenticatedUser"))?.token;

if (AUTH_TOKEN) instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export default instance;
