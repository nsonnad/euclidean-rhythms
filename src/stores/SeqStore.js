import { writable } from "svelte/store";
import { getPattern } from 'euclidean-rhythms';

function generateRandomSequence() {
  let randVals = [
    Math.ceil(Math.random() * 16),
    Math.ceil(Math.random() * 16)
  ];

  randVals.sort((a, b) => { return a - b; });

  return {
    id: Math.random(),
    pulses: randVals[0],
    steps: randVals[1],
    rotation: 0,
    pattern: getPattern(randVals[0], randVals[1]),
    ticks: 16
  }
}

function newRandomSequence(currentSeqs) {
  return [...currentSeqs, generateRandomSequence()];
}

function createSeqStore() {
  let randomSequence = generateRandomSequence();
  const { subscribe, set, update } = writable([randomSequence]);

  return {
    subscribe,
    set,
    update,
    newRandomSequence: () => update(currentSeqs => newRandomSequence(currentSeqs))
  }
}

export const SeqStore = createSeqStore();
