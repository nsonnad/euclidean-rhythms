<script>
  import { beforeNavigate } from "$app/navigation";
  import { clickOutside } from "../util/util";

  export let toggleUserManual;
</script>

<div use:clickOutside={toggleUserManual} class="user-manual">
  <h2>euclidean rhythm generator: how to use</h2>
  <p>
    This page is a sampler that allows you to create up to 6 simultaneously
    running Euclidean rhythms. You can <a
      target="blank"
      href="https://en.wikipedia.org/wiki/Euclidean_rhythm">read more</a
    > about what Euclidean rhythms are, but you'll probably get a better understanding
    of them by just using this tool.
  </p>
  <p>
    The quick version is that a Euclidean rhythm is made up of a number of
    rhythmic "hits" (or "pulses") that are as evenly distributed as possible
    over a number of "steps". So for example, given 3 pulses and 8 steps, the
    resulting rhythm would be:
  </p>

  <pre>X . . X . . X .</pre>

  <p>Where X is a hit and . is no hit.</p>

  <h3>global controls</h3>
  <p>
    Should be pretty straightforward. Sliders to adjust tempo and swing amount.
    Play/pause button.
  </p>

  <h3>adding and removing sequences</h3>
  <p>
    As I said, this tool alows you to make up to 6 Euclidean sequences. You can
    add sequences by clicking the "+ add sequence" button and remove them by
    clicking the X on the top-right of each sequence. When you click "+ add
    sequence", a random sequence will be created.
  </p>

  <h3>editing a sequence</h3>
  <p>The following can be changed in a given sequence:</p>

  <ul>
    <li>
      Sample: Which sample is being used. Click the current sample to open the
      sample browser.
    </li>
    <li>Sample level (volume), pitch, pan, attack, and release</li>
    <li>
      Sequence: Number of pulses and steps as described above, and the
      "rotation" i.e. starting point of the first pulse. Click "LOAD PRESET" to
      open the Eucldiean sequence preset browser.
    </li>
  </ul>

  <h3>recording audio output</h3>
  <p>
    Adding a record and download feature is on the <a
      target="_blank"
      href="https://github.com/nsonnad/euclidean-rhythms/blob/main/README.md"
      >to-do list</a
    > for this project.
  </p>
  <p>
    For now, however, you can without too much trouble set up any recording
    software on your computer, like a DAW, to record the audio coming from your
    browser. How exactly to do this will be platform dependent so I can't really
    comprehensively explain it here. But it should be easy enough to figure out
    by looking up articles/videos/etc. Some options I'm aware of are <a
      target="_blank"
      href="https://existential.audio/blackhole/">BlackHole</a
    >
    on Mac and
    <a target="_blank" href="https://vb-audio.com/Cable/">VB Cable></a> for Windows.
    Linux users I assume can figure this out :)
  </p>

  <h3>♥ donate ♥</h3>
  <p>
    If you find this useful/fun/interesting, please consider donating to me (I'm
    a broke artist).
  </p>
</div>

<style>
  div.user-manual {
    position: fixed;
    font-size: 1rem;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 70%;
    height: 90%;
    background-color: hsla(306, 100%, 0%, 0.99);
    border: 1px solid violet;
    overflow: scroll;
    overflow-x: hidden;
    padding: 20px;
    z-index: 50;
  }

  .user-manual p,
  li {
    font-family: sans-serif;
  }
</style>
