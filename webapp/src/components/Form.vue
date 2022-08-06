<template>
  <div>
    <h2>Encurtador de URL</h2>
    <p>
      Insira a URL e uma palavra chave que represente o assunto nos campos
      abaixo
    </p>

    <form @submit.prevent="save">
      <div>
        <label for="url">Url</label> <br />
        <input v-model="url_info.long_url" id="url-input" type="text" />
      </div>

      <div>
        <label for="keyword">Palavra-Chave</label> <br />
        <input v-model="url_info.keyword" id="keyword-input" type="text" />
      </div>

      <button type="submit">Encurtar</button>

      <div>
        <label for="short-url">Prontinho! Só copiar :)</label> <br />
        <input @value="url_info.short_url" id="short-url" type="text" />
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
      url_info: {
        long_url: "",
        keyword: "",
        short_url: "",
      },
    };
  },

  methods: {
    save() {
      UrlInfo.save(this.url_info).then((res) => {
        console.log("Url encurtada com sucesso");
      });
    },
  },
};
</script>

<style></style>
