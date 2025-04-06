import { http } from "./api";

export default {
    register: (userInfo) => {
      return http.post("register", userInfo);
    },
    login: (userInfo) => {
      return http.post("login", userInfo);
    },

  };