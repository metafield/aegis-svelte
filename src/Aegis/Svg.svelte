<script lang="ts">
  import type { SVGProps } from '../types';

  export let props: SVGProps;
</script>

<svg
  style={props.style}
  width={props.width}
  height={props.height}
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  on:mousemove
>
  <title>{props.title}</title>
  <desc>{props.desc}</desc>
  <slot />
</svg>

<style>
  svg {
    height: 100%;
    width: 100%;
  }
</style>
