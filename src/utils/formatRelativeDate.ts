export function formatRelativeDate(date: string | Date) {
  const parsedDate = typeof date === 'string'
    ? new Date(date)
    : date;

  const diff = Date.now() - parsedDate.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `há ${minutes} min`;
  if (hours < 24) return `há ${hours}h`;
  return `há ${days} dias`;
}
