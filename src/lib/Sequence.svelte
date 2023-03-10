<!--
  Component for a single sequence
  Handles rendering and playback for a given sequence
-->
<script lang="ts">
  import type SequenceType from '../stores/SeqenceType';
  import { Midi } from 'tone';
  import type { Sampler, Sequence } from 'tone';

  import { onMount, onDestroy } from 'svelte';

  export let Tone;
  export let seq: SequenceType;

  let toneSeq: Sequence;
  let toneSeqSixteenth: Sequence;
  let sampler: Sampler;

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
    if (sampler) sampler.dispose();
  })

  $: if (mounted) {
    setToneSeq(seq);
  }

  function setToneSeq(seq: SequenceType) {
    sampler = new Tone.Sampler({
      urls: { C3: seq.sample.path },
      baseUrl: "/samples/",
      volume: seq.sample.volume,
      attack: seq.sample.attack,
      release: seq.sample.release
    }).toDestination();

    let noteString = Midi(seq.sample.pitch).toNote()

    toneSeq.set({
      events: seq.pattern.map(binaryToNote),
      callback: (time, note) => {
        sampler.triggerAttackRelease([noteString], 0.1, time);
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
    grid-gap: 4px;
  }

  div.step {
    border: 1px solid darkgray;
    border-radius: 4px;
    height: 70px;
  }

  div.current {
    background-color: lightblue;
    border: 1px solid white;
  }

  div.on {
    background-color: #124a54;
  }

</style>
