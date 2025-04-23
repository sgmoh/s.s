import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(time: string): string {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function getUKTime(): string {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    timeZone: 'Europe/London',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function getUKDate(): string {
  const now = new Date();
  return now.toLocaleDateString('en-GB', { 
    timeZone: 'Europe/London',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '•••';
}

export function maskApiKey(key: string): string {
  if (!key) return '';
  const firstSix = key.substring(0, 8);
  const lastFour = key.substring(key.length - 4);
  return `${firstSix}•••••••••••••••••${lastFour}`;
}
