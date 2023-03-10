type SequenceType = {
  id: number,
  pulses: number,
  steps: number,
  rotation: number,
  sample: {
    path: string,
    pitch: number,
    volume: number,
    attack: number,
    release: number
  },
  pattern: number[]
}

export default SequenceType;
