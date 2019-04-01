<template>
  <div id="app">
    <GameOfLife />
  </div>
</template>

<script>
import { remote } from 'electron'
import GameOfLife from './components/GameOfLife.vue'



export default {
  name: 'app',
  components: {
    GameOfLife
  },
  beforeCreate(){
    remote.getCurrentWindow().setFullScreen(true);
  }
}
</script>

<style>
    body{
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
</style>
