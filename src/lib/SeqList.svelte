<script lang="ts">
  export let Tone;

  import { SeqStore } from '../stores/SeqStore';
  import Sequence from './Sequence.svelte';
  import SeqControls from './SeqControls.svelte';

  function handleAdd() {
    SeqStore.newRandomSequence();
  }
</script>

{#each $SeqStore as seq (seq.id)}
  <div class="sequence">
    <SeqControls {seq} />
    <Sequence {seq} {Tone} />
</div>
{/each}

<div class="add-sequence">
  <button on:click={handleAdd}>+ add sequence</button>
</div>

<style>
  div.sequence {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-bottom: 50px;
    width: 100%;
  }

  div.add-sequence {
    text-align: center;
  }
</style>
