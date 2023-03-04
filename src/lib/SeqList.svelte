<script>
  import { SeqStore } from '../stores/SeqStore.js';
  import Sequence from './Sequence.svelte';

  const handleAdd = () => {
    SeqStore.newRandomSequence();
  }
</script>

<button>play</button>

{#each $SeqStore as seq (seq.id)}
  <Sequence {seq} />
{/each}

<button on:click={handleAdd}>+ add sequence</button>
