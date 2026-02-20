import React from "react";

// SVG-логотипы популярных марок СНГ (инлайн SVG, минималистичные)
export const BrandSVGs: Record<string, React.FC<{ size?: number }>> = {
  lada: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <polygon points="20,6 34,32 6,32" fill="none" stroke="#e5e7eb" strokeWidth="2.5" strokeLinejoin="round"/>
      <polygon points="20,13 28,29 12,29" fill="#DC2626" />
    </svg>
  ),
  toyota: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <ellipse cx="20" cy="20" rx="10" ry="6.5" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
      <ellipse cx="20" cy="20" rx="4.5" ry="10" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
      <ellipse cx="20" cy="12" rx="7" ry="3" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
    </svg>
  ),
  volkswagen: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <circle cx="20" cy="20" r="13" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
      <text x="20" y="25" textAnchor="middle" fill="#e5e7eb" fontSize="13" fontWeight="bold" fontFamily="Arial">W</text>
    </svg>
  ),
  kia: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <rect x="5" y="15" width="30" height="10" rx="3" fill="none" stroke="#e5e7eb" strokeWidth="1.5"/>
      <text x="20" y="23.5" textAnchor="middle" fill="#e5e7eb" fontSize="10" fontWeight="900" fontFamily="Arial" letterSpacing="1">KIA</text>
    </svg>
  ),
  hyundai: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <ellipse cx="20" cy="20" rx="14" ry="10" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
      <text x="20" y="24" textAnchor="middle" fill="#e5e7eb" fontSize="16" fontWeight="bold" fontFamily="Arial" fontStyle="italic">H</text>
    </svg>
  ),
  bmw: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <circle cx="20" cy="20" r="13" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
      <line x1="20" y1="7" x2="20" y2="33" stroke="#e5e7eb" strokeWidth="1.5"/>
      <line x1="7" y1="20" x2="33" y2="20" stroke="#e5e7eb" strokeWidth="1.5"/>
      <path d="M20 7 A13 13 0 0 1 33 20" fill="#2563EB"/>
      <path d="M20 33 A13 13 0 0 1 7 20" fill="#2563EB"/>
    </svg>
  ),
  mercedes: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <circle cx="20" cy="20" r="13" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
      <line x1="20" y1="7" x2="20" y2="20" stroke="#e5e7eb" strokeWidth="2"/>
      <line x1="20" y1="20" x2="9" y2="28" stroke="#e5e7eb" strokeWidth="2"/>
      <line x1="20" y1="20" x2="31" y2="28" stroke="#e5e7eb" strokeWidth="2"/>
    </svg>
  ),
  audi: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <circle cx="10" cy="20" r="6" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
      <circle cx="18" cy="20" r="6" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
      <circle cx="26" cy="20" r="6" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
    </svg>
  ),
  nissan: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <circle cx="20" cy="20" r="12" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
      <line x1="8" y1="20" x2="32" y2="20" stroke="#e5e7eb" strokeWidth="2"/>
      <text x="20" y="18" textAnchor="middle" fill="#e5e7eb" fontSize="7" fontWeight="bold" fontFamily="Arial">NISSAN</text>
    </svg>
  ),
  chevrolet: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <rect x="6" y="17" width="11" height="6" fill="#DC2626"/>
      <rect x="23" y="17" width="11" height="6" fill="#DC2626"/>
      <rect x="14" y="14" width="12" height="12" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
    </svg>
  ),
  ford: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <ellipse cx="20" cy="20" rx="14" ry="9" fill="none" stroke="#3B82F6" strokeWidth="2"/>
      <text x="20" y="23.5" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="bold" fontFamily="Arial" fontStyle="italic">Ford</text>
    </svg>
  ),
  mazda: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <ellipse cx="20" cy="20" rx="12" ry="8" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
      <path d="M14 20 Q20 12 26 20 Q20 28 14 20Z" fill="#e5e7eb" opacity="0.8"/>
    </svg>
  ),
  mitsubishi: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <polygon points="20,8 25,17 20,14 15,17" fill="#DC2626"/>
      <polygon points="11,23 20,23 16,17 11,20" fill="#DC2626"/>
      <polygon points="29,23 20,23 24,17 29,20" fill="#DC2626"/>
    </svg>
  ),
  skoda: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <circle cx="20" cy="20" r="12" fill="none" stroke="#16A34A" strokeWidth="2"/>
      <path d="M20 10 L28 26 L12 26 Z" fill="#16A34A" opacity="0.7"/>
    </svg>
  ),
  renault: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <polygon points="20,7 33,20 20,33 7,20" fill="none" stroke="#F59E0B" strokeWidth="2"/>
      <polygon points="20,13 27,20 20,27 13,20" fill="#F59E0B" opacity="0.8"/>
    </svg>
  ),
  uaz: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1a1a1a" />
      <rect x="7" y="13" width="26" height="14" rx="2" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
      <text x="20" y="23" textAnchor="middle" fill="#e5e7eb" fontSize="9" fontWeight="bold" fontFamily="Arial">УАЗ</text>
    </svg>
  ),
};
