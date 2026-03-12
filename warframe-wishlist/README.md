# Warframe Wishlist

A minimal, dark-themed wishlist tracker for Warframe. Live item search powered by the [warframestat.us](https://warframestat.us) community API. Your list persists in localStorage so it survives page refreshes.

## Features

- **Live autocomplete** — searches item names as you type via `warframestat.us`
- **Categories** — Warframe, Weapon, Companion, Mod, Cosmetic, Resource, Other
- **Persistent** — saved to localStorage, no account needed
- **Filter & hide** — filter by category, hide obtained items, clear completed
- **Progress bar** — tracks how much of your list you've obtained

## Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [warframestat.us API](https://docs.warframestat.us/)

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Autocomplete.jsx   # Live search dropdown
│   ├── AddItemForm.jsx    # Form for adding items
│   ├── WishlistItem.jsx   # Single list item row
│   ├── FilterBar.jsx      # Category filters + toggles
│   └── ProgressBar.jsx    # Obtained progress indicator
├── hooks/
│   ├── useWishlist.js     # Item state + localStorage persistence
│   └── useDebounce.js     # Debounce helper
├── lib/
│   ├── api.js             # warframestat.us API calls
│   └── categories.js      # Category definitions + colors
├── App.jsx
├── main.jsx
└── index.css
```
