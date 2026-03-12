import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { searchItems } from "../lib/api";

export function Autocomplete({ value, onChange, onSelect, placeholder }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedValue = useDebounce(value, 300);
  const listRef = useRef(null);

  useEffect(() => {
    if (debouncedValue.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    searchItems(debouncedValue)
      .then((results) => {
        if (!cancelled) {
          setSuggestions(results);
          setOpen(results.length > 0);
          setActiveIndex(-1);
        }
      })
      .catch(() => {
        if (!cancelled) setSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [debouncedValue]);

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      pick(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const pick = (suggestion) => {
    onSelect(suggestion);
    setSuggestions([]);
    setOpen(false);
    setActiveIndex(-1);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="
            w-full bg-void-800 border border-void-600 rounded
            px-3 py-2 text-sm text-gray-100 placeholder-gray-600
            focus:outline-none focus:border-lotus/60 focus:bg-void-700
            transition-colors duration-150 font-mono
          "
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-3.5 h-3.5 border border-lotus border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul
          ref={listRef}
          className="
            absolute z-50 left-0 right-0 mt-1
            bg-void-800 border border-void-600 rounded
            shadow-2xl overflow-hidden animate-slide-down
          "
        >
          {suggestions.map((s, i) => (
            <li
              key={s.uniqueName || i}
              onMouseDown={() => pick(s)}
              className={`
                flex items-center gap-3 px-3 py-2 cursor-pointer
                text-sm transition-colors duration-100 select-none
                ${i === activeIndex
                  ? "bg-lotus/10 text-lotus"
                  : "text-gray-300 hover:bg-void-700 hover:text-gray-100"
                }
                ${i !== suggestions.length - 1 ? "border-b border-void-700" : ""}
              `}
            >
              <div className="w-8 h-8 flex-shrink-0 rounded overflow-hidden bg-void-900 flex items-center justify-center">
                {s.imageUrl ? (
                  <img
                    src={s.imageUrl}
                    alt=""
                    className="w-full h-full object-contain"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                ) : (
                  <span className="text-gray-700 text-xs">?</span>
                )}
              </div>
              <span className="font-mono truncate flex-1">{s.name}</span>
              {s.type && (
                <span className="text-xs text-gray-600 flex-shrink-0 uppercase tracking-wider">
                  {s.type}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}