<template>
  <div class="form">
    <h2>
      Encurtador <br />
      de URL
    </h2>
    <p>
      Insira a URL e uma palavra chave <br />
      que represente o assunto nos campos abaixo
    </p>

    <form @submit.prevent="save">
      <div>
        <label for="long-url">URL</label>
        <input
          required
          v-model="urlInfo.longUrl"
          id="long-url"
          placeholder="Insira a url a ser encurtada"
          type="url"
        />
      </div>

      <div>
        <label for="keyword">Palavra-Chave</label> <br />
        <input
          required
          v-model="urlInfo.keyword"
          id="keyword"
          placeholder="Insira a palvara-chave"
          type="text"
        />
      </div>

      <button id="send-button" type="submit">Encurtar</button>

      <div>
        <p for="short-url">Prontinho! Só copiar :)</p>

        <div class="copy-button">
          <button onclick="copyText()">
            <img src="../assets/copyIcon.svg" alt="" />
          </button>
          <input v-bind:value="urlInfo.shortUrl" id="short-url" type="text" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import UrlInfo from "@/services/urlInfo";

export default {
  name: "Form",

  data() {
    return {
      urlInfo: {
        longUrl: "",
        shortUrl: "",
        keyword: "",
      },
    };
  },

  methods: {
    save() {
      this.verifyIfExistsOnDb();
      UrlInfo.save(this.urlInfo).then((res) => {
        console.log("Url encurtada com sucesso", res.data);
        this.showShortUrl();
      });
    },

    verifyIfExistsOnDb() {
      UrlInfo.list().then((res) => {
        let data = res.data.shortUrls;
        data.map((urlInfo) => {
          if (urlInfo.keyword == this.urlInfo.keyword) {
            alert(
              `Ops :( ! \nParece que essa palavra-chave já está sendo utilizada em outra URL`
            );
          }
        });
      });
    },

    showShortUrl() {
      UrlInfo.list().then((res) => {
        let data = res.data.shortUrls;
        let last = data.length - 1;

        this.urlInfo.shortUrl = data[last].shortUrl;
      });
    },
  },
};
</script>

<style>
.form {
  width: 100%;
  background-color: #ffff;

  padding: 8%;
  color: #3f3f3f;

  box-shadow: 5px 10px 12px 2px rgba(0, 0, 0, 0.164);
}
.form h2 {
  color: #00b8ad;
}

.form p {
  line-height: 20px;
}

form input {
  width: 98%;
  height: 45px;

  margin-top: 8px;
  margin-bottom: 10px;

  border: 2.5px #00b8ad solid;
  border-radius: 4px;
}

form button {
  color: #ffff;
  font-weight: 700;
  font-size: 15px;

  background-color: #00b8ad;
  border: none;
}

form #send-button {
  width: 100%;
  height: 48px;

  margin-top: 4%;
  margin-bottom: 5%;
  padding: 5px;

  border-radius: 4px;
}

form .copy-button {
  display: flex;
}

.copy-button input {
  margin: 0;
}

.copy-button button {
  display: flex;

  align-items: center;
  justify-items: center;

  padding: 0 10px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

button:hover {
  border: 2.5px #00b8ad solid;
  background-color: transparent;
  cursor: pointer;
  transition: 600ms;
}

#send-button:hover {
  color: #00b8ad;
}
</style>
