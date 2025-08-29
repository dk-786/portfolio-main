"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { SwiperProps } from "swiper/react";

type ClientSwiperProps = SwiperProps & {
  children?: React.ReactNode;
  className?: string;
  modules?: Array<keyof typeof import("swiper/modules") | object>;
};

const Swiper = dynamic(
  async () => (await import("swiper/react")).Swiper,
  { ssr: false }
);

const SwiperSlide = dynamic(
  async () => (await import("swiper/react")).SwiperSlide,
  { ssr: false }
);

export default function ClientSwiper({
  children,
  className,
  modules = [],
  ...swiperProps
}: ClientSwiperProps) {
  const [mounted, setMounted] = useState(false);
  const [resolvedModules, setResolvedModules] = useState<object[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function resolveMods() {
      if (!modules || modules.length === 0) {
        setResolvedModules([]);
        return;
      }

      const resolved: object[] = [];

      await Promise.all(
        modules.map(async (m) => {
          if (!m) return;
          if (typeof m === "string") {
            try {
              const mod = await import("swiper/modules");
              const exported = (mod as Record<string, unknown>)[m];
              if (exported) resolved.push(exported);
            } catch {
              try {
                const mod2 = await import(`swiper/modules/${m}`);
                const exported2 =
                  (mod2 as Record<string, unknown>)[m] ??
                  (mod2 as Record<string, unknown>).default ??
                  mod2;
                if (exported2) resolved.push(exported2);
              } catch {
                // console.warn("Failed to import swiper module", m);
              }
            }
          } else {
            resolved.push(m);
          }
        })
      );

      if (!cancelled) setResolvedModules(resolved);
    }

    resolveMods();
    return () => {
      cancelled = true;
    };
  }, [modules]);

  if (!mounted) return null;

  const childrenArray = React.Children.toArray(children).filter(Boolean);
  const shouldLoop = !!swiperProps.loop && childrenArray.length > 1;
  const swiperKey = `slides-${childrenArray.length}`;
  const finalSwiperProps: SwiperProps = { ...swiperProps, loop: shouldLoop };

  return (
    <Swiper
      key={swiperKey}
      className={className}
      modules={resolvedModules as SwiperProps["modules"]}
      {...finalSwiperProps}
    >
      {childrenArray.map((child, i) => (
        <SwiperSlide key={i}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}
