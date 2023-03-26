<script lang="ts">
  import * as Tone from "tone";
  import SeqList from "$lib/SeqList.svelte";
  import GlobalControls from "$lib/GlobalControls.svelte";

</script>

<div class="top">
  <h1>euclidean rhythm generator (?)</h1>
</div>

<GlobalControls {Tone} />

<div>
  <SeqList {Tone} />
</div>

<style>
  :global(body) {
    background-color: #1f1f1f;
    font-family: monospace;
    color: lightgray;
  }

  div.top {
    text-align: center;
    margin-bottom: 40px;
  }
</style>
