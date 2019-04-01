
<template>
    <canvas ref="canvas"></canvas>
</template>

<script>

import Game from '../lib/game.js';
import Grid from '../lib/grid.js';

export default {

  data () {
    return {
        themes: {
            default: {
                clear: 'rgba(0, 0, 0, .1)',
                cellStroke: '#000',
                cellFill: 'rgba(0, 153, 255, 1)',
            },
            inverted: {
                clear: 'rgba(255, 255, 255, 0.3)',
                cellStroke: '#FFF',
                cellFill: 'rgba(0, 0, 0, 1)',
            },
        },
        timers: {
            raf: {
                trigger: fn => requestAnimationFrame(fn),
                clear: handle => cancelAnimationFrame(handle),
            },
            timeout: {
                trigger: fn => setTimeout(fn, 1000 / this.framesPerSecond),
                clear: handle => clearTimeout(handle),
            }
        },
        framesPerSecond: 60,
    }
  },

  computed: {
    canvasContext () {
      return this.$refs.canvas.getContext('2d')
    }
  },

  props: {
    mainColor: {
      type: String,
      default: '#00ff5a'
    },
    numberOfCircles: {
      type: Number,
      default: 50
    }
  },

  methods: {
    animate () {
      requestAnimationFrame(this.animate)
      this.canvasContext.clearRect(0, 0, innerWidth, innerHeight)

      for (var i = 0; i < this.circles.length; i++) {
        this.circles[i].update()
      }
    },
    init() {
        const canvasSize = [window.innerWidth, window.innerHeight];
        const cellCount = [150, 75];
        const canvas = this.$refs.canvas;
        canvas.width = canvasSize[0];
        canvas.height = canvasSize[1];
        const ctx = canvas.getContext('2d');
        const game = new Game(ctx, this.themes.default, this.timers.timeout);
        const grid = new Grid(cellCount[0], cellCount[1]);
        grid.seed( 0.5 );
        game.start(grid);
    }
  },

  mounted () {
    this.init();
  }
}
</script>