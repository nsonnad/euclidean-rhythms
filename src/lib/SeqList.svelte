<script lang="ts">
  export let Tone;

  import { SeqStore } from '../stores/SeqStore';
  import Sequence from './Sequence.svelte';

  function handleAdd() {
    SeqStore.newRandomSequence();
  }
</script>

{#each $SeqStore as seq (seq.id)}
  <Sequence {seq} {Tone} />
{/each}

<div class="add-sequence">
  <button on:click={handleAdd}>+ add sequence</button>
</div>

<style>
  div.add-sequence {
    text-align: center;
  }
</style>
