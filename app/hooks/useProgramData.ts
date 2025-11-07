"use client";

import { useState, useEffect } from "react";
import type { WeeklyProgram, DailyProgram } from "../types/program";

// Default fallback data
const defaultPrograms: DailyProgram[] = [
  {
    day: "Monday",
    title: "Sensational Karaoke",
    host: "Kowa the Great",
    description: "Sing your heart out with Kowa the Great! Wide song selection and special drink offers.",
    highlights: ["Live karaoke", "Pro sound system", "Drink specials"],
    posterUrl: "",
  },
  {
    day: "Tuesday",
    title: "Wine & Dine",
    host: "Chef's Special",
    description: "Elegant evening of fine wines and gourmet cuisine. Perfect for date nights.",
    highlights: ["Premium wines", "Gourmet menu", "Acoustic music"],
    posterUrl: "",
  },
  {
    day: "Wednesday",
    title: "Wet & Wild",
    host: "DJ Ricky",
    description: "Mid-week madness with DJ Ricky! Electrifying beats and high-energy vibes.",
    highlights: ["DJ Ricky", "Drink specials", "Dance floor energy"],
    posterUrl: "",
  },
  {
    day: "Thursday",
    title: "Afro Piano Night",
    host: "DJ Ricky",
    description: "Groove to smooth Afro Piano sounds. Soulful African beats and piano melodies.",
    highlights: ["Afro Piano", "Soulful vibes", "All night dancing"],
    posterUrl: "",
  },
  {
    day: "Friday",
    title: "Booty Bum Friday",
    host: "DJ Mufasa & MC Konki",
    description: "The legendary weekend kickoff! Hip-hop, dancehall, and Afrobeat all night.",
    highlights: ["DJ Mufasa & MC Konki", "Hip-hop & Dancehall", "VIP service"],
    posterUrl: "",
  },
  {
    day: "Saturday",
    title: "Halloween Masquerade Party",
    host: "DJ Ramoz",
    description: "Special Halloween Masquerade with DJ Ramoz. Costume contests and spine-tingling beats.",
    highlights: ["Masquerade theme", "Costume contest", "DJ Ramoz"],
    posterUrl: "",
  },
  {
    day: "Sunday",
    title: "Afro Spook Sunday",
    host: "Mvazi, Teekay & Saul Bucho",
    description: "Triple DJ lineup with the best Afrobeat and Amapiano. End your week on a high note.",
    highlights: ["3 DJs", "Afrobeat & Amapiano", "Sunday vibes"],
    posterUrl: "",
  },
];

export function useProgramData() {
  const [programData, setProgramData] = useState<WeeklyProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await fetch("/api/get-program");
        if (!response.ok) {
          throw new Error("Failed to fetch program");
        }

        const data = await response.json();

        if (data.currentWeek && data.currentWeek.dailyPrograms.length > 0) {
          setProgramData(data.currentWeek);
        } else {
          // Use default programs if no data
          const now = new Date();
          const dayOfWeek = now.getDay();
          const monday = new Date(now);
          const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
          monday.setDate(now.getDate() + diff);
          monday.setHours(0, 0, 0, 0);

          const sunday = new Date(monday);
          sunday.setDate(monday.getDate() + 6);

          setProgramData({
            id: Date.now().toString(),
            startDate: monday.toISOString().split("T")[0],
            endDate: sunday.toISOString().split("T")[0],
            posterUrl: "",
            dailyPrograms: defaultPrograms,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.error("Error fetching program:", err);
        setError("Failed to load program data");

        // Use default programs on error
        const now = new Date();
        const dayOfWeek = now.getDay();
        const monday = new Date(now);
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        monday.setDate(now.getDate() + diff);
        monday.setHours(0, 0, 0, 0);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        setProgramData({
          id: Date.now().toString(),
          startDate: monday.toISOString().split("T")[0],
          endDate: sunday.toISOString().split("T")[0],
          posterUrl: "",
          dailyPrograms: defaultPrograms,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, []);

  return { programData, loading, error };
}

