<template>
  <div>
    <Header id="header"></Header>

    <div class="urls-container">
      <div class="url-card">
        <details>
          <summary>FLL</summary>
          <div class="hide-info">
            <p>https://layers.com</p>
            <p>220</p>
            <p>07.08.22</p>
            <img src="" alt="Url activity" />
          </div>
        </details>
      </div>
      <div class="url-card">
        <details>
          <summary>FLL</summary>
          <div class="hide-info">
            <p>https://layers.com</p>
            <p>220</p>
            <p>07.08.22</p>
            <img src="" alt="Url activity" />
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Analysis",
  components: {
    Header,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.urls-container {
  width: 400px;
  height: 85vh;

  margin-top: 5%;
}

.url-card {
  width: 100%;
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
  display: flex;

  align-items: center;
}
</style>
