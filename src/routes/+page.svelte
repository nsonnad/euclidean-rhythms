<script lang="ts">
  import SeqList from "$lib/SeqList.svelte";
  // import { scaleBand, scaleLinear } from "d3-scale";
</script>

<div class="top">
  <h1>euclidean rhythm generator</h1>
</div>

<div>
  <SeqList />
</div>

<style>
  :global(body) {
    background-color: #709e7d;
    font-family: monospace;
  }

  div.top {
    text-align: center;
    margin-bottom: 40px;
  }
</style>
