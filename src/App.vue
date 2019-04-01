<template>
  <div id="app">
    <GameOfLife />
  </div>
</template>

<script>
import GameOfLife from './components/GameOfLife.vue'

export default {
  name: 'app',
  components: {
    GameOfLife
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
