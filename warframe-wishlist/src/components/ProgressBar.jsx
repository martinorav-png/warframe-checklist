export function ProgressBar({ done, total }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-gray-600 font-mono">
          {done}/{total} obtained
        </span>
        <span className="text-xs text-gray-700 font-mono">{pct}%</span>
      </div>
      <div className="h-px bg-void-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-lotus transition-all duration-500 ease-out rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
