<script lang="ts">
	import { Sampler } from 'tone';
  import samplePaths from '../stores/samples';
	export let samplePath;
	export let seqId;

	function generateSampleTree() {
		return samplePaths.reduce(function(obj, path, i) {
			let splitDirFile = path.split('/')

			if (obj.hasOwnProperty(splitDirFile[0])) {
				obj[splitDirFile[0]].push(splitDirFile[1])
			} else {
				obj[splitDirFile[0]] = [splitDirFile[1]]
			}

      return obj;
		}, {})
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

    let sampler = new Sampler({
      urls: { C3: [currentDir, file].join("/") },
			baseUrl: "/samples/",
			onload: () => {
				sampler.triggerAttackRelease(["C3"], 1);
			}
    }).toDestination();
	}

	function handleLoadSample() {

	}
</script>

<div class="sample-browser">
	<div class="sample-dirs">
		{#each sampleDirs as dir}
			{#if currentDir === dir}
				<button class="browser-list current" on:click={() => handleUpdateDir(dir)}>{dir}</button>
			{:else}
				<button class="browser-list" on:click={() => handleUpdateDir(dir)}>{dir}</button>
			{/if}
		{/each}
	</div>
	<div class="sample-files">
		<ul>
			{#each sampleTree[currentDir] as file}
				{#if currentFile === file}
					<button class="browser-list current" on:click={() => handleFileClick(file)}>{file}</button>
				{:else}
					<button class="browser-list" on:click={() => handleFileClick(file)}>{file}</button>
				{/if}
			{/each}
		</ul>
	</div>
	<div class="sample-controls">
		<button>L O A D</button>
	</div>
</div>

<style>
	.sample-browser {
		top: 10%;
		position: absolute;
		width: 80%;
		height: 80%;
		background-color: black;
		display: flex;
		flex-direction: row;
		flex-grow: 1;
	}

	.browser-list {
		display: block;
	}

	.current {
		background-color: green;
	}
</style>
