<script lang="ts">
  import presets from "../stores/presets";
  import { clickOutside } from "../util/util";
  import { SeqStore } from "../stores/SeqStore";

  export let seqId;
  export let closePresetBrowser;

  function handlePreset(preset) {
    SeqStore.update((currentData) => {
      let copiedData = [...currentData];
      let currentSeq = copiedData.find((seqData) => seqData.id == seqId);

      currentSeq.pulses = preset.pulses;
      currentSeq.steps = preset.steps;
      closePresetBrowser();
      return copiedData;
    });
  }

</script>

<div class="preset-browser" use:clickOutside={closePresetBrowser}>
  <h2>RHYTHM PRESETS</h2>
  <div class="presets">
    {#each presets as preset}
      <div class="preset">
        <button class="preset-btn" on:click={() => handlePreset(preset)}>
          ({preset.pulses}, {preset.steps})
        </button>
        <p class="preset-description">{preset.description}</p>
      </div>
    {/each}
  </div>

  <p>
    Note: These patterns and descriptions come from the paper <a
      href="http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf"
      >"The Euclidean Algorithm Generates Traditional Musical Rhythms"</a
    > by Godfried Toussaint. All credit to the researcher for this information. Please
    see the paper for more and for sources/background as to the rhythmic patterns
    described.
  </p>
</div>

<style>
  .preset-browser {
    position: fixed;
    font-size: 1rem;
    font-family: sans-serif;
    text-align: center;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 70%;
    height: 60%;
    background-color: hsla(306, 100%, 0%, 0.99);
    border: 1px solid violet;
    overflow: scroll;
    overflow-x: hidden;
    padding: 20px;
  }

  .presets {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .preset {
    border-bottom: 1px solid gray;
  }

  h2 {
    margin-bottom: 30px;
  }

  p.preset-description {
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  button.preset-btn {
    background-color: black; /* Green */
    border: 1px solid violet;
    color: white;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 2px;
  }

  button.preset-btn:hover {
    background-color: violet; /* Green */
  }
</style>
