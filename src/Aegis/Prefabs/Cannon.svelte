<script lang="ts">
  import { Vector } from 'vector2d';
  export let pos: Vector;
  export let mouse: Vector;
  let gunW = 8;
  let gunH = 60;
  let baseW = 90;
  let baseH = 20;
  $: x = pos.x;
  $: y = pos.y;
  let gunOrigin = new Vector(baseW / 2 + x, baseH / 2 + y);
  $: {
    gunOrigin.x = baseW / 2 + x;
    gunOrigin.y = baseH / 2 + y;
  }

  $: lookDirection = mouse.clone().subtract(gunOrigin);
  $: targetAngle =
    Math.atan2(lookDirection.y, lookDirection.x) * (180 / Math.PI);
  $: rotation = targetAngle + 90;
</script>

<text x="200" y="200">${rotation}</text>
<rect
  id="gun"
  x={x + baseW / 2 - gunW / 2}
  y={y - gunH + baseH / 2}
  width={gunW}
  height={gunH}
  transform={`rotate(${rotation} ${gunOrigin.x} ${gunOrigin.y})`}
/>
<rect id="base" {x} {y} width={baseW} height={baseH} />
<circle r="4" cx={gunOrigin.x} cy={gunOrigin.y} />
