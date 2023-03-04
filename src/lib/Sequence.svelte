<script lang="ts">
  export let seq;

  import { SeqStore } from '../stores/SeqStore.js';
  import SeqControls from './SeqControls.svelte';
</script>


<div class="sequence">

  <div class="steps" style="grid-template-columns: repeat({seq.steps}, 1fr">
    {#each seq.pattern as step}
      {#if step === 1}
        <div class="step on"></div>
      {:else}
        <div class="step off"></div>
      {/if}
    {/each}
  </div>

  <div class="seq-controls">
    <input type=number value={seq.pulses}>
    <input type=number value={seq.steps}>
    <input type=number value={seq.rotation}>
  </div>

</div>

<style>
  div.sequence {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 20px;
    width: 100%;
  }

  div.steps {
    display: grid;
    flex-grow: 10;
  }

  div.step {
    max-width: 20px;
    border: 1px solid black;
    height: 50px;
  }

  div.seq-controls {
    flex-grow: 1;
  }

  div.on {
    background-color: lightgreen;
  }
</style>
