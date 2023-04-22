import axios from "axios";

const $host = axios.create({
  baseURL: "http://localhost:5000/",
});

const $authHost = axios.create({
  baseURL: "http://localhost:5000/",
});

const authInterceprot = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceprot);

export { $host, $authHost };
