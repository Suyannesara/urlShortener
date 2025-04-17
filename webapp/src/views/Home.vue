<template>
  <div>
    <Header></Header>
    <Form></Form>
  </div>
</template>

<script>
import Form from "../components/Form.vue";
import Header from "../components/Header.vue";

export default {
  name: "App",
  components: {
    Form,
    Header,
  },
};
</script>

<style>
html,
body {
  display: flex;
  flex-direction: column;

  margin: 0;

  width: 100%;
  height: 100vh;

  background-color: #00b8ad;
  font-family: "Nunito", sans-serif;

  align-items: center;
  justify-content: center;
}

#app {
  display: flex;
  width: 100%;

  flex-direction: column;
  align-items: center;
}
</style>
