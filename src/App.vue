<template>
  <div id="app" class="h-screen py-20 bg-gradient-to-r from-purple-400 to-red-500 via-pink-500">
    <main class="m-auto max-w-screen-sm">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/upload-widget">Upload Widget</router-link>
      </div>
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>