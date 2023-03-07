<script lang="ts">
  import { getPattern } from 'euclidean-rhythms';
  import { SeqStore } from '../stores/SeqStore';

  export let seq;

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
    <label for="pulses">Pulses </label>
    <input on:change={e => handleUpdateParam(e, seq.id, "pulses")}
           name="pulses"
           type=number
           min=1
           max={seq.steps}
           value={seq.pulses}
           >
  </div>

  <div class="ui-item">
    <label for="steps"> Steps </label>
    <input on:change={e => handleUpdateParam(e, seq.id, "steps")}
           name="steps"
           type=number
           min={seq.pulses}
           max=32
           value={seq.steps}
           >
  </div>

  <div class="ui-item">
    <label for="rotation"> Rotation </label>
    <input on:change={e => handleUpdateParam(e, seq.id, "rotation")}
           name="rotation"
           type=number
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
    background-color: lightgray;
    border: 0;
  }

</style>
