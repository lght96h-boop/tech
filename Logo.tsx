import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = "md", showText = true }) => {
  const sizes = {
    sm: { svg: 28, text: "text-lg", sub: "text-[8px]" },
    md: { svg: 38, text: "text-2xl", sub: "text-[9px]" },
    lg: { svg: 52, text: "text-3xl", sub: "text-[11px]" },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      {/* Логотип — стилизованная буква C + шестерня (кортеж/корона) */}
      <svg
        width={s.svg}
        height={s.svg}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Внешний круг */}
        <circle cx="24" cy="24" r="23" fill="#111111" stroke="#DC2626" strokeWidth="2" />

        {/* Стилизованная "С" как дуга с зубцами (корона/кортеж) */}
        {/* Большая дуга C */}
        <path
          d="M34 13.5C31.2 11.3 27.8 10 24 10C15.2 10 8 17.2 8 26C8 34.8 15.2 42 24 42C27.8 42 31.2 40.7 34 38.5"
          stroke="#DC2626"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Зубцы короны (верх) */}
        <rect x="33" y="8" width="3" height="8" rx="1.5" fill="#DC2626" />
        <rect x="38" y="11" width="3" height="8" rx="1.5" fill="#DC2626" transform="rotate(30 38 11)" />
        <rect x="28" y="7" width="3" height="8" rx="1.5" fill="#DC2626" transform="rotate(-20 28 7)" />

        {/* Зубцы короны (низ) */}
        <rect x="33" y="33" width="3" height="7" rx="1.5" fill="#DC2626" />
        <rect x="38" y="32" width="3" height="7" rx="1.5" fill="#DC2626" transform="rotate(-30 38 36)" />
        <rect x="28" y="34" width="3" height="7" rx="1.5" fill="#DC2626" transform="rotate(20 28 38)" />

        {/* Горизонтальная линия-«скорость» */}
        <line x1="14" y1="26" x2="28" y2="26" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="22" x2="22" y2="22" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="30" x2="22" y2="30" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`${s.text} font-black tracking-widest text-white`}
            style={{ fontFamily: "'Arial Black', Arial, sans-serif", letterSpacing: "0.15em" }}
          >
            CAR<span className="text-red-600">TECH</span>
          </span>
          <span
            className={`${s.sub} tracking-[0.3em] text-gray-400 uppercase font-medium mt-0.5`}
          >
            AUTO PARTS
          </span>
        </div>
      )}
    </div>
  );
};
