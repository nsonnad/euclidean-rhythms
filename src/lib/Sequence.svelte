<script lang="ts">
  export let seq;

  import { getPattern } from 'euclidean-rhythms';
  let steps = getPattern(seq.pulses, seq.steps);
</script>


<div class="sequence" style="grid-template-columns: repeat({seq.steps}, 1fr">
  {#each steps as step}
    {#if step === 1}
      <div class="step on">on</div>
    {:else}
      <div class="step off">off</div>
    {/if}
  {/each}
</div>

<style>
  div.sequence {
    display: grid;
  }

  div.step {
    max-width: 60px;
    border: 1px solid black;
  }

  div.on {
    background-color: lightgreen;
  }
</style>
