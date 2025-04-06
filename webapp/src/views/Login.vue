<template>
  <div class="container">
    <h2>Login</h2>

    <input v-model="email" type="email" placeholder="E-mail" required />
    <input v-model="password" type="password" placeholder="Senha" required />

    <button @click="login">Entrar</button>
    <span>
      Não tem uma conta ainda?
      <a @click="goToRegister" class="register-link">Cadastre-se</a>
    </span>
    

    <p v-if="error" class="error">{{ error }}</p>
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  max-width: 500px;
  margin: auto;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input {
  width: 95%;
  margin: 5px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button.secondary {
  background-color: #6c757d;
}

button:hover {
  background-color: #0056b3;
}

button.secondary:hover {
  background-color: #5a6268;
}

.register-link {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 5px;
}

.register-link:hover {
  color: #0056b3;
}


.error {
  color: red;
}
</style>
