// Procedural radio atmosphere for "The Last Hours" — Web Audio API, no assets, no fetch.
//
// It synthesizes the *sound of the listening watch* on July 2, 1937:
//   • band-passed static hiss (the open channel, kept low — a noise floor that slowly breathes
//     up and down, the way a fading signal made the background swell), and
//   • the Itasca's Morse homing signal — the letter "A" (· —) keyed on 7500 kHz in slow bursts,
//     a few sends and then a long wait, which Earhart asked for and reported hearing.
//
// Her own transmissions were VOICE, not Morse, and are never reconstructed here. The only tone
// in the mix is the cutter's homing code — exactly what was actually keyed that morning. (An
// earlier version added a continuous heterodyne carrier; it produced a musical beat that didn't
// fit the scene, so it was removed.)

export interface RadioAudio {
  /** Create/resume the AudioContext. Must be called from a user gesture. */
  enable: () => void
  setEnabled: (on: boolean) => void
  /** strength 1–5 cleans the static and brings the homing code up; null = bare, distant watch. */
  setLevel: (strength: number | null) => void
  silence: () => void
  dispose: () => void
}

// Morse keying. Slow fist: dit = 1 unit, dah = 3, intra-character gap = 1, inter-character = 3.
const UNIT_MS = 165

// One homing cycle: send the letter "A" three times, then a long wait — send, send, send … wait.
function buildMorseCycle(): Array<{ on: boolean; units: number }> {
  const seq: Array<{ on: boolean; units: number }> = []
  const A: Array<[boolean, number]> = [
    [true, 1], // dit
    [false, 1],
    [true, 3], // dah
  ]
  const SENDS = 3
  for (let i = 0; i < SENDS; i++) {
    for (const [on, units] of A) seq.push({ on, units })
    seq.push({ on: false, units: i < SENDS - 1 ? 3 : 34 }) // letter gap, then a long wait
  }
  return seq
}
const MORSE_CYCLE = buildMorseCycle()

export function createRadioAudio(): RadioAudio {
  let ctx: AudioContext | null = null
  let master: GainNode | null = null
  let staticGain: GainNode | null = null
  let morseGain: GainNode | null = null
  let noiseSrc: AudioBufferSourceNode | null = null
  let morseOsc: OscillatorNode | null = null
  // Slow drift LFO → makes the static noise floor breathe up and down (fading-signal feel).
  let lfo: OscillatorNode | null = null
  let lfoStaticDepth: GainNode | null = null
  let enabled = false
  let started = false

  let morseTarget = 0 // gain applied on "key down"
  let morseTimer: number | null = null
  let morseStep = 0

  const ensure = () => {
    if (ctx) return
    const AC: typeof AudioContext | undefined =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return
    ctx = new AC()

    master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    // Static: 2s of white noise looped, band-passed to a soft radio-ish hiss.
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    noiseSrc = ctx.createBufferSource()
    noiseSrc.buffer = buffer
    noiseSrc.loop = true
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 1500
    bp.Q.value = 0.6
    staticGain = ctx.createGain()
    staticGain.gain.value = 0
    noiseSrc.connect(bp)
    bp.connect(staticGain)
    staticGain.connect(master)

    // Morse homing tone: a single clean CW pitch, keyed by the scheduler below.
    morseOsc = ctx.createOscillator()
    morseOsc.type = 'sine'
    morseOsc.frequency.value = 600
    morseGain = ctx.createGain()
    morseGain.gain.value = 0
    morseOsc.connect(morseGain)
    morseGain.connect(master)

    // Drift LFO: slow (~14s period), gently swelling and receding the static.
    lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.07
    lfoStaticDepth = ctx.createGain()
    lfoStaticDepth.gain.value = 0
    lfo.connect(lfoStaticDepth)
    lfoStaticDepth.connect(staticGain.gain)
  }

  const runMorse = () => {
    if (!ctx || !morseGain) return
    const tok = MORSE_CYCLE[morseStep % MORSE_CYCLE.length]
    morseStep++
    const t = ctx.currentTime
    // Soft ramps on each edge so the keying doesn't click.
    morseGain.gain.setTargetAtTime(tok.on ? morseTarget : 0, t, 0.008)
    morseTimer = window.setTimeout(runMorse, tok.units * UNIT_MS)
  }

  const startNodes = () => {
    if (started || !noiseSrc || !morseOsc || !lfo) return
    noiseSrc.start()
    morseOsc.start()
    lfo.start()
    started = true
    if (morseTimer == null) runMorse()
  }

  const apply = (staticV: number, masterV: number, morseV: number) => {
    if (!ctx || !master || !staticGain || !lfoStaticDepth) return
    const t = ctx.currentTime
    master.gain.setTargetAtTime(masterV, t, 0.15)
    staticGain.gain.setTargetAtTime(staticV, t, 0.3)
    lfoStaticDepth.gain.setTargetAtTime(staticV * 0.5, t, 0.4) // breathe ±half the floor
    morseTarget = morseV // picked up on the next key-down
  }

  const wake = () => {
    ensure()
    if (ctx && ctx.state === 'suspended') void ctx.resume()
    startNodes()
  }

  return {
    enable() {
      wake()
    },
    setEnabled(on: boolean) {
      enabled = on
      if (on) wake()
      else apply(0, 0, 0)
    },
    setLevel(strength) {
      if (!enabled) return
      wake()
      if (strength == null) {
        // Bare watch: a faint open-channel hiss and the distant homing code.
        apply(0.06, 0.22, 0.04)
        return
      }
      const s = Math.max(0, Math.min(5, strength)) / 5
      const staticV = 0.012 + 0.075 * (1 - s) // strong signal → clean; floor kept very low
      const morseV = 0.03 + 0.03 * s // homing code, a touch louder up close
      apply(staticV, 0.25, morseV)
    },
    silence() {
      apply(0, 0, 0)
    },
    dispose() {
      if (morseTimer != null) {
        window.clearTimeout(morseTimer)
        morseTimer = null
      }
      try {
        noiseSrc?.stop()
        morseOsc?.stop()
        lfo?.stop()
      } catch {
        /* already stopped */
      }
      void ctx?.close()
      ctx = null
      started = false
    },
  }
}
