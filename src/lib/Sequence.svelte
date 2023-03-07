<!--
  Component for a single sequence
  Handles rendering and playback for a given sequence
-->
<script lang="ts">
  import type SequenceType from '../stores/SeqenceType';
  import type { Sequence } from 'tone';

  import { onMount, onDestroy } from 'svelte';

  export let Tone;
  export let seq: SequenceType;

  let toneSeq: Sequence;
  let toneSeqSixteenth: Sequence;

  let currentStep: number = -1;
  let mounted: boolean = false;

  onMount(() => {
    mounted = true;
    // set up 16 note sequences on mount
    toneSeq = new Tone.Sequence({ subdivision: "16n" });
    toneSeqSixteenth = new Tone.Sequence({ subdivision: "16n" });

    setToneSeq(seq);
  })

  onDestroy(() => {
    if (toneSeq) toneSeq.dispose();
    if (toneSeqSixteenth) toneSeqSixteenth.dispose();
  })

  $: if (mounted) {
    setToneSeq(seq);
  }

  function setToneSeq(seq: SequenceType) {
    let synth = new Tone.Synth().toDestination();
    synth.oscillator.type = seq.sound;

    toneSeq.set({
      events: seq.pattern.map(binaryToNote),
      callback: (time, note) => {
        synth.triggerAttackRelease(note, 0.1, time);
      }
    }).start(0);

    toneSeqSixteenth.set({
      events: seq.pattern.map(sixteenthNotesPattern),
      callback: (time: number, note: number) => { currentStep = note; }
    }).start(0);
  }

  function binaryToNote(n: number) {
    if (n === 1) return "C3";
    return null;
  }

  function sixteenthNotesPattern(seq, i) {
    return i;
  }
</script>

<div class="steps" style="grid-template-columns: repeat({seq.steps}, 1fr">
  {#each seq.pattern as step, index}
    {#if index === currentStep}
      <div class="step current"></div>
    {:else if (step === 1)}
      <div class="step on"></div>
    {:else}
      <div class="step off"></div>
    {/if}
  {/each}
</div>

<style>
  div.steps {
    display: grid;
    flex-grow: 10;
  }

  div.step {
    border: 1px solid black;
    height: 50px;
  }

  div.current {
    background-color: lightblue;
  }

  div.on {
    background-color: lightgreen;
  }

</style>
