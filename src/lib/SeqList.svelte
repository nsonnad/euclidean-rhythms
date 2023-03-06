<script lang="ts">
  export let Tone;
  let toneSeqs = null;

  import { onMount } from 'svelte';
  import { SeqStore } from '../stores/SeqStore';
  import Sequence from './Sequence.svelte';

  function handleAdd() {
    SeqStore.newRandomSequence();
  }

  function binaryToNote(n: number) {
    if (n === 1) return "C3";
    return null;
  }

  function setToneSeqs(seqs) {
    seqs.forEach((seq) => {
      let pattern = seq.pattern.map(binaryToNote);
      let synth = new Tone.Synth().toDestination();
      synth.oscillator.type = seq.sound;
      const sq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.1, time);
        // subdivisions are given as subarrays
      }, pattern, "16n").start(0);
    })
  }

  onMount(() => {
    toneSeqs = true;
    setToneSeqs($SeqStore);
  })

  $: if (toneSeqs != null) {
    setToneSeqs($SeqStore);
  }

  //let sounds = $SeqStore.map(() => new Synth());
</script>

{#each $SeqStore as seq (seq.id)}
  <Sequence {seq} />
{/each}

<button on:click={handleAdd}>+ add sequence</button>
