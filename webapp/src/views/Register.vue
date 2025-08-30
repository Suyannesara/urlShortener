<template>
  <div class="page">
    <h1 class="app-title">Encurtador de URL</h1>
    <div class="container">
      <h2>Cadastro</h2>

      <div class="tooltip">
        <input v-model="name" type="text" placeholder="Nome de usuário" />
        <span class="tooltiptext">
          Se você não quiser escolher um nome de usuário, nós vamos gerar um automaticamente pra você &#128522;.
        </span>
      </div>

      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="password" type="password" placeholder="Senha" required />

      <button @click="register">Cadastrar</button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>

      <p class="login-link">
        Já tem uma conta?
        <router-link to="/login">Faça login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import user from "@/services/user";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
      success: "",
    };
  },
  methods: {
    async register() {
      this.error = "";
      this.success = "";

      if (!this.email || !this.password) {
        this.error = "Preencha todos os campos!";
        return;
      }

      try {
        const resp = await user.register({
          username: this.name,
          email: this.email,
          password: this.password,
        });

        this.success = resp.data.message;

        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } catch (err) {
        if (err.response.status === 409) {
          this.error = "E-mail já cadastrado!";
        } else {
          this.error = "Erro ao cadastrar. Tente novamente!";
        }
      }
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
  margin-top: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 300px;
  max-width: 500px;
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
  width: 92%;
  margin: 10px 0;
  padding: 12px;
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

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}

.login-link {
  margin-top: 15px;
  font-size: 14px;
}

.login-link a {
  color: #00b8ad;
  font-weight: bold;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

/* Tooltip estilizada */
.tooltip {
  position: relative;
  display: inline-block;
  width: 100%;
}

.tooltiptext {
  visibility: hidden;
  width: 240px;
  background-color: #000000cc;
  color: #fff;
  text-align: center;
  padding: 8px;
  border-radius: 6px;
  font-size: 14px;

  position: absolute;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -6px;
  border-width: 6px;
  border-style: solid;
  border-color: #000000cc transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
