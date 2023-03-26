<script lang="ts">
  export let Tone;
  let started = false;
  let bpm = 120;

  const handleStartClick = async() => {
    started = true;
    await Tone.start()
    Tone.Transport.start("+0.1");
  }

  $: if (started) Tone.Transport.bpm.value = bpm;

</script>

<div class="transport">
  <button on:click={handleStartClick}>play</button>
  <button on:click={ () => Tone.Transport.stop() }>stop</button>
  <button on:click={ () => Tone.Transport.stop() }>rec</button>
  <div>
    <label for="bpm">BPM {bpm}</label>
    <input name="bpm" type="range" min=20 max=300 bind:value={bpm}>
  </div>
</div>

<style>
  div.transport {
    text-align: center;
    margin-bottom: 50px;
  }
</style>
