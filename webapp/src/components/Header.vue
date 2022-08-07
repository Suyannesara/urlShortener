<template>
  <header>
    <img src="../assets/logoLayers.png" alt="layers logo" />
    <nav>
      <router-link class="router-link" to="/">Encurtador</router-link>
      <router-link class="router-link" to="/analysis">Analises</router-link>
    </nav>
  </header>
</template>

<script></script>

<style scoped>
header {
  display: flex;
  width: 100%;
  align-items: center;
}

header img {
  padding-left: 10%;
}

nav .router-link {
  padding-left: 30%;
  color: #ffff;
  text-decoration: none;
}
</style>
