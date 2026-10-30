type DateFormatOptions = Intl.DateTimeFormatOptions;

function parseDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T12:00:00`)
    : new Date(value);
}

export function formatDate(value: string, options: DateFormatOptions) {
  return new Intl.DateTimeFormat("en-US", options).format(parseDate(value));
}

export function formatShortDate(value: string) {
  return formatDate(value, { month: "short", day: "2-digit" }).toUpperCase();
}

export function formatRelativeTime(value: string) {
  const minutes = Math.max(
    0,
    Math.floor((Date.now() - parseDate(value).getTime()) / 60000),
  );

  if (minutes < 1) return "JUST NOW";
  if (minutes < 60) return `${minutes}M AGO`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}H AGO`;
  return `${Math.floor(hours / 24)}D AGO`;
}
