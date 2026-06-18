"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

/* Grayscale "mountain wave": a static black mountain range with a valley dip
   in the centre, soft misty fog glowing up out of the valley, fading to dark
   at the top. Value noise (no derivatives) so it compiles on WebGL1/2 alike. */
const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 0.55;
    for (int i = 0; i < 5; i++) {
      sum += amp * vnoise(p);
      p = p * 2.02 + 19.7;
      amp *= 0.5;
    }
    return sum;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);

    float t = uTime * 0.075;
    vec2 par = (uMouse - 0.5) * 0.10;

    // Two layers of drifting mist for depth: large soft structures that warp
    // and roll, plus finer wisps rising at a different speed.
    vec2 p1 = vec2(uv.x * aspect, uv.y) * 1.6 + par;
    vec2 p2 = vec2(uv.x * aspect, uv.y) * 3.1 + par;
    vec2 w = vec2(fbm(p1 + vec2(0.0, t)), fbm(p1 + vec2(4.3, -t * 0.8)));
    float base = fbm(p1 + 1.7 * w + vec2(t * 0.5, -t * 0.35));
    float detail = fbm(p2 + vec2(-t * 0.7, t * 0.5));
    float clouds = base * 0.78 + detail * 0.32;

    // Luminous core rising from the centre valley, gently breathing
    float pulse = 0.93 + 0.07 * sin(uTime * 0.45);
    vec2 c = vec2(0.5 * aspect, 0.30);
    float dGlow = distance(vec2(uv.x * aspect, uv.y), c);
    float glow = smoothstep(0.98, 0.0, dGlow) * pulse;

    // Grayscale sky: mist lit by the glow, fading softly toward the top
    float lum = clouds * (0.24 + 1.0 * glow);
    lum += pow(glow, 2.4) * 0.6;
    lum *= smoothstep(1.18, 0.20, uv.y);
    lum = clamp(lum, 0.0, 1.0);
    vec3 sky = mix(vec3(0.02, 0.02, 0.025), vec3(0.96, 0.96, 0.97), lum);

    // Mountain range that rolls like a slow wave: stacked noise octaves drift
    // horizontally (bumps travel across) while large sine swells raise and
    // lower the whole silhouette over time. Valley dip stays in the centre.
    float edge = clamp(abs(uv.x - 0.5) * 2.0, 0.0, 1.0);
    float rt = uTime * 0.05;
    float ridge = 0.10 + 0.30 * pow(edge, 1.25);
    ridge += 0.10 * vnoise(vec2(uv.x * 2.2 + 7.0 + rt * 0.6, 1.3 + rt * 0.3));
    ridge += 0.06 * vnoise(vec2(uv.x * 5.5 + 20.0 - rt * 0.9, 3.7 + rt * 0.25));
    ridge += 0.035 * vnoise(vec2(uv.x * 13.0 + 41.0 + rt * 1.3, 9.1 + rt * 0.2));
    ridge += 0.030 * sin(uv.x * 3.0 + uTime * 0.35);
    ridge += 0.020 * sin(uv.x * 6.5 - uTime * 0.50 + 1.5);
    float m = smoothstep(ridge, ridge + 0.004, uv.y); // 0 = mountain, 1 = sky

    vec3 col = mix(vec3(0.0), sky, m);
    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * Fullscreen animated gold fog (OGL fragment shader on a single triangle).
 * Sits behind the hero content, aria-hidden, no layout impact. Pauses its
 * RAF loop when scrolled out of view, renders a single still frame under
 * prefers-reduced-motion, and degrades to a CSS gold-gradient if WebGL is
 * unavailable.
 */
export default function WaveBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mounted = true;
    let raf = 0;
    let cleanup = () => {};

    (async () => {
      const { Renderer, Triangle, Program, Mesh } = await import("ogl");
      if (!mounted || !canvasRef.current) return;

      let renderer;
      try {
        renderer = new Renderer({
          canvas,
          alpha: false,
          antialias: false,
          dpr: Math.min(window.devicePixelRatio || 1, 1.5),
        });
      } catch {
        setFailed(true);
        return;
      }

      const gl = renderer.gl;
      gl.clearColor(0.035, 0.035, 0.035, 1);

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [1, 1] },
          uMouse: { value: [0.5, 0.5] },
        },
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      const resize = () => {
        const parent = canvas.parentElement;
        const w = parent?.clientWidth || window.innerWidth;
        const h = parent?.clientHeight || window.innerHeight;
        renderer.setSize(w, h);
        program.uniforms.uResolution.value = [w, h];
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas.parentElement || canvas);

      const render = (seconds: number, mouse: number[]) => {
        program.uniforms.uTime.value = seconds;
        program.uniforms.uMouse.value = mouse;
        renderer.render({ scene: mesh });
      };

      // Reduced motion: one frozen frame, no loop, no listeners
      if (reduce) {
        render(6.0, [0.5, 0.5]);
        cleanup = () => {
          ro.disconnect();
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
        return;
      }

      const mouse = [0.5, 0.5];
      const target = [0.5, 0.5];
      const onMove = (e: PointerEvent) => {
        target[0] = e.clientX / window.innerWidth;
        target[1] = 1 - e.clientY / window.innerHeight;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let baseline = performance.now();
      let elapsed = 0;
      const loop = (now: number) => {
        elapsed = (now - baseline) / 1000;
        mouse[0] += (target[0] - mouse[0]) * 0.05;
        mouse[1] += (target[1] - mouse[1]) * 0.05;
        render(elapsed, mouse);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      // Pause the loop while the hero is off-screen
      const io = new IntersectionObserver(
        (entries) => {
          const visible = entries[0]?.isIntersecting;
          if (!visible && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          } else if (visible && !raf) {
            baseline = performance.now() - elapsed * 1000; // resume time
            raf = requestAnimationFrame(loop);
          }
        },
        { threshold: 0 },
      );
      io.observe(canvas);

      cleanup = () => {
        if (raf) cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    })();

    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
      cleanup();
    };
  }, [reduce]);

  if (failed) {
    return (
      <div
        aria-hidden
        className={`${className} bg-pit`}
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 38%, rgba(214,168,90,0.16), rgba(9,9,9,0) 70%)",
        }}
      />
    );
  }

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
