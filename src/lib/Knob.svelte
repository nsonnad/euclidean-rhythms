<!-- adapted from https://svelte.dev/repl/fde0668b207045fa992fc04941b9508d?version=3.29.6 -->
<script>
	import {createEventDispatcher} from "svelte";

	const dispatch = createEventDispatcher();

	export let value, min, max, name, steps;
	export let rotRange = 2 * Math.PI * 0.83;
	export let pixelRange = 200;
	export let startRotation = -Math.PI * 0.83;

	let startY, startValue;
	$: valueRange = max - min;
	$: rotation = startRotation + (value - min) / valueRange * rotRange;
	$: stepSize = valueRange / steps;

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
		unFocus();
		const valueDiff = valueRange * (clientY - startY) / pixelRange;
		let newValue = clamp(startValue - valueDiff, min, max)
		let normalizedValue = closestNumber(newValue, stepSize);
		console.log(normalizedValue);

		dispatch('updateParam', {
			param: name,
			value: normalizedValue
		});
	}

	// find the number closest to N and divisible by Midi,
	// allows setting `steps` for coarser control (better perf)
	function closestNumber(n, m) {
		// find the quotient
		let q = parseInt(n / m);

		// 1st possible closest number
		let n1 = m * q;

		// 2nd possible closest number
		let n2 = (n * m) > 0 ?
				(m * (q + 1)) : (m * (q - 1));

		// if true, then n1 is the
		// required closest number
		if (Math.abs(n - n1) < Math.abs(n - n2))
				return n1;

		// else n2 is the required
		// closest number
		return n2;
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

