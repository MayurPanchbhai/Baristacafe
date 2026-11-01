/** @format */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TORNADO_IMAGES } from "../data/menu";

/* ── Texture helpers ─────────────────────────────────────────────── */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Crops an image into a circle with a single solid ring color. */
function circleTexture(
  img: HTMLImageElement,
  ringColor: string,
): THREE.CanvasTexture {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  const cx = S / 2;

  // Single solid outer ring
  ctx.beginPath();
  ctx.arc(cx, cx, S / 2 - 4, 0, Math.PI * 2);
  ctx.fillStyle = ringColor;
  ctx.fill();

  // Inner image with padding so the ring stays visible
  const pad = 14;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cx, S / 2 - pad, 0, Math.PI * 2);
  ctx.clip();
  const ir = img.width / img.height;
  let dw = S;
  let dh = S;
  if (ir > 1) {
    dw = S * ir;
  } else {
    dh = S / ir;
  }
  ctx.drawImage(img, (S - dw) / 2, (S - dh) / 2, dw, dh);
  ctx.restore();

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

function dotTexture(color: string): THREE.CanvasTexture {
  const S = 64;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, color);
  g.addColorStop(0.55, color);
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  return new THREE.CanvasTexture(c);
}

/* ── Component ────────────────────────────────________________───── */

interface Orbiter {
  sprite: THREE.Sprite;
  material: THREE.SpriteMaterial;
  phase: number;
  radius: number;
  baseY: number;
  baseScale: number;
  bobSpeed: number;
}

export default function TornadoCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
    } catch {
      setFailed(true);
      return;
    }

    let disposed = false;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
    camera.position.set(0, 0.35, 9.8);

    const group = new THREE.Group();
    scene.add(group);

    const orbiters: Orbiter[] = [];
    const dots: Orbiter[] = [];
    let centerSprite: THREE.Sprite | null = null;

    const N = TORNADO_IMAGES.length;
    const Y_MIN = -2.45;
    const Y_MAX = 2.45;

    /* Build orbiting cuisine sprites with a single ring color */
    Promise.all(TORNADO_IMAGES.map(loadImage))
      .then((imgs) => {
        if (disposed) return;
        imgs.forEach((img, i) => {
          const t = N === 1 ? 0 : i / (N - 1);
          // Pass your desired single ring color here (e.g., "#f3e6d7")
          const tex = circleTexture(img, "#f3e6d7");
          const material = new THREE.SpriteMaterial({
            map: tex,
            transparent: true,
            depthWrite: false,
          });
          const sprite = new THREE.Sprite(material);
          group.add(sprite);
          orbiters.push({
            sprite,
            material,
            phase: i * 2.399963,
            radius: THREE.MathUtils.lerp(0.85, 2.5, t),
            baseY: THREE.MathUtils.lerp(Y_MIN, Y_MAX, t),
            baseScale: 0.78 + Math.random() * 0.34,
            bobSpeed: 0.7 + Math.random() * 0.7,
          });
        });

        /* Central hero latte sprite with single ring color */
        return loadImage("/images/coffee-2.png").then((hero) => {
          if (disposed) return;
          const tex = circleTexture(hero, "#f3e6d7");
          const material = new THREE.SpriteMaterial({
            map: tex,
            transparent: true,
            depthWrite: false,
          });
          centerSprite = new THREE.Sprite(material);
          centerSprite.scale.set(3.35, 3.35, 1);
          centerSprite.position.set(0, 0, 0);
          group.add(centerSprite);
        });
      })
      .catch(() => {
        /* textures failed */
      });

    /* Atmosphere particles */
    const dotTexLemon = dotTexture("#e4ff3b");
    const dotTexHeather = dotTexture("#b79cec");
    const dotTexSand = dotTexture("#d9c3a5");
    const dotTexs = [dotTexLemon, dotTexHeather, dotTexSand];
    for (let i = 0; i < 30; i++) {
      const t = Math.random();
      const material = new THREE.SpriteMaterial({
        map: dotTexs[i % dotTexs.length],
        transparent: true,
        depthWrite: false,
        opacity: 0.8,
      });
      const sprite = new THREE.Sprite(material);
      group.add(sprite);
      dots.push({
        sprite,
        material,
        phase: Math.random() * Math.PI * 2,
        radius: THREE.MathUtils.lerp(0.7, 3.1, t) + Math.random() * 0.5,
        baseY: THREE.MathUtils.lerp(Y_MIN - 0.6, Y_MAX + 0.6, t),
        baseScale: 0.07 + Math.random() * 0.14,
        bobSpeed: 0.5 + Math.random(),
      });
    }

    /* Mouse parallax */
    const mouse = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    /* Sizing */
    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* Animation */
    let raf = 0;
    let rot = 0;
    let last = performance.now();
    const clock = { t: 0 };

    const tick = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock.t += dt;
      rot += dt * 0.55;

      group.rotation.x = THREE.MathUtils.lerp(
        group.rotation.x,
        mouse.y * 0.1,
        0.05,
      );
      group.rotation.z = THREE.MathUtils.lerp(
        group.rotation.z,
        -mouse.x * 0.05,
        0.05,
      );

      const update = (o: Orbiter, speedMul: number) => {
        const angle = o.phase + rot * speedMul;
        const x = Math.cos(angle) * o.radius;
        const z = Math.sin(angle) * o.radius;
        const y = o.baseY + Math.sin(clock.t * o.bobSpeed + o.phase) * 0.14;
        o.sprite.position.set(x, y, z);

        const depth = (z / o.radius + 1) / 2;
        const s = o.baseScale * (0.72 + 0.34 * depth);
        o.sprite.scale.set(s, s, 1);
        o.material.opacity = 0.22 + 0.78 * depth;
      };
      orbiters.forEach((o) => update(o, 1));
      dots.forEach((o) => update(o, 1.35));

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      [...orbiters, ...dots].forEach((o) => {
        o.material.map?.dispose();
        o.material.dispose();
      });
      centerSprite?.material.map?.dispose();
      centerSprite?.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      {failed && (
        <div className="absolute inset-0 grid place-items-center">
          <img
            src="/images/coffee-1.jpg"
            alt="Signature heather lavender latte"
            className="h-56 w-56 animate-float rounded-full object-cover ring-8 ring-heather sm:h-72 sm:w-72"
          />
        </div>
      )}
    </div>
  );
}
