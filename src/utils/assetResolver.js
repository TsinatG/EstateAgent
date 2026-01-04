// here i've used utility to resolve asset URLs at runtime for paths stored in JSON
// It maps '/src/assets/**/*' to built URLs using Vite's import.meta.glob

// Eagerly import all assets under src/assets as URLs
const assetMap = import.meta.glob("/src/assets/**/*", {
  eager: true,
  as: "url",
});

export function resolveAssetUrl(path) {
  if (!path) return "";
  // Support paths starting with '/src/assets', './src/assets', or already public ones
  const candidates = [path];
  // Normalize common variants
  if (path.startsWith("./")) candidates.push(path.slice(1));
  if (!path.startsWith("/")) candidates.push("/" + path);

  for (const p of candidates) {
    if (assetMap[p]) return assetMap[p];
  }
  // If not found in the bundle map (e.g., from public/), return original path
  return path;
}
