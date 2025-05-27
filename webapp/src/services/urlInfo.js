import { http } from "./api";

export default {
  list: () => {
    return http.get("/");
  },
  save: (urlInfo) => {
    return http.post("urlInfo", urlInfo);
  },
  delete: (keyword) => {
    return http.delete(`urlInfo/${keyword}`);
  },
  edit: (keyword, data) => {
    return http.put(`urlInfo/${keyword}`, data);
  }  
};
