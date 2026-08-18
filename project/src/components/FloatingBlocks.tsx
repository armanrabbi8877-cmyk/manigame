import { useEffect, useRef } from "react";

interface Block {
  x: number;
  y: number;
  z: number;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  type: BlockType;
  drift: number;
  driftSpeed: number;
}

type BlockType = "grass" | "diamond" | "gold" | "stone" | "emerald" | "amethyst";

const BLOCK_TYPES: Record<
  BlockType,
  { top: string; side: string; glow: string }
> = {
  grass: {
    top: "linear-gradient(135deg, #5fd35f 0%, #3a9a3a 50%, #5fd35f 100%)",
    side: "linear-gradient(180deg, #5fd35f 0%, #8b5a2b 20%, #6b3e1a 60%, #4a2c10 100%)",
    glow: "rgba(95,211,95,0.4)",
  },
  diamond: {
    top: "linear-gradient(135deg, #3ea6ff 0%, #1e6fd9 50%, #3ea6ff 100%)",
    side: "linear-gradient(180deg, #3ea6ff 0%, #2a7fd4 40%, #1a5fa0 100%)",
    glow: "rgba(62,166,255,0.4)",
  },
  gold: {
    top: "linear-gradient(135deg, #fde047 0%, #ca8a04 50%, #fde047 100%)",
    side: "linear-gradient(180deg, #fde047 0%, #ca8a04 40%, #a16207 100%)",
    glow: "rgba(250,204,21,0.4)",
  },
  stone: {
    top: "linear-gradient(135deg, #9d9d9d 0%, #7d7d7d 50%, #9d9d9d 100%)",
    side: "linear-gradient(180deg, #8d8d8d 0%, #6d6d6d 50%, #5d5d5d 100%)",
    glow: "rgba(125,125,125,0.2)",
  },
  emerald: {
    top: "linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #4ade80 100%)",
    side: "linear-gradient(180deg, #4ade80 0%, #22c55e 40%, #16a34a 100%)",
    glow: "rgba(74,222,128,0.4)",
  },
  amethyst: {
    top: "linear-gradient(135deg, #b366ff 0%, #8b3fd9 50%, #b366ff 100%)",
    side: "linear-gradient(180deg, #b366ff 0%, #8b3fd9 40%, #6b2fb0 100%)",
    glow: "rgba(179,102,255,0.4)",
  },
};

const TYPES: BlockType[] = ["grass", "diamond", "gold", "emerald", "amethyst", "stone"];

/**
 * CSS-3D floating Minecraft-style blocks. Each block is a full cube
 * with distinct top/side textures. Lightweight — no WebGL.
 */
export function FloatingBlocks({ count = 10 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<Block[]>([]);
  const rafRef = useRef<number>(0);
  const parallaxRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blocks: Block[] = Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 90,
      y: (Math.random() - 0.5) * 90,
      z: (Math.random() - 0.5) * 250,
      size: 24 + Math.random() * 40,
      rotX: Math.random() * 360,
      rotY: Math.random() * 360,
      rotZ: Math.random() * 360,
      rotSpeedX: (Math.random() - 0.5) * 0.25,
      rotSpeedY: (Math.random() - 0.5) * 0.25,
      rotSpeedZ: (Math.random() - 0.5) * 0.15,
      type: TYPES[i % TYPES.length],
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.004 + Math.random() * 0.008,
    }));
    blocksRef.current = blocks;

    const nodes: HTMLDivElement[] = [];
    container.innerHTML = "";
    blocks.forEach((b) => {
      const wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.top = "50%";
      wrapper.style.left = "50%";
      wrapper.style.transformStyle = "preserve-3d";
      wrapper.style.willChange = "transform";

      const tex = BLOCK_TYPES[b.type];
      const s = b.size;
      const h = s / 2;

      // Build 6 faces of the cube
      const faces = [
        { transform: `translateZ(${h}px)`, bg: tex.side }, // front
        { transform: `rotateY(180deg) translateZ(${h}px)`, bg: tex.side }, // back
        { transform: `rotateY(-90deg) translateZ(${h}px)`, bg: tex.side }, // left
        { transform: `rotateY(90deg) translateZ(${h}px)`, bg: tex.side }, // right
        { transform: `rotateX(90deg) translateZ(${h}px)`, bg: tex.top }, // top
        { transform: `rotateX(-90deg) translateZ(${h}px)`, bg: tex.side }, // bottom
      ];

      faces.forEach((f) => {
        const face = document.createElement("div");
        face.style.position = "absolute";
        face.style.width = `${s}px`;
        face.style.height = `${s}px`;
        face.style.marginLeft = `-${h}px`;
        face.style.marginTop = `-${h}px`;
        face.style.background = f.bg;
        face.style.border = `1px solid rgba(0,0,0,0.3)`;
        face.style.boxShadow = `0 0 15px ${tex.glow}, inset 0 0 8px rgba(0,0,0,0.3)`;
        face.style.borderRadius = "2px";
        face.style.transform = f.transform;
        wrapper.appendChild(face);
      });

      container.appendChild(wrapper);
      nodes.push(wrapper);
    });

    const animate = () => {
      const { x: px, y: py } = parallaxRef.current;
      blocks.forEach((b, i) => {
        b.rotX += b.rotSpeedX;
        b.rotY += b.rotSpeedY;
        b.rotZ += b.rotSpeedZ;
        b.drift += b.driftSpeed;
        const floatY = Math.sin(b.drift) * 12;
        const node = nodes[i];
        if (node) {
          node.style.transform = `translate3d(${b.x + px * 0.4}px, ${b.y + floatY + py * 0.4}px, ${b.z}px) rotateX(${b.rotX}deg) rotateY(${b.rotY}deg) rotateZ(${b.rotZ}deg)`;
        }
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      parallaxRef.current = { x, y };
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const x = Math.max(-25, Math.min(25, e.gamma));
      const y = Math.max(-25, Math.min(25, e.beta - 45));
      parallaxRef.current = { x, y };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("deviceorientation", onTilt);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
      cancelAnimationFrame(rafRef.current);
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: "900px", transformStyle: "preserve-3d" }}
      aria-hidden="true"
    />
  );
}
