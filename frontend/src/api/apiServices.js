import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 3000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  responseType: "json",
  withCredentials: true,
  maxRedirects: 2,
});

const requestInterceptor = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

instance.interceptors.request.use(requestInterceptor);

const getRequest = async (endpoint, params = {}) => {
  const response = await instance.get(endpoint, { params });
  return response.data;
};

const postRequest = async (endpoint, data) => {
  const response = await instance.post(endpoint, data);
  return response.data;
};

const putRequest = async (endpoint, data) => {
  const response = await instance.put(endpoint, data);
  return response.data;
};

const patchRequest = async (endpoint, data) => {
  const response = await instance.patch(endpoint, data);
  return response.data;
};

const deleteRequest = async (endpoint, data) => {
  const response = await instance.delete(endpoint, { data });
  return response.data;
};

export { postRequest, postRequestWithoutToken, getRequest, putRequest, patchRequest, deleteRequest };
