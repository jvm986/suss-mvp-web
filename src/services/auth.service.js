import axios from "axios";
import API_URL from "./api.url";

const parseUser = (response) => {
  try {
    var token = JSON.stringify(response.data.access);
    var tokenData = JSON.parse(atob(token.split(".")[1]));
    return {
      accessToken: response.data.access,
      refreshToken: response.data.refresh,
      id: tokenData.user_id,
      email: tokenData.email,
      username: tokenData.username,
      isStaff: tokenData.is_staff,
    };
  } catch (e) {
    return null;
  }
};

const setPassword = (formId, password) => {
  return axios
    .post(API_URL + "set_user_password/", {
      formId,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(parseUser(response)));
      }
      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "token/obtain/", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(parseUser(response)));
      }

      return response.data;
    });
};

const refresh = (refreshToken) => {
  return axios
    .post(API_URL + "token/refresh/", {
      refresh: refreshToken,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(parseUser(response)));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  setPassword,
  login,
  refresh,
  logout,
  getCurrentUser,
};
