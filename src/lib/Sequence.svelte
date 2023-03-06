<script lang="ts">
  export let seq;
import { getPattern } from 'euclidean-rhythms';

  import { SeqStore } from '../stores/SeqStore.js';
  import SeqControls from './SeqControls.svelte';

  function handleDeleteSeq(id) {
    SeqStore.update(currentData => {
      return currentData.filter(d => d.id !== id);
    })
  }

  function handleUpdateParm(e, id, param) {
    SeqStore.update(currentData => {
      let copiedData = [...currentData];
      let currentSeq = copiedData.find(seq => seq.id == id)

      currentSeq[param] = parseInt(e.target.value);
      currentSeq.pattern = getPattern(seq.pulses, seq.steps)

      return copiedData;
    })
  }
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
    <label for="pulses">Pulses </label>
    <input on:change={e => handleUpdateParm(e, seq.id, "pulses")}
           name="pulses"
           type=number
           value={seq.pulses}
           >

    <label for="steps"> Steps </label>
    <input on:change={e => handleUpdateParm(e, seq.id, "steps")}
           name="steps"
           type=number
           value={seq.steps}
           >

    <label for="rotation"> Rotation </label>
    <input on:change={e => handleUpdateParm(e, seq.id, "rotation")}
           name="rotation"
           type=number
           value={seq.rotation}
           >

    <button on:click={handleDeleteSeq(seq.id)}>X</button>
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

  input {
    max-width: 80px;
    padding: 10px;
    margin: 0;
    box-sizing: border-box;
    background-color: lightgray;
    border: 0;
  }

</style>
