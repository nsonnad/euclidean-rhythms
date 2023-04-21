<script lang="ts">
  export let Tone;
  let started = false;
  let bpm = 120;
  let swing = 0;

  const handleStartClick = async() => {
    started = true;
    await Tone.start()
    Tone.Transport.start("+0.1");
    Tone.Transport.swingSubdivision = "16n"
  }

  function handleStopClick() {
    started = false;
    Tone.Transport.stop()
  }

  $: if (started) {
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.swing = swing;
  }

</script>

<div class="transport">
  <div class="global-settings">
    <h3>tempo parameters:</h3>
    <div>
      <label for="bpm">BPM {bpm}</label><br />
      <input name="bpm" type="range" min=20 max=300 bind:value={bpm}>
    </div>
    <div>
      <label for="bpm">Swing {swing}</label><br />
      <input name="bpm" type="range" min=0 max=1 step=0.01 bind:value={swing}>
    </div>
  </div>

  <div class="play">
    {#if started}
      <button class="btn-play playing" on:click={handleStopClick}>pause</button>
    {:else}
      <button class="btn-play" on:click={handleStartClick}>play</button>
    {/if}
  </div>

</div>

<style>
  div.transport {
    text-align: center;
    margin-bottom: 20px;
  }

  div.global-settings {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }

  button.btn-play {
    background-color: black;
    cursor: pointer;
    border-radius: 2px;
    border: 2px solid gray;
    color: white;
    font-family: monospace;
    font-size: 1.2rem;
    padding: 10px 20px;
  }
</style>
