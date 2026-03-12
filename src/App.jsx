import { useState } from "react";
import { useWishlist } from "./hooks/useWishlist";
import { AddItemForm } from "./components/AddItemForm";
import { WishlistItem } from "./components/WishlistItem";
import { FilterBar } from "./components/FilterBar";
import { ProgressBar } from "./components/ProgressBar";

export default function App() {
  const { items, addItem, toggleItem, removeItem, clearCompleted } = useWishlist();
  const [filter, setFilter] = useState("All");
  const [showDone, setShowDone] = useState(true);

  const filtered = items.filter((item) => {
    if (!showDone && item.done) return false;
    if (filter !== "All" && item.category !== filter) return false;
    return true;
  });

  const doneCount = items.filter((i) => i.done).length;
  const hasCompleted = doneCount > 0;

  return (
    <div className="min-h-screen bg-void-950 text-gray-100 px-4 py-10">
      {/* Subtle background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,200,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,200,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-lg mx-auto space-y-6">

        {/* Header */}
        <header className="space-y-1">
          <div className="flex items-end gap-3">
            <h1 className="font-display text-3xl font-bold tracking-widest uppercase text-lotus text-glow-lotus">
              Wishlist
            </h1>
            <span className="font-display text-sm text-gray-600 tracking-widest mb-1 uppercase">
              Warframe
            </span>
          </div>
          {items.length > 0 && (
            <ProgressBar done={doneCount} total={items.length} />
          )}
        </header>

        {/* Add form */}
        <AddItemForm onAdd={addItem} />

        {/* Filters (only show if there's something to filter) */}
        {items.length > 0 && (
          <FilterBar
            activeFilter={filter}
            onFilter={setFilter}
            showDone={showDone}
            onToggleShowDone={() => setShowDone((v) => !v)}
            onClearCompleted={clearCompleted}
            hasCompleted={hasCompleted}
          />
        )}

        {/* List */}
        <div className="space-y-1.5">
          {filtered.length === 0 && items.length === 0 && (
            <p className="text-center text-gray-700 text-sm font-mono py-16">
              nothing here yet — start adding items
            </p>
          )}
          {filtered.length === 0 && items.length > 0 && (
            <p className="text-center text-gray-700 text-sm font-mono py-10">
              no items match this filter
            </p>
          )}
          {filtered.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              onToggle={toggleItem}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="pt-4 border-t border-void-800">
          <p className="text-xs text-gray-700 font-mono text-center">
            data from{" "}
            <a
              href="https://warframestat.us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-lotus transition-colors"
            >
              warframestat.us
            </a>
            {" · "}saved locally in your browser
          </p>
        </footer>
      </div>
    </div>
  );
}
