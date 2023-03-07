<script lang="ts">
  export let Tone;

  import { SeqStore } from '../stores/SeqStore';
  import Sequence from './Sequence.svelte';

  function handleAdd() {
    SeqStore.newRandomSequence();
  }

  //let sounds = $SeqStore.map(() => new Synth());
</script>

{#each $SeqStore as seq (seq.id)}
  <Sequence {seq} {Tone} />
{/each}

<button on:click={handleAdd}>+ add sequence</button>
