// Data types for the program management system

export interface DailyProgram {
  day: string; // Monday, Tuesday, etc.
  title: string;
  host: string;
  description: string;
  highlights: string[];
  posterUrl?: string; // URL to the daily program poster
}

export interface WeeklyProgram {
  id: string;
  startDate: string; // ISO date string for Monday
  endDate: string; // ISO date string for Sunday
  posterUrl: string; // URL to the main weekly poster
  dailyPrograms: DailyProgram[];
  createdAt: string;
  updatedAt: string;
}

export interface ProgramData {
  currentWeek: WeeklyProgram;
  previousWeeks: WeeklyProgram[];
}

