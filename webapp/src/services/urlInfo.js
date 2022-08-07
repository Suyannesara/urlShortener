import { http } from "./api";

export default {
  list: () => {
    return http.get("/");
  },
  save: (urlInfo) => {
    return http.post("urlInfo", urlInfo);
  },
  disable: () => {},
};
