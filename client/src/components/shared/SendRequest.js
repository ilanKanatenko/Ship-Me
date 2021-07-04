import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

export const SendRequest = async (
  url,
  method,
  data = {},
  dispatchAction = () => {
    return;
  }
) => {
  const token = localStorage.getItem("token");
  // if (data) {
  data.token = token;
  console.log(url, method, data);
  // }
  let response;
  switch (method) {
    case "get":
      // if (data) {
      //   response = await axios.get(url, { params: { ...data } });
      //   console.log("a SendRequest  get", response);
      //   if (response.status === 401) {
      //     return;
      //   }
      //   return response;
      // }
      response = await axios.get(url, { params: { ...data } });
      dispatchAction();
      console.log("b SendRequest  get", response);
      if (response.status === 401) {
        return;
      }
      return response;

    case "post":
      console.log("send request post ");
      response = await axios.post(url, { ...data });
      if (response.status === 401) {
        return;
      }
      return response;

    case "put":
      response = await axios.put(url, { ...data });
      if (response.status === 401) {
        return;
      }
      return response;

    case "delete":
      response = await axios.delete(url, { data: { ...data } });
      if (response.status === 401) {
        return;
      }
      return response;

    default:
      break;
  }
};
