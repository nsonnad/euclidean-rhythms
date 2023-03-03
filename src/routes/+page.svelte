<script>
	import Sequence from "$lib/Sequence.svelte";
  import { scaleBand, scaleLinear } from "d3-scale";

	let width = 1200;
	let height = 1200;

	let musicalTicks = 128;

	let seqs = [
		{
			id: 1,
			numerator: 4,
			denominator: 4,
			ticks: 16
		},
		{
			id: 2,
			numerator: 4,
			denominator: 4,
			ticks: 16
		}
	];

  $: xScale = scaleLinear()
    .domain([0, musicalTicks])
    .range([0, width]);

  $: yScale = scaleBand()
		.domain(seqs.map((d) => d.id))
    .range([0, height]);
</script>



<svg width={width} height={height}>
	{#each seqs as seq}
		<g transform={`translate(0, ${yScale(seq.id)})`}>
		<Sequence
				xScale={ xScale }
				seq={seq}
				height={height / seqs.length}
		/>
		</g>
	{/each}
</svg>
