// Procedurally generated sound effects — no files needed

export function playGoodOmen() {
  try {
    const ctx = new AudioContext();

    // Bright ascending arpeggio: C5 → E5 → G5 → C6
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.value = freq;

      const t = ctx.currentTime + i * 0.13;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

      osc.start(t);
      osc.stop(t + 0.9);
    });

    setTimeout(() => ctx.close(), 2500);
  } catch {
    // Browser blocked audio — no-op
  }
}

export function playBadOmen() {
  try {
    const ctx = new AudioContext();

    // Deep bass rumble that drops in pitch
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    bass.type = "sawtooth";
    bass.frequency.setValueAtTime(95, ctx.currentTime);
    bass.frequency.linearRampToValueAtTime(28, ctx.currentTime + 2.2);
    bassGain.gain.setValueAtTime(0, ctx.currentTime);
    bassGain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 0.04);
    bassGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.2);
    bass.start(ctx.currentTime);
    bass.stop(ctx.currentTime + 2.2);

    // Sharp metallic sting at the start
    const sting = ctx.createOscillator();
    const stingGain = ctx.createGain();
    sting.connect(stingGain);
    stingGain.connect(ctx.destination);
    sting.type = "square";
    sting.frequency.setValueAtTime(240, ctx.currentTime);
    sting.frequency.exponentialRampToValueAtTime(48, ctx.currentTime + 0.45);
    stingGain.gain.setValueAtTime(0.38, ctx.currentTime);
    stingGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.45);
    sting.start(ctx.currentTime);
    sting.stop(ctx.currentTime + 0.45);

    setTimeout(() => ctx.close(), 3500);
  } catch {
    // Browser blocked audio — no-op
  }
}
