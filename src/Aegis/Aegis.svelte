<script lang="ts">
  import { Vector } from 'vector2d';
  import Block from './Prefabs/block.svelte';
  import Cannon from './Prefabs/Cannon.svelte';
  import Svg from './Svg.svelte';

  const mouse = new Vector(0, 0);
  let player = new Vector(0, 520);
  let cannon = new Vector(400, 520);

  function handleMousemove(event) {
    console.log('hmm');
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    player.x = event.offsetX;
  }
</script>

<Svg
  props={{
    title: 'Game Manager',
    desc: 'Main Canvas',
    style: 'background-color: #222;',
    height: '600',
  }}
  on:mousemove={handleMousemove}
>
  <g id="lines" style="stroke: white; fill: none;">
    <text x="50" y="50">{`${mouse.x} ${mouse.y}`}</text>
    <!-- <Block pos={player} /> -->
    <Cannon pos={cannon} {mouse} />
    <Cannon pos={new Vector(cannon.x - 100, cannon.y)} {mouse} />
  </g>
</Svg>

<style>
  text {
    color: white;
  }
</style>
