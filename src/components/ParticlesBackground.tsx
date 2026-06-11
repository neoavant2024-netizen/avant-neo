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
  return (
    <Particles id="tsparticles-bg" className={className} options={options} />
  );
}

// tsParticles（v4 Provider API）によるインタラクティブ粒子背景。
export default function ParticlesBackground({
  className,
}: {
  className?: string;
}) {
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
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.5 } },
        },
      },
      particles: {
        number: { value: 60, density: { enable: true } },
        color: { value: ["#22d3ee", "#8b5cf6", "#d946ef"] },
        links: {
          enable: true,
          distance: 140,
          color: "#2a3358",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none",
          outModes: { default: "bounce" },
        },
        opacity: { value: { min: 0.2, max: 0.7 } },
        size: { value: { min: 1, max: 2.6 } },
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
