const LOGO_SRC = './Logo.png';

export default function EKLogo({ size = 44 }) {
  return (
    <img
      src={LOGO_SRC}
      alt="E-TecSa-K logo"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block', borderRadius: '6px' }}
      onError={e => {
        e.currentTarget.onerror = null;
        e.currentTarget.replaceWith(makeSVG(size));
      }}
    />
  );
}

function makeSVG(size) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', '0 0 120 120');
  svg.innerHTML =
    '<rect x="14" y="22" width="50" height="18" rx="9" fill="#D42B1A"/>' +
    '<rect x="14" y="51" width="50" height="18" rx="9" fill="#D42B1A"/>' +
    '<rect x="14" y="80" width="50" height="18" rx="9" fill="#D42B1A"/>' +
    '<rect x="76" y="22" width="14" height="76" rx="7" fill="#D42B1A"/>' +
    '<path d="M76 22 L106 51 L76 51 Z" fill="#D42B1A"/>' +
    '<path d="M76 98 L106 69 L76 69 Z" fill="#D42B1A"/>';
  return svg;
}
