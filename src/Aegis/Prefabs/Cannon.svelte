<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Vector } from 'vector2d';
  import type { MissileProps } from '../../types';
  import { addToOutline, SCALE, target } from '../Store/game';
  import Missile from './Missile.svelte';
  export let pos: Vector;
  let gunW = 8 * $SCALE;
  let gunH = 60 * $SCALE;
  let baseW = 90 * $SCALE;
  let baseH = 20 * $SCALE;

  // state and store
  let prevTarget: Vector;
  const unsubscribe = target.subscribe((newTarget) => {
    // do something
    if (prevTarget) fire();
    prevTarget = newTarget;
  });
  onDestroy(unsubscribe);

  // #region: Active Variables
  $: x = pos.x;
  $: y = pos.y;
  let gunOrigin = new Vector(baseW / 2 + x, baseH / 2 + y);
  $: {
    gunOrigin.x = baseW / 2 + x;
    gunOrigin.y = baseH / 2 + y;
    console.log(gunOrigin);
  }

  $: tempTarget = $target || new Vector(800, 10);
  $: lookDirection = tempTarget.clone().subtract(gunOrigin);
  $: targetAngle =
    Math.atan2(lookDirection.y, lookDirection.x) * (180 / Math.PI);
  $: rotation = targetAngle + 90;
  // #endregion

  // Prefab Scripts
  function fire() {
    let targetAtOrigin = new Vector(
      gunOrigin.x - $target.x,
      gunOrigin.y - $target.y
    );
    console.log('target: ', $target.toString());
    console.log('gunOrigin: ', gunOrigin.toString());
    console.log('targetAtOrigin: ', targetAtOrigin.toString());
    // spawn a projectile
    const direction = targetAtOrigin.clone().normalise() as Vector;
    console.log('direction', direction);
    let firePoint = direction.clone().mulS(-gunH).add(gunOrigin) as Vector;
    addToOutline<MissileProps>(Missile, {
      pos: firePoint,
      id: `missile:${Math.random()}`,
      direction,
    });
  }
</script>

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
<text x={x + 4} y={y + 14}>rot: {rotation.toFixed(2)}</text>

<style>
  rect,
  text {
    stroke: wheat;
  }
</style>
