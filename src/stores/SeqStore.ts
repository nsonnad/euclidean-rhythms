import { writable } from "svelte/store";
import { getPattern } from 'euclidean-rhythms';
import type SequenceType from './SeqenceType';

const synthTypes = ["sine", "triangle", "sawtooth", "square"];

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
    sound: synthTypes[Math.floor(Math.random()*synthTypes.length)],
    pattern: getPattern(randVals[0], randVals[1])
  }
}

function newRandomSequence(currentSeqs: SequenceType[]) {
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
