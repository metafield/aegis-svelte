<script lang="ts">
  import { beforeUpdate, onDestroy, onMount } from 'svelte';
  import { Vector } from 'vector2d';
  import {
    delta,
    registerHitBox,
    removeFromOutline,
    SCALE,
    unregisterHitBox,
    updateHitBox,
  } from '../Store/game';

  export let id: string;
  export let pos: Vector;
  export let direction: Vector;
  export let target: Vector;

  let speed = 0.5;
  const size = 8;
  $: width = size * $SCALE;
  $: height = size * $SCALE;
  $: half = height / 2;

  // MAIN LOOP
  const unsubscribe = delta.subscribe((newDelta) => {
    if (pos.distance(target) < 10) {
      direction = new Vector(0, 0);
      removeFromOutline(id);
    }

    pos.x += direction.x * speed * newDelta;
    pos.y += direction.y * speed * newDelta;
  });

  onMount(() => {
    registerHitBox({
      id,
      pos: new Vector(pos.x - half, pos.y - half),
      size: new Vector(width, height),
    });
  });

  onDestroy(() => {
    console.log('-----------------------------------------------------');
    console.log('-----------------------------------------------------');
    console.log(`Missile with id ${id} removed`);
    console.log('-----------------------------------------------------');
    console.log('-----------------------------------------------------');
    unregisterHitBox(id);
    unsubscribe();
  });

  beforeUpdate(() => {
    updateHitBox({
      id,
      pos: new Vector(pos.x - half, pos.y - half),
      size: new Vector(width, height),
    });
  });
</script>

<svg x={pos.x - half} y={pos.y - half} {width} {height}>
  <circle r={half} cx={half} cy={half} style="fill: green;" />
</svg>
