<script>
  import { SeqStore } from '../stores/SeqStore';
  import Sequence from './Sequence.svelte';

  function handleAdd() {
    SeqStore.newRandomSequence();
  }
</script>

<button>play</button>

{#each $SeqStore as seq (seq.id)}
  <Sequence {seq} />
{/each}

<button on:click={handleAdd}>+ add sequence</button>
