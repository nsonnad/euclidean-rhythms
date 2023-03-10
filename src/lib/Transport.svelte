<script lang="ts">
  export let Tone;

  const handleStartClick = async() => {
    await Tone.start()
    Tone.Transport.start("+0.1");
  }
</script>

<div class="transport">
  <button on:click={handleStartClick}>play</button>
  <button on:click={ () => Tone.Transport.stop() }>stop</button>
  <button on:click={ () => Tone.Transport.stop() }>rec</button>
</div>

<style>
  div.transport {
    text-align: center;
    margin-bottom: 50px;
  }
</style>
