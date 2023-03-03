<script>
  export let xScale;
  export let seq;
  export let height;
</script>

<line x1="0" x2="{xScale.range()[1]}"></line>

<style>
  line {
    stroke-width: 1px;
    stroke: black;
  }
</style>
