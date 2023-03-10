<script lang="ts">
  import { getPattern } from 'euclidean-rhythms';
  import { SeqStore } from '../stores/SeqStore';
  import type SequenceType from '../stores/SeqenceType';
  import samplePaths from '../stores/samples';
  import Knob from './Knob.svelte';

  export let seq: SequenceType;

  function handleDeleteSeq(id: number) {
    SeqStore.update(currentData => {
      return currentData.filter(d => d.id !== id);
    })
  }

  function handleUpdateParam(e, id: number, param: string) {
    SeqStore.update(currentData => {
      let copiedData = [...currentData];
      let currentSeq = copiedData.find(seq => seq.id == id)

      currentSeq[param as keyof SequenceType] = parseInt(e.target.value);
      currentSeq.pattern = getPattern(currentSeq.pulses, currentSeq.steps)

      return copiedData;
    })
  }

  function handleUpdateSample(e, id: number, param: string) {
    SeqStore.update(currentData => {
      let copiedData = [...currentData];
      let currentSeq = copiedData.find(seq => seq.id == id)

      currentSeq.sample[param] = e.target.value;
      return copiedData;
    });
  }

  function handleUpdateKnob(msg) {
    SeqStore.update(currentData => {
      let copiedData = [...currentData];
      let currentSeq = copiedData.find(seqData => seqData.id == seq.id)

      currentSeq.sample[msg.detail.param] = msg.detail.value;
      return copiedData;
    });
  }
</script>

<div class="seq-controls">

  <div class="seq-controls-sequence">
    <div class="ui-item">
      <label for="pulses">Pulses: {seq.pulses}</label>
      <input on:input={e => handleUpdateParam(e, seq.id, "pulses")}
             name="pulses"
             type=range
             min=1
             max={seq.steps}
             value={seq.pulses}
             >
    </div>

    <div class="ui-item">
      <label for="steps"> Steps: {seq.steps} </label>
      <input on:input={e => handleUpdateParam(e, seq.id, "steps")}
             name="steps"
             type=range
             min={seq.pulses}
             max=16
             value={seq.steps}
             >
    </div>

    <div class="ui-item">
      <label for="rotation"> Rotation </label>
      <input on:input={e => handleUpdateParam(e, seq.id, "rotation")}
             name="rotation"
             type=range
             min=0
             max={seq.steps}
             value={seq.rotation}
             >
    </div>
  </div>

  <div class="seq-controls-sample">

    <div class="ui-item">
      <label for="sample"> Sample </label>
      <select value={seq.sample.path} name="sample" on:change={e => handleUpdateSample(e, seq.id, "path")}>
        {#each samplePaths as sample}
          <option value="{sample}">{sample}</option>
        {/each}
      </select>
    </div>

    <div class="ui-item">
      <label for="volume"> Level </label>
      <Knob on:updateParam={handleUpdateKnob}
             name="volume"
             steps=35
             min=-60
             max=10
             value={seq.sample.volume}
             />
    </div>

    <div class="ui-item">
      <label for="pitch"> Pitch </label>
      <input on:input={e => handleUpdateSample(e, seq.id, "pitch")}
             name="pitch"
             type=range
             min=24
             max=72
             step=1
             value={seq.sample.pitch}
             >
    </div>

    <div class="ui-item">
      <label for="rotation"> Attack </label>
      <input on:input={e => handleUpdateSample(e, seq.id, "attack")}
             name="attack"
             type=range
             min=0
             max=1
             step=0.01
             value={seq.sample.attack}
             >
    </div>

    <div class="ui-item">
      <label for="rotation"> Release </label>
      <input on:input={e => handleUpdateSample(e, seq.id, "release")}
             name="release"
             type=range
             min=0
             max=1
             step=0.01
             value={seq.sample.release}
             >
    </div>
  </div>

  <div class="ui-item">
    <button on:click={e => handleDeleteSeq(seq.id)}>X</button>
  </div>

</div>

<style>

  div.seq-controls {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 14px;
  }

  div.seq-controls-sequence {
    display: flex;
  }

  div.seq-controls-sample {
    display: flex;
  }

  div.ui-item {
    flex-direction: row;
    padding: 0px 6px;
  }

  div.ui-item label, div.ui-item input {
    display: block;
  }

  input {
    max-width: 80px;
    padding: 10px;
    margin: 0;
    box-sizing: border-box;
    background-color: #1f1f1f;
    color: darkgray;
    border: 0;
  }

</style>
