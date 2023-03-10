<!-- adapted from https://svelte.dev/repl/fde0668b207045fa992fc04941b9508d?version=3.29.6 -->
<script>
	import {createEventDispatcher} from "svelte";

	const dispatch = createEventDispatcher();

	export let value, min, max, name;
	export let rotRange = 2 * Math.PI * 0.83;
	export let pixelRange = 200;
	export let startRotation = -Math.PI * 0.83;

	let startY, startValue;
	$: valueRange = max - min;
	$: rotation = startRotation + (value - min) / valueRange * rotRange;


	// prevent draggin from selecting text
	function unFocus() {
		if (document.selection) {
			document.selection.empty()
		} else {
			window.getSelection().removeAllRanges()
		}
	}

	function clamp(num, min, max) {
		return Math.max(min, Math.min(num, max));
	}

	function pointerMove({ clientY }) {
		console.log(rotation)
		unFocus();
		const valueDiff = valueRange * (clientY - startY) / pixelRange;
		let newValue = clamp(startValue - valueDiff, min, max)

		dispatch('updateParam', {
			param: name,
			value: newValue
		});
	}

	function pointerDown({ clientY }) {
		startY = clientY;
		startValue = value;
		window.addEventListener('pointermove', pointerMove);
		window.addEventListener('pointerup', pointerUp);
	}

	function pointerUp() {
		window.removeEventListener('pointermove', pointerMove);
		window.removeEventListener('pointerup', pointerUp);
	}
</script>

<div class="knob" style="--rotation: {rotation}" on:pointerdown={pointerDown}>
  <div class="knob-inner"></div>
</div>

<style>

.knob {
	position: relative;
	display: block;
	min-width: 50px;
	min-height: 50px;
	padding: 0;
	border-radius: 50%;
	border: 1px solid white;
	/** transform-origin: 50% 50%; **/
}

.knob-inner {
	height: 50%;
	width: 4%;
	position: absolute;
	top: 50%;
	left: 50%;
	background-color: white;
	transform: translate(-50%, -50%) rotate(calc(var(--rotation) * 1rad)) translate(0, -50%);
}
</style>

