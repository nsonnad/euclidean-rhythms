<script lang="ts">
  import Sequence from "$lib/Sequence.svelte";
  // import { scaleBand, scaleLinear } from "d3-scale";

  let width = 1200;
  let height = 1200;

  // let musicalTicks = 128;

  let seqs = [
    {
      id: 1,
      pulses: 2,
      steps: 4,
      rotation: 0,
      ticks: 16
    },
    {
      id: 2,
      pulses: 3,
      steps: 13,
      rotation: 0,
      ticks: 16
    }
  ];
</script>


<div>
  {#each seqs as seq}
    <Sequence {seq} />
  {/each}
</div>
