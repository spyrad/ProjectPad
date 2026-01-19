import { describe, it, expect, beforeEach, vi } from 'vitest';
import { cn, formatRelativeDate, groupNotesByDate } from './utils';
import type { Note } from '@/types/entities';

describe('cn (className merger)', () => {
  it('merges class names correctly', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const isInactive = false;
    expect(cn('base', isActive && 'active', isInactive && 'inactive')).toBe('base active');
  });

  it('merges Tailwind classes correctly (last wins)', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
  });
});

describe('formatRelativeDate', () => {
  beforeEach(() => {
    // Mock current date to 2024-01-15 12:00:00
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15T12:00:00'));
  });

  it('returns "Heute" for today', () => {
    const today = '2024-01-15T10:00:00';
    expect(formatRelativeDate(today)).toBe('Heute');
  });

  it('returns "Gestern" for yesterday', () => {
    const yesterday = '2024-01-14T10:00:00';
    expect(formatRelativeDate(yesterday)).toBe('Gestern');
  });

  it('returns formatted date for older dates', () => {
    const oldDate = '2024-01-10T10:00:00';
    expect(formatRelativeDate(oldDate)).toBe('10.01.2024');
  });

  it('returns formatted date for future dates', () => {
    const futureDate = '2024-01-20T10:00:00';
    expect(formatRelativeDate(futureDate)).toBe('20.01.2024');
  });
});

describe('groupNotesByDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15T12:00:00'));
  });

  const createMockNote = (id: string, created_at: string): Note => ({
    id,
    user_id: 'user-1',
    project_id: null,
    content: `Note ${id}`,
    created_at,
    updated_at: created_at,
    deleted_at: null,
  });

  it('groups notes by date correctly', () => {
    const notes: Note[] = [
      createMockNote('1', '2024-01-15T10:00:00'), // Heute
      createMockNote('2', '2024-01-15T14:00:00'), // Heute
      createMockNote('3', '2024-01-14T10:00:00'), // Gestern
      createMockNote('4', '2024-01-10T10:00:00'), // 10.01.2024
    ];

    const grouped = groupNotesByDate(notes);

    expect(grouped).toHaveLength(3);
    expect(grouped[0].label).toBe('Heute');
    expect(grouped[0].notes).toHaveLength(2);
    expect(grouped[1].label).toBe('Gestern');
    expect(grouped[1].notes).toHaveLength(1);
    expect(grouped[2].label).toBe('10.01.2024');
    expect(grouped[2].notes).toHaveLength(1);
  });

  it('sorts groups by date (newest first)', () => {
    const notes: Note[] = [
      createMockNote('1', '2024-01-10T10:00:00'),
      createMockNote('2', '2024-01-15T10:00:00'),
      createMockNote('3', '2024-01-14T10:00:00'),
    ];

    const grouped = groupNotesByDate(notes);

    expect(grouped[0].label).toBe('Heute'); // Newest
    expect(grouped[1].label).toBe('Gestern');
    expect(grouped[2].label).toBe('10.01.2024'); // Oldest
  });

  it('handles empty array', () => {
    const grouped = groupNotesByDate([]);
    expect(grouped).toHaveLength(0);
  });

  it('handles single note', () => {
    const notes: Note[] = [createMockNote('1', '2024-01-15T10:00:00')];
    const grouped = groupNotesByDate(notes);

    expect(grouped).toHaveLength(1);
    expect(grouped[0].label).toBe('Heute');
    expect(grouped[0].notes).toHaveLength(1);
  });
});
