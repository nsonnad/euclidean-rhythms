<script lang="ts">
  import * as Tone from "tone";
  import SeqList from "$lib/SeqList.svelte";
  import GlobalControls from "$lib/GlobalControls.svelte";

  import UserManual from "$lib/UserManual.svelte";
  let showUserManual = false;

  function toggleUserManual() {
    showUserManual = !showUserManual;
  }
</script>

<div class="top">
  <h1>euclidean rhythm generator</h1>
  <h3>by <a target="_blank" href="https://otherdimensional.club">khila</a></h3>
  <h2 class="manual" on:click={toggleUserManual}>user manual</h2>
</div>

{#if showUserManual}
  <UserManual {toggleUserManual} />
{/if}

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

  h2.manual {
    text-decoration: underline;
    cursor: pointer;
  }

  div.top {
    text-align: center;
    margin-bottom: 40px;
  }
</style>
