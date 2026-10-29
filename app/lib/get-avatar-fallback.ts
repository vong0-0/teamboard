/** Returns up to two initials for an avatar fallback. */
export function getAvatarFallback(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "?";
  if (parts.length === 1) return Array.from(parts[0])[0].toUpperCase();

  return `${Array.from(parts[0])[0]}${Array.from(parts.at(-1)!)[0]}`.toUpperCase();
}
