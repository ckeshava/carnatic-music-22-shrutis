import React from 'react';
import { Shruti, twentyTwoShrutis } from './shrutiData';

interface ShrutiRulerProps {
  selectedSwara: Shruti | null;
  onPlaySwara: (shruti: Shruti) => void;
}

const markerColors: Record<string, string> = {
  S: '#EF4444',
  R: '#F97316',
  G: '#EAB308',
  M: '#22C55E',
  P: '#14B8A6',
  D: '#3B82F6',
  N: '#A855F7',
};

const xForCents = (cents: number): number => 40 + (cents / 1200) * 720;

const ShrutiRuler: React.FC<ShrutiRulerProps> = ({ selectedSwara, onPlaySwara }) => {
  // Compute family label positions (average cents per family)
  const familyGroups: Record<string, number[]> = {};
  twentyTwoShrutis.forEach((s) => {
    if (!familyGroups[s.family]) familyGroups[s.family] = [];
    familyGroups[s.family].push(s.cents);
  });
  const familyLabels = Object.entries(familyGroups).map(([family, centsArr]) => ({
    family,
    x: xForCents(centsArr.reduce((a, b) => a + b, 0) / centsArr.length),
  }));

  const centsTicks = [0, 200, 400, 600, 800, 1000, 1200];

  return (
    <div className="overflow-x-auto mb-4 -mx-2 px-2">
      <svg
        viewBox="0 0 800 120"
        className="w-full"
        style={{ minWidth: '600px' }}
        role="img"
        aria-label="Horizontal ruler showing the 22 shrutis positioned by cents across one octave"
      >
        {/* Family labels */}
        {familyLabels.map(({ family, x }) => (
          <text
            key={family}
            x={x}
            y={25}
            textAnchor="middle"
            fontSize={12}
            fontWeight="bold"
            fill={markerColors[family]}
          >
            {family}
          </text>
        ))}

        {/* Shruti markers */}
        {twentyTwoShrutis.map((shruti) => {
          const x = xForCents(shruti.cents);
          const isSelected = selectedSwara?.shruti === shruti.shruti;
          const isTall = shruti.is12Note;
          const tickTop = isTall ? 45 : 55;
          const r = isTall ? 5 : 3.5;
          const color = markerColors[shruti.family];

          return (
            <g
              key={shruti.shruti}
              onClick={() => onPlaySwara(shruti)}
              style={{ cursor: 'pointer' }}
            >
              <title>
                {`#${shruti.shruti} ${shruti.name}\nRatio: ${shruti.ratio[0]}:${shruti.ratio[1]}\nCents: ${shruti.cents}`}
              </title>
              {/* Vertical tick */}
              <line
                x1={x}
                y1={tickTop}
                x2={x}
                y2={75}
                stroke={color}
                strokeWidth={isTall ? 2 : 1.5}
                opacity={0.7}
              />
              {/* Circle marker */}
              <circle
                cx={x}
                cy={tickTop - r}
                r={r}
                fill={color}
                stroke={isSelected ? '#1F2937' : 'white'}
                strokeWidth={isSelected ? 2.5 : 1}
              />
              {/* Selection highlight ring */}
              {isSelected && (
                <circle
                  cx={x}
                  cy={tickTop - r}
                  r={r + 4}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  opacity={0.5}
                />
              )}
            </g>
          );
        })}

        {/* Upper octave Sa marker at 1200 cents */}
        <line
          x1={xForCents(1200)}
          y1={50}
          x2={xForCents(1200)}
          y2={75}
          stroke="#9CA3AF"
          strokeWidth={1.5}
          strokeDasharray="3,2"
        />
        <circle
          cx={xForCents(1200)}
          cy={45}
          r={4}
          fill="#D1D5DB"
          stroke="#9CA3AF"
          strokeWidth={1}
        />
        <text
          x={xForCents(1200)}
          y={38}
          textAnchor="middle"
          fontSize={9}
          fill="#9CA3AF"
        >
          &#x1E60;
        </text>

        {/* Axis line */}
        <line x1={40} y1={75} x2={760} y2={75} stroke="#92400E" strokeWidth={1.5} />

        {/* Cents tick marks and labels */}
        {centsTicks.map((c) => {
          const x = xForCents(c);
          return (
            <g key={c}>
              <line x1={x} y1={75} x2={x} y2={82} stroke="#92400E" strokeWidth={1} />
              <text
                x={x}
                y={95}
                textAnchor="middle"
                fontSize={10}
                fill="#92400E"
              >
                {c}
              </text>
            </g>
          );
        })}

        {/* Axis label */}
        <text x={400} y={112} textAnchor="middle" fontSize={10} fill="#B45309">
          cents
        </text>
      </svg>
    </div>
  );
};

export default ShrutiRuler;
