export default function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999]"
      aria-hidden="true"
    >
      <svg className="w-full h-full opacity-[0.60]">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.95"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix 
            type="matrix" 
            values="1.1 0 0 0 0.05
                    0 1.05 0 0 0.02
                    0 0 0.9 0 0
                    0 0 0 1 0" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  )
}
