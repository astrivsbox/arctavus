// Procedurally generated sound effects — no files needed

export function playGoodOmen() {
  try {
    const ctx = new AudioContext();

    // Sharp sword ping — high crisp transient
    const ping = ctx.createOscillator();
    const pingGain = ctx.createGain();
    ping.connect(pingGain);
    pingGain.connect(ctx.destination);
    ping.type = "sine";
    ping.frequency.value = 2200;
    pingGain.gain.setValueAtTime(0.10, ctx.currentTime);
    pingGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
    ping.start(ctx.currentTime);
    ping.stop(ctx.currentTime + 1.4);

    // Heavenly shimmer — staggered high harmonics fading slowly
    [1047, 1319, 1568, 2093].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.07;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 3.0);
      osc.start(t);
      osc.stop(t + 3.0);
    });

    // Warm body underneath to lift it
    const warm = ctx.createOscillator();
    const warmGain = ctx.createGain();
    warm.connect(warmGain);
    warmGain.connect(ctx.destination);
    warm.type = "sine";
    warm.frequency.value = 392; // G4
    warmGain.gain.setValueAtTime(0, ctx.currentTime);
    warmGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1);
    warmGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);
    warm.start(ctx.currentTime);
    warm.stop(ctx.currentTime + 2.2);

    setTimeout(() => ctx.close(), 4500);
  } catch {
    // Browser blocked audio — no-op
  }
}

export function playBadOmen() {
  try {
    const ctx = new AudioContext();

    // Heavy slam — fast attack, pitch drops like something massive hitting stone
    const slam = ctx.createOscillator();
    const slamGain = ctx.createGain();
    slam.connect(slamGain);
    slamGain.connect(ctx.destination);
    slam.type = "sine";
    slam.frequency.setValueAtTime(110, ctx.currentTime);
    slam.frequency.exponentialRampToValueAtTime(28, ctx.currentTime + 0.55);
    slamGain.gain.setValueAtTime(0, ctx.currentTime);
    slamGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.008); // brutal fast attack
    slamGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    slam.start(ctx.currentTime);
    slam.stop(ctx.currentTime + 0.6);

    // Low sub rumble that decays — the aftershock
    const rumble = ctx.createOscillator();
    const rumbleGain = ctx.createGain();
    rumble.connect(rumbleGain);
    rumbleGain.connect(ctx.destination);
    rumble.type = "sawtooth";
    rumble.frequency.setValueAtTime(40, ctx.currentTime + 0.05);
    rumble.frequency.linearRampToValueAtTime(18, ctx.currentTime + 2.2);
    rumbleGain.gain.setValueAtTime(0, ctx.currentTime);
    rumbleGain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.12);
    rumbleGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.2);
    rumble.start(ctx.currentTime);
    rumble.stop(ctx.currentTime + 2.2);

    // Brief metallic clang — the iron texture
    const clang = ctx.createOscillator();
    const clangGain = ctx.createGain();
    clang.connect(clangGain);
    clangGain.connect(ctx.destination);
    clang.type = "square";
    clang.frequency.setValueAtTime(160, ctx.currentTime);
    clang.frequency.linearRampToValueAtTime(55, ctx.currentTime + 0.3);
    clangGain.gain.setValueAtTime(0.13, ctx.currentTime);
    clangGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    clang.start(ctx.currentTime);
    clang.stop(ctx.currentTime + 0.3);

    setTimeout(() => ctx.close(), 3500);
  } catch {
    // Browser blocked audio — no-op
  }
}
