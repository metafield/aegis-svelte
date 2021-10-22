<script lang="ts">
  import { beforeUpdate, onDestroy, onMount } from 'svelte';
  import { Vector } from 'vector2d';
  import { registerHitBox, SCALE } from '../Store/game';

  export let id: string;
  export let pos: Vector;
  export let direction: Vector;

  const size = 8;
  $: width = size * $SCALE;
  $: height = size * $SCALE;
  $: half = height / 2;

  onMount(() => {
    setInterval(() => {
      pos.x += direction.x;
    }, 300);
  });

  beforeUpdate(() => {
    registerHitBox({
      id,
      pos: new Vector(pos.x - half, pos.y - half),
      size: new Vector(width, height),
    });
  });

  onDestroy(() => {
    console.log(`Missile with id ${id} removed`);
  });
</script>

<svg x={pos.x - half} y={pos.y - half} {width} {height}>
  <circle r={half} cx={half} cy={half} style="fill: green;" />
</svg>
