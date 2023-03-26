<script lang="ts">
  import { SeqStore } from '../stores/SeqStore';
  import type SequenceType from '../stores/SeqenceType';
  import samplePaths from '../stores/samples';
  import presets from '../stores/presets';
  import Knob from './Knob.svelte';
  import SampleBrowser from './SampleBrowser.svelte';

  export let seq: SequenceType;

  let preset;

  function handleDeleteSeq(id: number) {
    SeqStore.update(currentData => {
      return currentData.filter(d => d.id !== id);
    })
  }

  function handleToggleMute(id: number) {
    SeqStore.update(currentData => {
      let copiedData = [...currentData];
      let currentSeq = copiedData.find(seqData => seqData.id == seq.id)

      currentSeq.mute = !currentSeq.mute
      return copiedData;
    })
  }

  function handleUpdateParam(e, param) {
    SeqStore.update(currentData => {
      let copiedData = [...currentData];
      let currentSeq = copiedData.find(seqData => seqData.id == seq.id)

      currentSeq[param] = e.target.value;
      return copiedData;
    })
  }

  function handleUpdateKnob(msg) {
    SeqStore.update(currentData => {
      let copiedData = [...currentData];
      let currentSeq = copiedData.find(seqData => seqData.id == seq.id)

      currentSeq[msg.detail.param] = msg.detail.value;
      return copiedData;
    });
  }

  // TODO
  function handlePreset(newPreset) {
    preset = newPreset;
  }
</script>

<div class="seq-controls">

  <div class="seq-controls-sample control-board">

    <div class="ui-item">
      <button>LOAD SAMPLE BROWSER</button>
    </div>

    <div class="ui-item">
      <label for="volume"> Level </label>
      <Knob on:updateParam={handleUpdateKnob}
             name="volume"
             step=2
             min=-60
             max=10
             value={seq.volume}
             />
    </div>

    <div class="ui-item">
      <label for="pitch"> Pitch </label>
      <Knob on:updateParam={handleUpdateKnob}
             name="pitch"
             step=1
             min=24
             max=72
             value={seq.pitch}
             />
    </div>

    <div class="ui-item">
      <label for="pan"> Pan </label>
      <Knob on:updateParam={handleUpdateKnob}
             name="pan"
             step=0.01
             min=-1
             max=1
             value={seq.pan}
             />
    </div>

    <div class="ui-item">
      <label for="rotation"> Attack </label>
      <Knob on:updateParam={handleUpdateKnob}
             name="attack"
             min=0
             max=1
             step=0.01
             value={seq.attack}
             />
    </div>

    <div class="ui-item">
      <label for="rotation"> Release </label>
      <Knob on:updateParam={handleUpdateKnob}
             name="release"
             min=0
             max=1
             step=0.01
             value={seq.release}
             />
    </div>
  </div>

  <div class="seq-controls-sequence control-board">

    <div class="ui-item">
      <label for="sample"> Sequence </label>
      <select value={preset} name="preset" on:change={handlePreset}>
        {#each presets as preset}
          <option value="{preset.name}">{preset.name}</option>
        {/each}
      </select>
    </div>

    <div class="ui-item">
      <label for="pulses">Pulses</label>
      <Knob on:updateParam={handleUpdateKnob}
             name="pulses"
             min=1
             step=1
             max={seq.steps}
             value={seq.pulses}
             />
    </div>

    <div class="ui-item">
      <label for="steps"> Steps</label>
      <Knob on:updateParam={handleUpdateKnob}
             name="steps"
             min={seq.pulses}
             max=16
             step=1
             value={seq.steps}
             />
    </div>

    <div class="ui-item">
      <label for="rotation"> Rotation </label>
      <Knob on:updateParam={handleUpdateKnob}
             name="rotation"
             step=1
             min=0
             max={seq.steps}
             value={seq.rotation}
             />
    </div>
  </div>


  <div class="ui-item">
    <button class="delete-sequence ui-button" on:click={e => handleDeleteSeq(seq.id)}>X</button>
    {#if seq.mute}
      <button class="mute-sequence ui-button muted" on:click={e => handleToggleMute(seq.id)}>M</button>
    {:else}
      <button class="mute-sequence ui-button" on:click={e => handleToggleMute(seq.id)}>M</button>
    {/if}
  </div>

  <SampleBrowser seqId={seq.id} samplePath={seq.samplePath} />

</div>

<style>

  div.seq-controls {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 14px;
    gap: 10px;
  }

  div.seq-controls-sequence {
    display: flex;
  }

  div.control-board {
    border: 1px solid var(--seq-color);
    padding: 10px;
    border-radius: 5px;
    box-shadow: 2px 2px var(--seq-color);
  }

  div.seq-controls-sample {
    display: flex;
  }

  div.ui-item {
    display: flex;
    flex-direction: column;
    padding: 0px 6px;
  }

  div.ui-item label {
    display: block;
    margin-bottom: 8px;
  }

  div.ui-item select {
    width: 200px;
    height: 40px;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #999;
    font-size: 18px;
    font-family: monospace;
    color: gray;
    background-color: black;
  }

  button.ui-button {
    background-color: black; /* Green */
    border: none;
    color: white;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
  }

  button.delete-sequence:hover {
    background-color: darkred;
  }

  button.mute-sequence:hover {
    background-color: goldenrod;
  }

  button.muted {
    background-color: goldenrod;
  }
</style>
