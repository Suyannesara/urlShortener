<template>
    <div class="container">
      <h2>Login</h2>
  
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="password" type="password" placeholder="Senha" required />
  
      <button @click="login">Entrar</button>
  
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
//   import auth from "@/services/auth"; // Supondo que você tenha um serviço de autenticação
  
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
          const response = await auth.login({
            email: this.email,
            password: this.password,
          });
  
          console.log("Login realizado:", response.data);
          // Redirecionar ou armazenar token aqui
        } catch (err) {
          this.error = "E-mail ou senha inválidos!";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 300px;
    margin: auto;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  input {
    width: 100%;
    margin: 5px 0;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
  }
  </style>
  