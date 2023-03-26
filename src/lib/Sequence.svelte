<script>
	export let seq;
	export let Tone;

	let color = ColorStore.getNextColor()

	import { onDestroy } from 'svelte';
	import SequenceSteps from './SequenceSteps.svelte';
	import SeqControls from './SeqControls.svelte';
	import { ColorStore } from '../stores/ColorStore';

	onDestroy(() => {
		ColorStore.putColorBack(color);
	});
</script>

<div class="sequence" style="--seq-color: {color}">
	<SeqControls {seq} />
	<SequenceSteps {seq} {Tone} />
</div>

<style>
	div.sequence {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		margin-bottom: 50px;
		width: 100%;
	}

</style>
