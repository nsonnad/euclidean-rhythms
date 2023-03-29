<script lang="ts">
  export let Tone;

  import { SeqStore } from '../stores/SeqStore';
  import Sequence from './Sequence.svelte';
  import SampleBrowser from './SampleBrowser.svelte';
  import PresetBrowser from './PresetBrowser.svelte';

  let seqId = "";
  let samplePath = "";
  let presetId;
  let showSampleBrowser = false;
  let showPresetBrowser = false;
  let numSeqs: number;

  function handleAdd() {
    SeqStore.newRandomSequence();
  }

  function handleSampleBrowser(e) {
    showPresetBrowser = false;
    seqId = e.detail.seqId;
    samplePath = e.detail.samplePath;
    showSampleBrowser = true;
  }

  function handlePresetBrowser(e) {
    showSampleBrowser = false;
    showPresetBrowser = true;
    seqId = e.detail.seqId;
  }

  function closeSampleBrowser() {
    showSampleBrowser = false;
  }

  function closePresetBrowser() {
    showPresetBrowser = false;
  }

  SeqStore.subscribe(seqs => {
    numSeqs = seqs.length;
  })
</script>

{#each $SeqStore as seq (seq.id)}
  <Sequence
      on:samplebrowser={handleSampleBrowser}
      on:presetbrowser={handlePresetBrowser}
      {seq}
      {Tone}
      />
{/each}

{#if (numSeqs < 6) }
<div class="add-sequence">
  <button on:click={handleAdd}>+ add sequence</button>
</div>
{/if}

{#if showSampleBrowser}
  <SampleBrowser {closeSampleBrowser} {seqId} {samplePath} />
{/if}

{#if showPresetBrowser}
  <PresetBrowser {closePresetBrowser} {seqId} />
{/if}

<style>
  div.add-sequence {
    text-align: center;
  }
</style>
