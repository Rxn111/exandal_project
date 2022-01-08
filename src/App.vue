<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Registro de entrega de Materia Prima</router-link> |
      <router-link to="/register-resulting-product">Registro de Producto Resultante</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

label{
		text-align: left;
    font-size: 0.9rem;
}
</style>
