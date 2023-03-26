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

  $: if (started) {
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.swing = swing;
  }

</script>

<div class="transport">
  <button on:click={handleStartClick}>play</button>
  <button on:click={ () => Tone.Transport.stop() }>stop</button>
  <button on:click={ () => Tone.Transport.stop() }>rec</button>
  <div>
    <label for="bpm">BPM {bpm}</label>
    <input name="bpm" type="range" min=20 max=300 bind:value={bpm}>
  </div>
  <div>
    <label for="bpm">Swing {swing}</label>
    <input name="bpm" type="range" min=0 max=1 step=0.01 bind:value={swing}>
  </div>
</div>

<style>
  div.transport {
    text-align: center;
    margin-bottom: 50px;
  }
</style>
