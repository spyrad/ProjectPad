import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Note } from "@/types/entities"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date helper functions for Timeline

/**
 * Check if two dates are the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Format date relative to today (Heute, Gestern, or DD.MM.YYYY)
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(date, today)) {
    return 'Heute';
  }

  if (isSameDay(date, yesterday)) {
    return 'Gestern';
  }

  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Group notes by date (Heute, Gestern, or specific date)
 */
export interface GroupedNotes {
  label: string;
  date: Date;
  notes: Note[];
}

export function groupNotesByDate(notes: Note[]): GroupedNotes[] {
  const groups = new Map<string, GroupedNotes>();

  notes.forEach((note) => {
    const noteDate = new Date(note.created_at);
    const label = formatRelativeDate(note.created_at);

    if (!groups.has(label)) {
      groups.set(label, {
        label,
        date: noteDate,
        notes: [],
      });
    }

    groups.get(label)!.notes.push(note);
  });

  // Convert to array and sort by date (newest first)
  return Array.from(groups.values()).sort((a, b) => b.date.getTime() - a.date.getTime());
}
