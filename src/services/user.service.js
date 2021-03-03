import axios from "axios";
import AuthService from "./auth.service";
import API_URL from "./api.url";

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
};

async function getEndPoint(endPoint) {
  try {
    const response = await axios.get(API_URL + endPoint, {
      headers: authHeader(),
    });
    return response;
  } catch (e) {
    try {
      await AuthService.refresh(
        JSON.parse(localStorage.getItem("user")).refreshToken
      );
    } catch (e) {
      return e;
    }
    return await axios.get(API_URL + endPoint, {
      headers: authHeader(),
    });
  }
}

async function postEndPoint(endPoint, data) {
  try {
    const response = await axios.post(API_URL + endPoint, data, {
      headers: authHeader(),
    });
    return response;
  } catch (e) {
    try {
      await AuthService.refresh(
        JSON.parse(localStorage.getItem("user")).refreshToken
      );
    } catch (e) {
      return e;
    }
    return await axios.post(API_URL + endPoint, data, {
      headers: authHeader(),
    });
  }
}

async function putEndPoint(endPoint, data) {
  try {
    const response = await axios.put(API_URL + endPoint, data, {
      headers: authHeader(),
    });
    return response;
  } catch (e) {
    try {
      await AuthService.refresh(
        JSON.parse(localStorage.getItem("user")).refreshToken
      );
    } catch (e) {
      return e;
    }
    return await axios.put(API_URL + endPoint, data, {
      headers: authHeader(),
    });
  }
}
export { getEndPoint, postEndPoint, putEndPoint };
