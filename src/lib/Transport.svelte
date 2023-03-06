<script lang="ts">
  export let Tone;

  const handleStartClick = async() => {
    await Tone.start()
    Tone.Transport.start();
  }
</script>

<button on:click={handleStartClick}>play</button>
<button on:click={ () => Tone.Transport.stop() }>stop</button>
