<script lang="ts">
  import { Sampler } from "tone";
  import { SeqStore } from "../stores/SeqStore";
  import samplePaths from "../stores/samples";

  export let samplePath;
  export let seqId;
  export let closeSampleBrowser;

  let sampler = new Sampler();

  function generateSampleTree() {
    return samplePaths.reduce(function (obj, path, i) {
      let splitDirFile = path.split("/");

      if (obj.hasOwnProperty(splitDirFile[0])) {
        obj[splitDirFile[0]].push(splitDirFile[1]);
      } else {
        obj[splitDirFile[0]] = [splitDirFile[1]];
      }

      return obj;
    }, {});
  }

  const sampleTree = generateSampleTree();
  const sampleDirs = Object.keys(sampleTree);

  let currentSample = samplePath.split("/");
  let currentDir = currentSample[0];
  let currentFile = currentSample[1];

  function handleUpdateDir(dir) {
    currentDir = dir;
  }

  function handleFileClick(file) {
    currentFile = file;
    sampler.dispose();

    sampler = new Sampler({
      urls: { C3: [currentDir, file].join("/") },
      baseUrl: "/samples/",
      onload: () => {
        sampler.triggerAttackRelease(["C3"], 1);
      },
    }).toDestination();
  }

  function handleLoadSample() {
    SeqStore.update((currentData) => {
      let copiedData = [...currentData];
      let currentSeq = copiedData.find((seqData) => seqData.id == seqId);

      currentSeq.samplePath = [currentDir, currentFile].join("/");
      closeSampleBrowser();
      return copiedData;
    });
  }
</script>

<div class="sample-browser">
  <h2>SAMPLE BROWSER</h2>
  <div class="browser-panes">
    <div class="browser-pane sample-dirs">
      <h4>directory</h4>
      {#each sampleDirs as dir}
        {#if currentDir === dir}
          <button
            class="browser-list current"
            on:click={() => handleUpdateDir(dir)}>{dir}</button
          >
        {:else}
          <button class="browser-list" on:click={() => handleUpdateDir(dir)}
            >{dir}</button
          >
        {/if}
      {/each}
    </div>
    <div class="browser-pane sample-files">
      <h4>sample</h4>
      {#each sampleTree[currentDir] as file}
        {#if currentFile === file}
          <button
            class="browser-list current"
            on:click={() => handleFileClick(file)}>{file}</button
          >
        {:else}
          <button class="browser-list" on:click={() => handleFileClick(file)}
            >{file}</button
          >
        {/if}
      {/each}
    </div>
    <div class="browser-pane sample-controls">
      <button on:click={handleLoadSample}>L O A D</button>
    </div>
  </div>
  <button class="close-browser" on:click={closeSampleBrowser}> X </button>
</div>

<style>
  h2 {
    text-align: center;
  }

  .sample-browser {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 70%;
    height: 60%;
    background-color: hsla(306, 100%, 0%, 0.9);
    border: 1px solid violet;
    overflow: hidden;
  }

  .browser-panes {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    height: 100%;
  }

  .browser-pane {
    border: 1px solid violet;
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    padding: 14px;
  }

  button.browser-list {
    text-align: left;
    display: block;
    color: white;
    border: none;
    background-color: transparent;
    font-family: inherit;
    padding: 4px;
    cursor: pointer;
    width: 100%;
  }

  button.current {
    background-color: green;
  }

  button.close-browser {
    position: absolute;
    font-size: 20px;
    right: -0.5%;
    top: -0.5%;
  }
</style>
