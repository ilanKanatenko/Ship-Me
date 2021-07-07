import axios from "axios";
import { authActions } from "../../store/auth";
import store from "../../store";

export const SendRequest = async (url, method, data = {}) => {
  // axios.defaults.withCredentials = true;
  const token = localStorage.getItem("token");
  // if (data) {
  data.token = token;
  // }
  let response;
  switch (method) {
    case "get":
      // if (data) {
      //   response = await axios.get(url, { params: { ...data } });
      //   if (response.status === 401) {
      //     return;
      //   }
      //   return response;
      // }
      try {
        response = await axios.get(url, {
          headers: { "x-access-token": localStorage.getItem("token") },
          params: { ...data },
        });
        return response;
      } catch (error) {
        // if (response.status === 401) {
        store.dispatch(authActions.logout());
        return { data: {} };
        // }
      }

    case "post":
      try {
        response = await axios.post(url, {
          headers: { "x-access-token": localStorage.getItem("token") },
          params: { ...data },
        });
        return response;
      } catch (error) {
        return { data: {} };
      }

    case "put":
      try {
        response = await axios.put(url, {
          headers: { "x-access-token": localStorage.getItem("token") },
          params: { ...data },
        });
        return response;
      } catch (error) {
        return { data: {} };
      }

    case "delete":
      try {
        response = await axios.delete(url, {
          headers: { "x-access-token": localStorage.getItem("token") },
          params: { ...data },
        });
        return response;
      } catch (error) {
        // store.dispatch(authActions.logout());
        return { data: {} };
      }

    default:
      break;
  }
};
