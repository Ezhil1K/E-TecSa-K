import { useState } from 'react'

const LOGO_SRC = '/Logo.png';

/** SVG icon version — used when `color` prop is passed or PNG fails to load */
function LogoIcon({ size, color = '#D42B1A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: 'block', flexShrink: 0 }}>
      {/* E — 3 horizontal rounded bars */}
      <rect x="6"  y="16" width="56" height="18" rx="9" fill={color}/>
      <rect x="6"  y="51" width="56" height="18" rx="9" fill={color}/>
      <rect x="6"  y="86" width="56" height="18" rx="9" fill={color}/>
      {/* K — vertical spine */}
      <rect x="72" y="16" width="15" height="88" rx="7" fill={color}/>
      {/* K — upper arm: from spine centre → upper-right */}
      <line x1="79" y1="60" x2="110" y2="18"  stroke={color} strokeWidth="18" strokeLinecap="round"/>
      {/* K — lower arm: from spine centre → lower-right */}
      <line x1="79" y1="60" x2="110" y2="102" stroke={color} strokeWidth="18" strokeLinecap="round"/>
    </svg>
  )
}

/**
 * EKLogo — shows the Logo.png by default.
 * Pass `color` (e.g. "#fff") to force the SVG icon version in that colour,
 * which is ideal for use on dark/coloured backgrounds.
 */
export default function EKLogo({ size = 44, color = null }) {
  const [imgFailed, setImgFailed] = useState(false)

  // Explicit colour requested OR image failed → use SVG icon
  if (color || imgFailed) {
    return <LogoIcon size={size} color={color || '#D42B1A'} />
  }

  return (
    <img
      src={LOGO_SRC}
      alt="E-TecSa-K logo"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block', borderRadius: '6px' }}
      onError={() => setImgFailed(true)}
    />
  );
}
