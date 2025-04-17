<template>
  <div class="page">
    <h1 class="app-title">Encurtador de URL</h1>
    <div class="container">
      <h2>Login</h2>

      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="E-mail" required />
        <input v-model="password" type="password" placeholder="Senha" required />

        <button type="submit">Entrar</button>
      </form>

      <span>
        Não tem uma conta ainda?
        <a @click="goToRegister" class="register-link">Cadastre-se</a>
      </span>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import user from "@/services/user";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      this.error = "";

      if (!this.email || !this.password) {
        this.error = "Preencha todos os campos!";
        return;
      }

      try {
        const response = await user.login({
          email: this.email,
          password: this.password,
        });

        const token = response.data.token;
        localStorage.setItem("token", token);

        this.$router.push("/");
      } catch (err) {
        this.error = "E-mail ou senha inválidos!";
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-title {
  font-size: 26px;
  color: #ffff;
  font-weight: bold;
  margin-bottom: 10px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-width: 300px;
  margin: 50px auto;
  padding: 30px;
  text-align: center;

  border-radius: 12px;
  background-color: #ffffffda;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #00b8ad;
  margin-bottom: 20px;
}

input {
  width: 95%;
  margin: 10px 0;
  padding: 0px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #00b8ad;
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  background-color: #00b8ad;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #008e87;
}

span {
  margin-top: 15px;
  font-size: 14px;
}

.register-link {
  color: #00b8ad;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 5px;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #008e87;
}

.error {
  color: red;
  margin-top: 10px;
}

</style>
