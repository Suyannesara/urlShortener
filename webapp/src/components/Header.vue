<template>
  <header>
    <nav>
      <b><router-link class="router-link" to="/">Encurtador</router-link></b>
      <b><router-link class="router-link" to="/analysis">Análises</router-link></b>
    </nav>
  </header>
</template>

<script></script>

<style scoped>
header {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
}

nav .router-link {
  padding: 20px;
  margin: 30px;
  color: #ffff;
  text-decoration: none;
}

nav .router-link:hover {
  transition: all 0.5s ease;
  background-color: #ffffffda;
  border-radius: 5px;
  margin: 30px;
  color: #00b8ad;
  text-decoration: none;
}
</style>
