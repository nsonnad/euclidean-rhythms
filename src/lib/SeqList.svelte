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
    <Sequence {seq} {Tone} />
    <SeqControls {seq} />
</div>
{/each}

<button on:click={handleAdd}>+ add sequence</button>

<style>
  div.sequence {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 20px;
    width: 100%;
  }
</style>
