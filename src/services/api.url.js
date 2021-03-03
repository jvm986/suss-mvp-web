const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://api.suss.cc/"
    : "http://127.0.0.1:8000/";

export default API_URL;
