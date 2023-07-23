import axios from "axios";

const AUTH_TOKEN = localStorage.getItem("token");

// Set config defaults when creating the instance
axios.defaults.baseURL = "http://localhost:8000/api/v1";

// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;

axios.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded";

export default axios;
