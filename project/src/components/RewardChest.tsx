import { useEffect, useRef, useState } from "react";

/**
 * Animated 3D Minecraft-style reward chest built with CSS 3D transforms.
 * Floats, rotates slowly, glows on hover, and opens with a
 * particle + light burst on click.
 */
export function RewardChest({ onOpen }: { onOpen?: () => void }) {
  const [open, setOpen] = useState(false);
  const [burst, setBurst] = useState(false);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const rotRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      rotRef.current += 0.15;
      const node = containerRef.current?.querySelector<HTMLElement>("[data-rotor]");
      if (node) {
        node.style.transform = `rotateY(${rotRef.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleClick = () => {
    if (open) return;
    setOpen(true);
    setBurst(true);
    onOpen?.();
    window.setTimeout(() => setBurst(false), 1500);
  };

  const size = 180;
  const bodyH = size * 0.55;
  const lidH = size * 0.38;
  const half = size / 2;

  // Minecraft-style wood + gold textures via gradients
  const woodFront =
    "linear-gradient(180deg, #8b5a2b 0%, #6b3e1a 30%, #5a3315 60%, #4a2c10 100%)";
  const woodSide =
    "linear-gradient(180deg, #7a4a1e 0%, #5a3315 50%, #3a210d 100%)";
  const goldTrim =
    "linear-gradient(135deg, #fde047 0%, #facc15 30%, #ca8a04 60%, #fde047 100%)";
  const goldTrimDark =
    "linear-gradient(135deg, #ca8a04 0%, #a16207 50%, #ca8a04 100%)";

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size, perspective: "1000px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow halo */}
      <div
        className="absolute rounded-full blur-3xl transition-all duration-700"
        style={{
          width: size * 2.2,
          height: size * 2.2,
          background: open
            ? "radial-gradient(circle, rgba(250,204,21,0.5) 0%, rgba(95,211,95,0.2) 40%, transparent 70%)"
            : hovered
              ? "radial-gradient(circle, rgba(250,204,21,0.4) 0%, rgba(95,211,95,0.15) 40%, transparent 70%)"
              : "radial-gradient(circle, rgba(250,204,21,0.25) 0%, rgba(95,211,95,0.1) 40%, transparent 70%)",
          opacity: open ? 1 : hovered ? 0.8 : 0.5,
          animation: "haloPulse 3s ease-in-out infinite",
        }}
      />

      {/* Floating + rotating wrapper */}
      <div
        className="absolute"
        style={{
          transformStyle: "preserve-3d",
          animation: "chestFloat 4s ease-in-out infinite",
        }}
      >
        <div data-rotor style={{ transformStyle: "preserve-3d" }}>
          {/* ===== Chest body ===== */}
          <div
            className="absolute"
            style={{
              width: size,
              height: bodyH,
              top: lidH,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front face */}
            <Face w={size} h={bodyH} transform={`translateZ(${half}px)`} bg={woodFront} border="#a8693a" />
            {/* Gold band across front */}
            <Face
              w={size}
              h={8}
              transform={`translateZ(${half + 0.5}px) translateY(${bodyH - 12}px)`}
              bg={goldTrim}
              border="#a16207"
            />
            {/* Back face */}
            <Face w={size} h={bodyH} transform={`rotateY(180deg) translateZ(${half}px)`} bg={woodSide} border="#7a4a1e" />
            {/* Left face */}
            <Face w={size} h={bodyH} transform={`rotateY(-90deg) translateZ(${half}px)`} bg={woodSide} border="#8a5530" />
            {/* Right face */}
            <Face w={size} h={bodyH} transform={`rotateY(90deg) translateZ(${half}px)`} bg={woodSide} border="#8a5530" />
            {/* Bottom */}
            <Face w={size} h={size} transform={`rotateX(-90deg) translateZ(${bodyH / 2}px)`} bg="#3a210d" border="#5a3315" />

            {/* Gold lock */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                width: 32,
                height: 42,
                left: half - 16,
                top: bodyH / 2 - 21,
                transform: `translateZ(${half + 2}px)`,
                background: goldTrim,
                boxShadow: "0 0 16px rgba(250,204,21,0.8), inset 0 -3px 6px rgba(0,0,0,0.3)",
                border: "2px solid #a16207",
                borderRadius: 4,
              }}
            >
              <div
                className="rounded-full"
                style={{ width: 10, height: 10, background: "#713f12", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }}
              />
            </div>

            {/* Corner gold studs */}
            {[0, 1].map((row) =>
              [0, 1].map((col) => (
                <div
                  key={`${row}-${col}`}
                  className="absolute"
                  style={{
                    width: 8,
                    height: 8,
                    left: col === 0 ? 4 : size - 12,
                    top: row === 0 ? 4 : bodyH - 12,
                    transform: `translateZ(${half + 0.5}px)`,
                    background: goldTrimDark,
                    border: "1px solid #a16207",
                    borderRadius: 2,
                  }}
                />
              )),
            )}
          </div>

          {/* ===== Lid (opens on click) ===== */}
          <div
            className="absolute"
            style={{
              width: size,
              height: lidH,
              left: 0,
              top: 0,
              transformStyle: "preserve-3d",
              transform: open ? "rotateX(-115deg)" : "rotateX(0deg)",
              transformOrigin: "bottom",
              transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Lid front */}
            <Face w={size} h={lidH} transform={`translateZ(${half}px)`} bg={woodFront} border="#a8693a" />
            {/* Gold band on lid front */}
            <Face
              w={size}
              h={6}
              transform={`translateZ(${half + 0.5}px) translateY(4px)`}
              bg={goldTrim}
              border="#a16207"
            />
            {/* Lid back */}
            <Face w={size} h={lidH} transform={`rotateY(180deg) translateZ(${half}px)`} bg={woodSide} border="#6a3e1a" />
            {/* Lid left */}
            <Face w={size} h={lidH} transform={`rotateY(-90deg) translateZ(${half}px)`} bg={woodSide} border="#7a4a1e" />
            {/* Lid right */}
            <Face w={size} h={lidH} transform={`rotateY(90deg) translateZ(${half}px)`} bg={woodSide} border="#7a4a1e" />
            {/* Lid top — gold */}
            <Face w={size} h={size} transform={`rotateX(90deg) translateZ(${lidH / 2}px)`} bg={goldTrim} border="#a16207" />
          </div>

          {/* Inner glow when open */}
          {open && (
            <div
              className="absolute rounded-full blur-2xl"
              style={{
                width: size * 0.9,
                height: size * 0.9,
                left: size * 0.05,
                top: lidH - 10,
                background:
                  "radial-gradient(circle, rgba(250,204,21,0.95) 0%, rgba(95,211,95,0.6) 35%, transparent 70%)",
                animation: "chestPulse 1.5s ease-out",
              }}
            />
          )}

          {/* Light beam when open */}
          {open && (
            <div
              className="absolute"
              style={{
                width: 4,
                height: 120,
                left: half - 2,
                top: -100,
                background: "linear-gradient(180deg, transparent, rgba(250,204,21,0.6), transparent)",
                filter: "blur(3px)",
                animation: "beamGlow 1.5s ease-out",
              }}
            />
          )}
        </div>
      </div>

      {/* Particle burst */}
      {burst && (
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const dist = 90 + Math.random() * 50;
            return (
              <span
                key={i}
                className="absolute rounded-full"
                style={
                  {
                    left: "50%",
                    top: "50%",
                    width: 6 + Math.random() * 4,
                    height: 6 + Math.random() * 4,
                    background: ["#facc15", "#5fd35f", "#3ea6ff", "#b366ff"][i % 4],
                    boxShadow: "0 0 10px currentColor",
                    "--tx": `${Math.cos(angle) * dist}px`,
                    "--ty": `${Math.sin(angle) * dist}px`,
                    animation: `burst 1.2s ease-out forwards`,
                  } as React.CSSProperties
                }
              />
            );
          })}
          {/* Sparkles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={`spark-${i}`}
              className="absolute text-lg"
              style={
                {
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animation: `sparkle ${0.8 + Math.random() * 0.6}s ease-out forwards`,
                  animationDelay: `${Math.random() * 0.3}s`,
                } as React.CSSProperties
              }
            >
              ✨
            </span>
          ))}
        </div>
      )}

      {/* Click target */}
      <button
        onClick={handleClick}
        aria-label={open ? "Reward chest opened" : "Open reward chest"}
        className="absolute inset-0 z-10 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
      />

      {/* Hint label */}
      {!open && (
        <div
          className="absolute -bottom-2 text-xs font-semibold text-amber-400/70"
          style={{ animation: "hintPulse 2s ease-in-out infinite" }}
        >
          ▲ Tap the chest
        </div>
      )}
    </div>
  );
}

function Face({
  w,
  h,
  transform,
  bg,
  border,
}: {
  w: number;
  h: number;
  transform: string;
  bg: string;
  border: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: w,
        height: h,
        left: 0,
        top: 0,
        transform,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 3,
        boxShadow: "inset 0 0 12px rgba(0,0,0,0.4)",
      }}
    />
  );
}
