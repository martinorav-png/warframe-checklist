const BASE_URL = "https://api.warframestat.us";

/**
 * Search items by name query.
 * @param {string} query
 * @param {number} limit
 * @returns {Promise<Array<{ name: string, type: string }>>}
 */
export async function searchItems(query, limit = 8) {
  if (!query || query.trim().length < 2) return [];

  const res = await fetch(
    `${BASE_URL}/items/search/${encodeURIComponent(query.trim())}?language=en`
  );

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const data = await res.json();

  if (!Array.isArray(data)) return [];

  return data.slice(0, limit).map((item) => ({
    name: item.name ?? "Unknown",
    type: item.type ?? item.category ?? "",
    uniqueName: item.uniqueName ?? "",
  }));
}
