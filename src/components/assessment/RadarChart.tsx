import { WISCARScores } from '@/types/assessment';

interface RadarChartProps {
  scores: WISCARScores;
}

export function RadarChart({ scores }: RadarChartProps) {
  const dimensions = [
    { key: 'will', label: 'Will', value: scores.will, description: 'Perseverance & drive' },
    { key: 'interest', label: 'Interest', value: scores.interest, description: 'Passion for the field' },
    { key: 'skill', label: 'Skill', value: scores.skill, description: 'Current technical ability' },
    { key: 'cognitive', label: 'Cognitive', value: scores.cognitive, description: 'Problem-solving capacity' },
    { key: 'ability', label: 'Ability', value: scores.ability, description: 'Learning potential' },
    { key: 'realWorld', label: 'Real-World', value: scores.realWorld, description: 'Career alignment' }
  ];

  const maxValue = 100;
  const center = 120;
  const radius = 100;

  // Calculate points for each dimension
  const points = dimensions.map((dim, index) => {
    const angle = (index * 60 - 90) * (Math.PI / 180); // Start from top, 60 degrees apart
    const value = (dim.value / maxValue) * radius;
    const x = center + value * Math.cos(angle);
    const y = center + value * Math.sin(angle);
    return { x, y, ...dim };
  });

  // Create path string for the filled area
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  // Grid circles
  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 240 240" className="w-full h-auto">
        {/* Grid circles */}
        {gridLevels.map(level => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(level / maxValue) * radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        {/* Grid lines */}
        {dimensions.map((_, index) => {
          const angle = (index * 60 - 90) * (Math.PI / 180);
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}

        {/* Filled area */}
        <path
          d={pathData}
          fill="hsl(var(--primary))"
          fillOpacity="0.2"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />

        {/* Data points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="hsl(var(--primary))"
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {dimensions.map((dim, index) => {
          const angle = (index * 60 - 90) * (Math.PI / 180);
          const labelRadius = radius + 25;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          
          return (
            <g key={index}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-semibold"
                fill="hsl(var(--foreground))"
              >
                {dim.label}
              </text>
              <text
                x={x}
                y={y + 12}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs"
                fill="hsl(var(--muted-foreground))"
              >
                {dim.value}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {dimensions.map((dim, index) => (
          <div key={index} className="text-center">
            <div className="text-sm font-medium">{dim.label}</div>
            <div className="text-xs text-muted-foreground">{dim.description}</div>
            <div className="text-lg font-bold text-primary">{dim.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}