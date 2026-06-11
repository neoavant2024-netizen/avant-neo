"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// tsParticles は重いので初期バンドルから外し、ブラウザがアイドルになってから読み込む。
const StarParticles = dynamic(() => import("./StarParticles"), { ssr: false });

export default function DeferredStars({ className }: { className?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let id: number;
    if (w.requestIdleCallback) {
      id = w.requestIdleCallback(() => setShow(true));
    } else {
      id = window.setTimeout(() => setShow(true), 1200);
    }
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  if (!show) return null;
  return <StarParticles className={className} />;
}
