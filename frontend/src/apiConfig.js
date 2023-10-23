import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL
});

function setAuthToken(token) {
	axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export { axiosInstance, setAuthToken };