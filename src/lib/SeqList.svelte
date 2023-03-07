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

<button on:click={handleAdd}>+ add sequence</button>

<style>
  div.sequence {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-bottom: 40px;
    width: 100%;
  }
</style>
