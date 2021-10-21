<script lang="ts">
  import type { Vector } from 'vector2d';

  import { SCALE } from '../Store/game';
  export let pos: Vector;

  const size = 8;
  $: width = size * $SCALE;
  $: height = size * $SCALE;
  $: half = height / 2;
</script>

<svg x={pos.x - half} y={pos.y - half} {width} {height}>
  <circle r={half} cx={half} cy={half} style="fill: red;" />
</svg>
