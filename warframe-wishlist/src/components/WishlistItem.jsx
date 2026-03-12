import { CATEGORY_CONFIG } from "../lib/categories";

export function WishlistItem({ item, onToggle, onRemove }) {
  const config = CATEGORY_CONFIG[item.category] ?? CATEGORY_CONFIG.Other;

  return (
    <div
      className={`
        group flex items-start gap-3 px-3 py-3 rounded-lg border
        transition-all duration-200
        ${item.done
          ? "bg-void-900/40 border-void-700/40 opacity-50"
          : "bg-void-800 border-void-600 hover:border-void-500"
        }
      `}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(item.id)}
        aria-label={item.done ? "Mark as not obtained" : "Mark as obtained"}
        className={`
          mt-0.5 w-4 h-4 rounded border flex-shrink-0
          flex items-center justify-center
          transition-all duration-150
          ${item.done
            ? "bg-lotus border-lotus"
            : "border-void-500 hover:border-lotus/60"
          }
        `}
      >
        {item.done && (
          <svg className="w-2.5 h-2.5 text-void-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm font-mono ${
              item.done ? "line-through text-gray-600" : "text-gray-100"
            }`}
          >
            {item.name}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded font-display font-semibold tracking-wider ${config.badge}`}>
            {item.category}
          </span>
        </div>
        {item.note && (
          <p className="text-xs text-gray-600 mt-0.5 font-mono truncate">
            {item.note}
          </p>
        )}
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
        className="
          opacity-0 group-hover:opacity-100
          text-void-500 hover:text-red-400
          transition-all duration-150 text-lg leading-none flex-shrink-0
        "
      >
        ×
      </button>
    </div>
  );
}
