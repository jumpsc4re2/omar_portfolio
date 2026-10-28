"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { usePageVisible } from "@/hooks/usePageVisible";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp, easeOut } from "@/lib/motion";

const REVOLUTION_MS = 22_000;
const ACTIVE_SPEED = 2.5;
const RAMP_MS = 800;
// Ring text sits on a circle of this radius in the 500×500 viewBox.
const TEXT_RADIUS = 196;
const TEXT_LENGTH = 2 * Math.PI * TEXT_RADIUS;

type PortraitClusterProps = {
  portrait: { src: string; alt: string; focus: string };
  hasPortrait: boolean;
  ringText: string;
  /** Paper notes, rendered inside the cluster so hovering them keeps it active. */
  children?: ReactNode;
};

/**
 * Circular portrait inside a slowly rotating text ring. Hover (or press on touch) speeds
 * the ring up, brightens the glow and tilts the portrait toward the pointer.
 */
export function PortraitCluster({ portrait, hasPortrait, ringText, children }: PortraitClusterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const rampFrame = useRef(0);
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisible();
  const inView = useInView(rootRef);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring || reducedMotion) return;
    const animation = ring.animate([{ transform: "rotate(0turn)" }, { transform: "rotate(1turn)" }], {
      duration: REVOLUTION_MS,
      iterations: Infinity,
    });
    animationRef.current = animation;
    return () => {
      cancelAnimationFrame(rampFrame.current);
      animation.cancel();
      animationRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    const animation = animationRef.current;
    if (!animation) return;
    if (inView && pageVisible) animation.play();
    else animation.pause();
  }, [inView, pageVisible, reducedMotion]);

  /** Eases the ring's playback rate instead of jumping to it. */
  const rampSpeed = (target: number) => {
    const animation = animationRef.current;
    if (!animation) return;
    cancelAnimationFrame(rampFrame.current);
    const from = animation.playbackRate;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / RAMP_MS, 1);
      animation.playbackRate = from + (target - from) * easeOut(progress);
      if (progress < 1) rampFrame.current = requestAnimationFrame(step);
    };
    rampFrame.current = requestAnimationFrame(step);
  };

  const setActive = (active: boolean) => {
    const root = rootRef.current;
    if (!root) return;
    root.toggleAttribute("data-active", active);
    rampSpeed(active ? ACTIVE_SPEED : 1);
  };

  const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    root.style.setProperty("--tilt-x", clamp(((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
    root.style.setProperty("--tilt-y", clamp(((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
  };

  const isMouse = (event: PointerEvent) => event.pointerType === "mouse";

  return (
    <div
      ref={rootRef}
      className="portrait-cluster relative aspect-square w-full select-none"
      onPointerEnter={(event) => {
        if (!isMouse(event)) return;
        setActive(true);
        trackPointer(event);
      }}
      onPointerMove={(event) => {
        if (isMouse(event) || rootRef.current?.hasAttribute("data-active")) trackPointer(event);
      }}
      onPointerLeave={(event) => isMouse(event) && setActive(false)}
      onPointerDown={(event) => {
        if (isMouse(event)) return;
        setActive(true);
        trackPointer(event);
      }}
      onPointerUp={(event) => !isMouse(event) && setActive(false)}
      onPointerCancel={(event) => !isMouse(event) && setActive(false)}
    >
      <div aria-hidden className="portrait-glow absolute inset-[4%] rounded-full" />

      {/* The round wrapper clips the spinning square so its corners never widen the page. */}
      <div aria-hidden className="absolute inset-0 overflow-hidden rounded-full">
        <div ref={ringRef} className="size-full">
          <svg viewBox="0 0 500 500" className="size-full">
            <defs>
              <path
                id="portrait-ring-path"
                d={`M 250 250 m -${TEXT_RADIUS} 0 a ${TEXT_RADIUS} ${TEXT_RADIUS} 0 1 1 ${TEXT_RADIUS * 2} 0 a ${TEXT_RADIUS} ${TEXT_RADIUS} 0 1 1 -${TEXT_RADIUS * 2} 0`}
              />
            </defs>
            <circle cx="250" cy="250" r="238" fill="none" className="stroke-ink/25" strokeDasharray="1.5 7" />
            <circle cx="250" cy="250" r="166" fill="none" className="stroke-accent/35" strokeWidth="0.75" />
            <text className="fill-muted font-mono" fontSize="15" letterSpacing="1">
              <textPath href="#portrait-ring-path" textLength={TEXT_LENGTH} lengthAdjust="spacing">
                {ringText
                  .repeat(2)
                  .split("✦")
                  .flatMap((part, index) =>
                    index === 0
                      ? [part]
                      : [
                          <tspan key={index} className="fill-accent">
                            ✦
                          </tspan>,
                          part,
                        ],
                  )}
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      <div className="portrait absolute inset-[22%]">
        <div className="relative size-full overflow-hidden rounded-full bg-surface shadow-[0_30px_60px_-20px_rgb(0_0_0/calc(0.8*var(--shadow-strength)))] ring-1 ring-line">
          {hasPortrait ? (
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              preload
              sizes="(min-width: 1024px) 18rem, 50vw"
              className="object-cover"
              quality={90}
              style={{ objectPosition: portrait.focus }}
            />
          ) : (
            <div
              role="img"
              aria-label={portrait.alt}
              className="grid size-full place-items-center bg-[radial-gradient(circle_at_35%_28%,color-mix(in_oklab,var(--color-ink)_14%,var(--color-surface)),var(--color-surface)_62%)]"
            >
              <span aria-hidden className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold tracking-[-0.06em] text-ink/15">
                OF
              </span>
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}
