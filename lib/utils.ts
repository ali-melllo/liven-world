import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, isToday, isYesterday, differenceInDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatRelativeDateTime(dateString: string) {
  const date = new Date(dateString);

  if (isToday(date)) {
    return `Today, ${format(date, "h:mm a")}`;
  }

  if (isYesterday(date)) {
    return `Yesterday, ${format(date, "h:mm a")}`;
  }

  const daysDiff = differenceInDays(new Date(), date);

  if (daysDiff > 1 && daysDiff <= 7) {
    return `${daysDiff} days ago, ${format(date, "h:mm a")}`;
  }

  // fallback for older dates
  return format(date, "MMM d, yyyy, h:mm a");
}
