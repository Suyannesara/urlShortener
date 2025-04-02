<template>
    <div class="container">
      <h2>Cadastro</h2>
  
      <div class="tooltip">
        <input v-model="name" type="text" placeholder="Username" />
        <span class="tooltiptext">Se você não quiser escolher um username, nós geraremos um automaticamente para você &#128522.</span>
      </div>
  
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="password" type="password" placeholder="Senha" required />
  
      <button @click="register">Cadastrar</button>
  
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
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
            })
  
            this.success = resp.data.message

            setTimeout(() => {
                this.$router.push("/login"); 
            }, 2000);
        } catch (err) {
          if (err.response.status === 409) {
            this.error = "E-mail já cadastrado!";
          } else {
            this.error = "Error ao cadastrar. Tente novamente!";
          }
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
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  .error {
    color: red;
  }
  
  .success {
    color: green;
  }

/* Estilização da tooltip */
.tooltip {
  position: relative;
  display: inline-block;
  width: 100%;
}

.tooltiptext {
  visibility: hidden;
  width: 220px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 4px;

  /* Posicionamento */
  position: absolute;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  
  /* Efeito fade-in */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Flecha da tooltip */
.tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%; /* Posiciona a flecha abaixo da tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

/* Mostrar tooltip ao passar o mouse */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
  