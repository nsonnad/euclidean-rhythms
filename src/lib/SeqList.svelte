<script lang="ts">
  export let Tone;

  import { SeqStore } from '../stores/SeqStore';
  import Sequence from './Sequence.svelte';
  import SampleBrowser from './SampleBrowser.svelte';

  let seqId = "";
  let samplePath = "";
  let showSampleBrowser = false;

  function handleAdd() {
    SeqStore.newRandomSequence();
  }

  function handleLoadBrowser(e) {
    seqId = e.detail.seqId;
    samplePath = e.detail.samplePath;
    showSampleBrowser = true;
  }

  function closeSampleBrowser() {
    showSampleBrowser = false;
  }
</script>

{#each $SeqStore as seq (seq.id)}
  <Sequence on:loadbrowser={handleLoadBrowser} {seq} {Tone} />
{/each}

<div class="add-sequence">
  <button on:click={handleAdd}>+ add sequence</button>
</div>

{#if showSampleBrowser}
  <SampleBrowser {closeSampleBrowser} {seqId} {samplePath} />
{/if}

<style>
  div.add-sequence {
    text-align: center;
  }
</style>
