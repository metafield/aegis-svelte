<script lang="ts">
  import { Vector } from 'vector2d';
  import Cannon from './Prefabs/Cannon.svelte';
  import Target from './Prefabs/Target.svelte';
  import { mouse, target } from './Store/game';

  let player = new Vector(0, 520);

  function handleMousemove(event) {
    mouse.set({ x: event.offsetX, y: event.offsetY });
    player.x = event.offsetX;
  }

  function handleMousedown(event) {
    target.set(new Vector(event.offsetX, event.offsetY));
  }
</script>

<div id="container">
  <svg
    id="game"
    height="600"
    width="800"
    viewBox="0 0 800 600"
    on:mousemove={handleMousemove}
    on:mousedown={handleMousedown}
  >
    <text x="20" y="20">mouse {$mouse.x} - {$mouse.y}</text>

    <Target pos={$target} />

    <Cannon pos={new Vector(400 - 45, 600 - 30)} />
  </svg>
</div>

<style>
  #game {
    background-color: #222;
  }
  text {
    stroke: white;
  }
  #container {
    height: 800px;
  }
</style>
