"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Particles,
  ParticlesProvider,
  useParticlesProvider,
} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

function Inner({
  className,
  options,
}: {
  className?: string;
  options: ISourceOptions;
}) {
  const { loaded } = useParticlesProvider();
  if (!loaded) return <div className={className} aria-hidden />;
  return <Particles id="star-particles" className={className} options={options} />;
}

// 漂う星（リンクなし・ゆっくり・またたき）の背景粒子。全ページ共通背景に使う。
export default function StarParticles({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEnabled(false);
    }
  }, []);

  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: "transparent" },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 70, density: { enable: true } },
        color: { value: ["#ffffff", "#22d3ee", "#8b5cf6"] },
        links: { enable: false },
        move: {
          enable: true,
          speed: 0.35,
          direction: "none",
          outModes: { default: "out" },
          random: true,
        },
        opacity: {
          value: { min: 0.1, max: 0.85 },
          animation: { enable: true, speed: 0.7, sync: false },
        },
        size: { value: { min: 0.5, max: 1.8 } },
      },
    }),
    []
  );

  if (!enabled) return <div className={className} aria-hidden />;

  return (
    <ParticlesProvider init={init}>
      <Inner className={className} options={options} />
    </ParticlesProvider>
  );
}
