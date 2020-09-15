<template>
  <div id="app" class="h-screen py-20">
    <main class="content">
      <input type="text" class="border-2" v-model="url">
      <button @click="label">Get labels</button>
      <pre>
        {{ labels }}
      </pre>
    </main>
  </div>
</template>

<script>
import ImageLabel from './services/imageLabel';

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      url: "",
      imageService: new ImageLabel(),
      labels: "",
    }
  },
  methods: {
    label(){
      this.imageService.buildRequest(this.url);
      this.imageService.annotate()
      .then(results => {
        this.labels = results;
      }).catch(errors => {
        console.log(errors);
      });
    }
  },
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
