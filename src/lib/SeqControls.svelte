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

  function handleUpdateParam(e, param) {
    SeqStore.update(currentData => {
      let copiedData = [...currentData];
      let currentSeq = copiedData.find(seqData => seqData.id == seq.id)

      currentSeq[param] = e.target.value;
      currentSeq.pattern = getPattern(currentSeq.pulses, currentSeq.steps)

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
</script>

<div class="seq-controls">

  <div class="seq-controls-sequence">
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

  <div class="seq-controls-sample">

    <div class="ui-item">
      <label for="sample"> Sample </label>
      <select value={seq.samplePath} name="sample" on:change={e => handleUpdateParam(e, "samplePath")}>
        {#each samplePaths as sample}
          <option value="{sample}">{sample}</option>
        {/each}
      </select>
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
