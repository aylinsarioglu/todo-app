export function parseTodoDate(date?: string): Date | null {
  if (!date) {
    return null;
  }

  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function isToday(date?: string): boolean {
  const parsed = parseTodoDate(date);
  if (!parsed) {
    return false;
  }

  const now = new Date();
  return (
    parsed.getFullYear() === now.getFullYear() &&
    parsed.getMonth() === now.getMonth() &&
    parsed.getDate() === now.getDate()
  );
}

export function isPast(date?: string): boolean {
  const parsed = parseTodoDate(date);
  if (!parsed) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parsed.getTime() < today.getTime();
}
