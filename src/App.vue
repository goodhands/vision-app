<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <input type="text" v-model="url" id="">
    <button @click="label">Get labels</button>
    <pre>
      {{ labels }}
    </pre>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ImageLabel from './services/imageLabel';

export default {
  name: 'App',
  components: {
    HelloWorld
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
  margin-top: 60px;
}
</style>
