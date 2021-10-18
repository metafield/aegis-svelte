<script lang="ts">
  import { Vector } from 'vector2d';
  import Block from './Prefabs/block.svelte';
  import Svg from './Svg.svelte';

  const m = new Vector(0, 0);
  let player = new Vector(0, 520);

  function handleMousemove(event) {
    console.log('hmm');
    m.x = event.offsetX;
    m.y = event.offsetY;
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
    <text x="50" y="50">{`${m.x} ${m.y}`}</text>
    <Block pos={player} />
  </g>
</Svg>

<style>
  text {
    color: white;
  }
</style>
