interface MiniChartProps {
  data: Record<string, number | string>[];
  valueKey: string;
  color: string;
  height?: number;
}

export function MiniChart({ data, valueKey, color, height = 50 }: MiniChartProps) {
  if (!data?.length) return null;
  const vals = data.map((d) => Number(d[valueKey]));
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const W = 100;
  const H = height;
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * W},${H - ((v - min) / range) * H}`).join(" ");
  const lastY = H - ((vals[vals.length - 1] - min) / range) * H;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height, display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx={W} cy={lastY} r="3" fill={color} />
    </svg>
  );
}
