import { useState } from "react";
import { CATEGORIES } from "../lib/categories";
import { Autocomplete } from "./Autocomplete";

export function AddItemForm({ onAdd }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState("Warframe");
  const [note, setNote] = useState("");

  const handleSelect = (suggestion) => {
    setName(suggestion.name);
    setImageUrl(suggestion.imageUrl ?? null);
  };

  const submit = () => {
    if (!name.trim()) return;
    onAdd({ name, category, note, imageUrl });
    setName("");
    setImageUrl(null);
    setNote("");
  };

  return (
    <div className="bg-void-800 border border-void-600 rounded-lg p-4 space-y-3">
      <Autocomplete
        value={name}
        onChange={(val) => { setName(val); setImageUrl(null); }}
        onSelect={handleSelect}
        placeholder="Search item name…"
      />

      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            bg-void-900 border border-void-600 rounded
            px-3 py-2 text-sm text-gray-300
            focus:outline-none focus:border-lotus/60
            transition-colors duration-150 font-mono flex-shrink-0
          "
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Note (optional)"
          className="
            flex-1 bg-void-900 border border-void-600 rounded
            px-3 py-2 text-sm text-gray-400 placeholder-gray-600
            focus:outline-none focus:border-lotus/60
            transition-colors duration-150 font-mono
          "
        />
      </div>

      <button
        onClick={submit}
        className="
          w-full py-2 rounded text-sm font-display font-semibold
          tracking-widest uppercase
          bg-lotus/10 border border-lotus/30 text-lotus
          hover:bg-lotus/20 hover:border-lotus/60
          active:scale-[0.99] transition-all duration-150
        "
      >
        + Add to Wishlist
      </button>
    </div>
  );
}