<!--
  Component for a single sequence
  Handles rendering and playback for a given sequence
-->
<script lang="ts">
  import { getPattern } from 'euclidean-rhythms';

  import type SequenceType from '../stores/SeqenceType';
  import { Midi } from 'tone';
  import type { Sampler, Sequence } from 'tone';

  import { onMount, onDestroy } from 'svelte';

  export let Tone;
  export let seq: SequenceType;
  export let prevPath: string;

  let toneSeq: Sequence;
  let toneSeqSixteenth: Sequence;
  let sampler: Sampler;

  let currentStep: number = -1;
  let mounted: boolean = false;

  onMount(() => {
    mounted = true;
    prevPath = seq.samplePath;

    // set up 16 note sequences on mount
    toneSeq = new Tone.Sequence({ subdivision: "16n" });
    toneSeqSixteenth = new Tone.Sequence({ subdivision: "16n" });

    newSampler(seq.samplePath);
    setToneSeq(seq);
  })

  // clean up Tone.Sequences and Tone.Sampler if component is deleted
  onDestroy(() => {
    if (toneSeq) toneSeq.dispose();
    if (toneSeqSixteenth) toneSeqSixteenth.dispose();
    if (sampler) sampler.dispose();
  })

  // if we have a new sample file to load, destroy and create a new Tone.Sampler (this seems necessary)
  // otherwise just `set` settings on the existing one
  $: if (mounted) {
    if (seq.samplePath !== prevPath) {
      sampler.dispose();
      newSampler(seq.samplePath);
      prevPath = seq.samplePath;
    }
    setToneSeq(seq);
  }

  function arrayRotate(arr, count) {
    let len = arr.length
    arr.push(...arr.splice(0, (-count % len + len) % len))
    return arr;
  }

  $: pattern = arrayRotate(getPattern(seq.pulses, seq.steps), seq.rotation);

  function newSampler(path: string) {
    sampler = new Tone.Sampler({
      urls: { C3: path },
      baseUrl: "/samples/"
    }).toDestination();
  }

  function setToneSeq(seq: SequenceType) {
    sampler.set({
      volume: seq.volume,
      attack: seq.attack,
      release: seq.release
    }).toDestination();

    let noteString = Midi(seq.pitch).toNote()

    toneSeq.set({
      events: pattern.map(binaryToNote),
      callback: (time, note) => {
        sampler.triggerAttackRelease([noteString], 0.1, time);
      }
    }).start(0);

    toneSeqSixteenth.set({
      events: pattern.map(sixteenthNotesPattern),
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
  {#each pattern as step, index}
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
    background-color: var(--seq-color);
  }

</style>
