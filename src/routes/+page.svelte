<script lang="ts">
  import * as Tone from "tone";
  import { onMount } from 'svelte';

  import SeqList from "$lib/SeqList.svelte";
  import Transport from "$lib/Transport.svelte";

</script>

<div class="top">
  <h1>euclidean rhythm generator</h1>
</div>

<Transport {Tone} />

<div>
  <SeqList {Tone} />
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
