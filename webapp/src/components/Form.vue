<template>
  <div>
    <h2>Encurtador de URL</h2>
    <p>
      Insira a URL e uma palavra chave que represente o assunto nos campos
      abaixo
    </p>

    <form @submit.prevent="save">
      <div>
        <label for="keyword">Palavra-Chave</label> <br />
        <input v-model="urlInfo.keyword" id="keyword" type="text" />
      </div>

      <div>
        <label for="long-url">URL</label>
        <input
          v-model="urlInfo.longUrl"
          id="long-url"
          placeholder="Insira a url a ser encurtada"
        />
      </div>

      <button type="submit">Encurtar</button>

      <div>
        <label for="short-url">Prontinho! Só copiar :)</label> <br />
        <input v-bind:value="urlInfo.shortUrl" id="short-url" type="text" />
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

<style></style>
