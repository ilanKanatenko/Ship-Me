import axios from "axios";

export const sendReq = async (url, method, data = null) => {
  switch (method) {
    case "get":
      if (data) {
        return axios.get(url, { params: { ...data } });
      }
      return axios.get(url);

    case "post":
      return axios.post(url, { ...data });

    case "put":
      return axios.put(url, { ...data });

    case "delete":
      return axios.delete(url, { data: { id: data } });

    default:
      break;
  }
};