<script lang="ts">
  import type { Vector } from 'vector2d';
  export let pos: Vector;
  let w = 100;
  let h = 20;
  $: x = pos.x;
  $: y = pos.y;
</script>

<path d={`M ${x - w / 2} ${y} h ${w} v ${h} h ${-w} v ${-h}`} />
