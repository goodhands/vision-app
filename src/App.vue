<template>
  <div id="app" class="h-screen px-5 py-20 bg-gradient-to-r from-purple-400 to-red-500 via-pink-500">
    <main class="m-auto max-w-screen-sm">
      <div id="nav" class="flex flex-row justify-between mb-2">
        <router-link to="/">Home</router-link>
        <router-link to="/widget" class="bg-purple-600 p-2 rounded text-gray-200 text-sm">Upload</router-link>
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
  height: 100ch;
}
</style>