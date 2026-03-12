import { useState, useEffect } from "react";

const STORAGE_KEY = "warframe-wishlist-v1";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage unavailable, silently fail
  }
}

/**
 * Manages the wishlist state with localStorage persistence.
 */
export function useWishlist() {
  const [items, setItems] = useState(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  const addItem = ({ name, category, note }) => {
    if (!name.trim()) return;
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        category,
        note: note.trim(),
        done: false,
        addedAt: Date.now(),
      },
    ]);
  };

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompleted = () => {
    setItems((prev) => prev.filter((item) => !item.done));
  };

  return { items, addItem, toggleItem, removeItem, clearCompleted };
}
