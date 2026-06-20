"use client";

import {
  RiCloudLine, RiShieldKeyholeLine, RiCodeSSlashLine,
  RiFileTextLine, RiBuildingLine, RiMoneyDollarCircleLine,
  RiTeamLine, RiCheckboxMultipleLine,
} from "react-icons/ri";

const CAPABILITIES = [
  { label: "Cloud Solutions",   icon: RiCloudLine              },
  { label: "Cybersecurity",     icon: RiShieldKeyholeLine      },
  { label: "Software Dev",      icon: RiCodeSSlashLine         },
  { label: "Work Passes",       icon: RiFileTextLine           },
  { label: "ACRA Services",     icon: RiBuildingLine           },
  { label: "Grants & Funding",  icon: RiMoneyDollarCircleLine  },
  { label: "HR Management",     icon: RiTeamLine               },
  { label: "Compliance",        icon: RiCheckboxMultipleLine   },
];

const LOOPED = [...CAPABILITIES, ...CAPABILITIES, ...CAPABILITIES];

export default function Capabilities() {
  return (
    <section
      aria-label="Service capabilities"
      className="relative overflow-hidden border-y border-[#E4EAF4] bg-white py-0"
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          animation: marquee 36s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .cap-pill {
          display: flex; align-items: center; gap: 10px;
          padding: 16px 28px;
          border-right: 1px solid #EEF1F8;
          transition: background 0.2s;
          cursor: default;
          white-space: nowrap;
        }
        .cap-pill:hover { background: #F6F9FF; }
        .cap-pill:hover .cap-icon { color: #1a4fc7; transform: scale(1.12); }
        .cap-pill:hover .cap-label { color: #2e6be6; }
        .cap-icon {
          font-size: 15px; color: #2e6be6; flex-shrink: 0;
          transition: color 0.2s, transform 0.2s;
        }
        .cap-label {
          font-family: monospace; font-size: 10px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase; color: #7080A0;
          transition: color 0.2s;
        }
      `}</style>

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2e6be6]/30 to-transparent" />

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 inset-y-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 inset-y-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />

        <div className="marquee-track flex w-max" role="list">
          {LOOPED.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={`${item.label}-${index}`} className="cap-pill" role="listitem">
                <Icon className="cap-icon" aria-hidden="true" />
                <span className="cap-label">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2e6be6]/30 to-transparent" />
    </section>
  );
}