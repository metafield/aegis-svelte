<script lang="ts">
  import { SCALE } from '../Store/game';
  export let x;
  export let y;

  $: width = 100 * $SCALE;
  $: height = 20 * $SCALE;
</script>

<svg {x} {y} {width} {height} viewBox={`0 0 ${width}  ${height}`}>
  <rect {width} {height} />
</svg>

<style>
  svg {
    fill: none;
  }

  rect {
    stroke: white;
    stroke-width: 6px;
  }
</style>
