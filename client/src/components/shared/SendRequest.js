import axios from "axios";

export const sendReq = async (url, method, data = null) => {
  console.log(url, method, data);
  const token = localStorage.getItem("token");
  if (data) {
    data.token = token;
  }
  switch (method) {
    case "get":
      if (data) {
        console.log(axios.get(url, { params: { ...data } }));
        return axios.get(url, { params: { ...data } });
      }
      return axios.get(url);

    case "post":
      console.log("send request post ");
      return axios.post(url, { ...data });

    case "put":
      return axios.put(url, { ...data });

    case "delete":
      return axios.delete(url, { data: { token: token } });

    default:
      break;
  }
};
