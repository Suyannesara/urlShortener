<template>
  <div>
    <Header></Header>
    <p id="explanation">
      Urls organizadas de acordo com quantidade de acessos. <br />
      Assim você pode saber os tópicos de maior relevância <br />
      para seu público :D.
    </p>
    <div class="urls-container">
      <div v-for="urlData in this.urlsData" :key="urlData.keyword" class="url-card">
        <details>
          <summary>{{ urlData.keyword }}</summary>
          <!-- Substitua o conteúdo do <div class="hide-info"> pelo seguinte -->
          <div class="hide-info">
            <p>
              <a :href="urlData.shortUrl" target="_blank">{{ urlData.shortUrl }}</a>
              <!-- Botão de edição (ícone de lápis) -->
              <button @click="startEditing(urlData)" class="edit-btn">🖉</button>
            </p>

            <p>Cliques: <span>{{ urlData.clicks }}</span></p>

            <p v-if="urlData.expiresAt && editingKeyword !== urlData.keyword">
            Expira em: <span>{{ new Date(urlData.expiresAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) }}</span>
          </p>

          <!-- Campos de edição -->
          <div v-if="editingKeyword === urlData.keyword">
            <input
              v-model="newLongUrl"
              placeholder="Nova URL longa"
              class="edit-input"
            />
            <input
              v-model="newExpiresAt"
              type="date"
              class="edit-input"
              placeholder="Nova data de expiração"
            />
            <button @click="saveEdit(urlData.keyword)">Salvar</button>
            <button @click="cancelEdit">Cancelar</button>
          </div>

            <!-- Botão de deletar -->
            <button @click="deleteUrl(urlData.keyword)">🗑️ Deletar</button>
          </div>

        </details>
      </div>
    </div>
  </div>
</template>

<script>
import urlInfo from "@/services/urlInfo";
import Header from "../components/Header.vue";

export default {
  name: "Analysis",
  components: {
    Header,
  },
  data() {
    return {
      urlsData: [],
      intervalId: null,
      editingKeyword: null,
      newLongUrl: "",
      newExpiresAt: ""
    };
  },

  async mounted() {
    await this.loadUrls();

    // Atualiza a cada 5 segundos as infos das urls
    this.intervalId = setInterval(async() => {
      await this.loadUrls();
    }, 5000);
  },

  beforeDestroy() {
    // limpa o intervalo ao sair do componente
    clearInterval(this.intervalId);
  },



  methods: {
    async loadUrls() {
      try {
        const res = await urlInfo.list()
        let urlsData = res.data.shortUrls;

        if (urlsData.length == 0) {
          document.getElementById("explanation").innerText =
            'Ainda não há nada por aqui! Cadastre uma url na página "Encurtador" ';
        }

        urlsData.sort((urlA, urlB) => urlB.clicks - urlA.clicks);

        this.urlsData = urlsData;
      } catch (error) {
        console.log(error)
      }
    },

    async deleteUrl(keyword) {
      const confirmDelete = confirm("Tem certeza que deseja deletar esta URL?");
      if (!confirmDelete) return;

      try {
        await urlInfo.delete(keyword);
        await this.loadUrls();
      } catch (error) {
        alert("Erro ao deletar a URL.");
        console.error(error);
      }
    },

    startEditing(urlData) {
      this.editingKeyword = urlData.keyword;
      this.newLongUrl = urlData.longUrl;
      this.newExpiresAt = urlData.expiresAt;

    },

    cancelEdit() {
      this.editingKeyword = null;
      this.newLongUrl = "";
      this.newExpiresAt = "";
    },

    async saveEdit(keyword) {
      if (!this.newLongUrl) {
        alert("A nova URL não pode estar vazia.");
        return;
      }

      try {
        await urlInfo.edit(keyword, { longUrl: this.newLongUrl, expiresAt: this.newExpiresAt });
        this.cancelEdit();
        await this.loadUrls();
      } catch (error) {
        alert("Erro ao editar a URL.");
        console.error(error);
      }
    }
  }

};
</script>

<style scoped>
#explanation {
  color: #ffff;
  line-height: 1.5em;
}

.urls-container {
  width: 400px;
  height: 85vh;
}

.url-card {
  width: 400px;
  height: fit-content;
  margin-bottom: 2%;

  background-color: #ffff;
  border-radius: 3px;

  color: #3f3f3f;
}

details {
  padding: 4%;
}

.hide-info {
  padding: 0px 40px 0px 20px;
  max-height: 300px;
  overflow-y: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

summary {
  font-weight: 500;
}

.hide-info p {
  font-weight: 400;
  color: #cecece;
}

.hide-info span {
  font-weight: 300;
  color: #3f3f3f;
}

.hide-info a {
  color: #007BFF;
  text-decoration: none;
}

.hide-info a:hover {
  text-decoration: underline;
}

.hide-info button {
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.hide-info button:hover {
  background-color: #c82333;
}

.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 10px;
}

.edit-btn:hover {
  color: #007BFF;
}

.edit-input {
  padding: 4px;
  margin: 4px 0;
  width: 100%;
  box-sizing: border-box;
}
</style>
