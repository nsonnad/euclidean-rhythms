<script lang="ts">
  import { getPattern } from 'euclidean-rhythms';
  import { SeqStore } from '../stores/SeqStore';
  import type SequenceType from '../stores/SeqenceType';

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
      let newVal = parseInt(e.target.value);

      currentSeq[param as keyof SequenceType] = newVal;
      currentSeq.pattern = getPattern(currentSeq.pulses, currentSeq.steps)

      return copiedData;
    })
  }
</script>

<div class="seq-controls">

  <div class="ui-item">
    <label for="pulses">Pulses: {seq.pulses} / {seq.steps} </label>
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

  <div class="ui-item">
    <button on:click={e => handleDeleteSeq(seq.id)}>X</button>
  </div>
</div>

<style>

  div.seq-controls {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    margin-bottom: 14px;
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
