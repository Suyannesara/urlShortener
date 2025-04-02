import { http } from "./api";

export default {
    register: (userInfo) => {
      return http.post("register", userInfo);
    },
  };