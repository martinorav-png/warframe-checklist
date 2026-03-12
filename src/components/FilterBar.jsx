import { CATEGORIES } from "../lib/categories";

export function FilterBar({ activeFilter, onFilter, showDone, onToggleShowDone, onClearCompleted, hasCompleted }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => onFilter(c)}
            className={`
              text-xs px-2.5 py-1 rounded border font-mono
              transition-colors duration-150
              ${activeFilter === c
                ? "bg-lotus/15 border-lotus/50 text-lotus"
                : "bg-void-800 border-void-600 text-gray-500 hover:text-gray-300 hover:border-void-500"
              }
            `}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onToggleShowDone}
          className="text-xs text-gray-600 hover:text-gray-400 font-mono transition-colors duration-150"
        >
          {showDone ? "— hide obtained" : "+ show obtained"}
        </button>

        {hasCompleted && (
          <button
            onClick={onClearCompleted}
            className="text-xs text-gray-600 hover:text-red-400 font-mono transition-colors duration-150"
          >
            clear obtained
          </button>
        )}
      </div>
    </div>
  );
}
