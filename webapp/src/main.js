import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;
  
    if (to.meta.requiresAuth && !isAuthenticated) {
      next("/login"); // redireciona pra login se não tiver logado
    } else {
      next();
    }
  });
  
