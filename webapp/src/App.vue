<template>
  <Form></Form>
</template>

<script>
import Form from "./components/Form.vue";
import UrlInfo from "./services/urlInfo";

export default {
  name: "App",
  components: {
    Form,
  },

  mounted() {
    UrlInfo.list().then((res) => {
      console.log(res.data);
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
