<template>
  <div id="app">
  </div>
</template>

<script lang="ts">
import Home from './Home.vue';
import { Vue, Component } from 'vue-property-decorator';
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
