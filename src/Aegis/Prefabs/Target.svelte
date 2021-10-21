<script lang="ts">
  import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte';

  import { Vector } from 'vector2d';

  import { registerHitBox, removeFromOutline, SCALE } from '../Store/game';

  export let id: string;
  export let pos: Vector;

  const size = 8;
  $: width = size * $SCALE;
  $: height = size * $SCALE;
  $: half = height / 2;

  onMount(() => {
    // setTimeout(() => {
    //   removeFromOutline(id);
    // }, 3000);
  });

  beforeUpdate(() => {
    registerHitBox({ id, pos, size: new Vector(20, 20) });
    console.log(pos.x);
  });

  onDestroy(() => {
    console.log('boom');
  });
</script>

<svg x={pos.x - half} y={pos.y - half} {width} {height}>
  <circle r={half} cx={half} cy={half} style="fill: red;" />
</svg>
