"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WeeklyProgram, DailyProgram } from "../types/program";

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Program data
  const [weeklyProgram, setWeeklyProgram] = useState<WeeklyProgram | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string>("");

  // Daily program posters
  const [dailyPosterFiles, setDailyPosterFiles] = useState<{ [key: string]: File }>({});
  const [dailyPosterPreviews, setDailyPosterPreviews] = useState<{ [key: string]: string }>({});

  // Get current week dates
  const getCurrentWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    monday.setDate(now.getDate() + diff);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
      startDate: monday.toISOString().split("T")[0],
      endDate: sunday.toISOString().split("T")[0],
    };
  };

  // Initialize with default data
  useEffect(() => {
    if (isAuthenticated) {
      loadCurrentProgram();
    }
  }, [isAuthenticated]);

  const loadCurrentProgram = async () => {
    try {
      const response = await fetch("/api/get-program");
      const data = await response.json();

      if (data.currentWeek) {
        setWeeklyProgram(data.currentWeek);
        setPosterPreview(data.currentWeek.posterUrl);

        // Load daily poster previews
        const dailyPreviews: { [key: string]: string } = {};
        data.currentWeek.dailyPrograms.forEach((program: DailyProgram) => {
          if (program.posterUrl) {
            dailyPreviews[program.day] = program.posterUrl;
          }
        });
        setDailyPosterPreviews(dailyPreviews);
      } else {
        // Initialize with default template
        const dates = getCurrentWeekDates();
        setWeeklyProgram({
          id: Date.now().toString(),
          startDate: dates.startDate,
          endDate: dates.endDate,
          posterUrl: "",
          dailyPrograms: [
            {
              day: "Monday",
              title: "Sensational Karaoke",
              host: "Kowa the Great",
              description: "Sing your heart out with Kowa the Great!",
              highlights: ["Live karaoke", "Pro sound system", "Drink specials"],
            },
            {
              day: "Tuesday",
              title: "Wine & Dine",
              host: "Chef's Special",
              description: "Elegant evening of fine wines and gourmet cuisine.",
              highlights: ["Premium wines", "Gourmet menu", "Acoustic music"],
            },
            {
              day: "Wednesday",
              title: "Wet & Wild",
              host: "DJ Ricky",
              description: "Mid-week madness with DJ Ricky!",
              highlights: ["DJ Ricky", "Drink specials", "Dance floor energy"],
            },
            {
              day: "Thursday",
              title: "Afro Piano Night",
              host: "DJ Ricky",
              description: "Groove to smooth Afro Piano sounds.",
              highlights: ["Afro Piano", "Soulful vibes", "All night dancing"],
            },
            {
              day: "Friday",
              title: "Booty Bum Friday",
              host: "DJ Mufasa & MC Konki",
              description: "The legendary weekend kickoff!",
              highlights: ["DJ Mufasa & MC Konki", "Hip-hop & Dancehall", "VIP service"],
            },
            {
              day: "Saturday",
              title: "Saturday Night Live",
              host: "DJ Ramoz",
              description: "Epic Saturday night party with DJ Ramoz.",
              highlights: ["DJ Ramoz", "Top 40 hits", "VIP tables"],
            },
            {
              day: "Sunday",
              title: "Afro Spook Sunday",
              host: "Mvazi, Teekay & Saul Bucho",
              description: "Triple DJ lineup with the best Afrobeat and Amapiano.",
              highlights: ["3 DJs", "Afrobeat & Amapiano", "Sunday vibes"],
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error loading program:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verify password by making a test API call
    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setAuthError("");
        localStorage.setItem("adminAuth", password);
      } else {
        setAuthError("Invalid password");
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem("adminAuth");
    if (savedAuth) {
      // Verify saved password
      fetch('/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: savedAuth }),
      }).then(response => {
        if (response.ok) {
          setPassword(savedAuth);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("adminAuth");
        }
      });
    }
  }, []);

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateDailyProgram = (index: number, field: keyof DailyProgram, value: string | string[]) => {
    if (!weeklyProgram) return;

    const updatedPrograms = [...weeklyProgram.dailyPrograms];
    updatedPrograms[index] = {
      ...updatedPrograms[index],
      [field]: value,
    };

    setWeeklyProgram({
      ...weeklyProgram,
      dailyPrograms: updatedPrograms,
    });
  };

  const updateHighlight = (programIndex: number, highlightIndex: number, value: string) => {
    if (!weeklyProgram) return;

    const updatedPrograms = [...weeklyProgram.dailyPrograms];
    const updatedHighlights = [...updatedPrograms[programIndex].highlights];
    updatedHighlights[highlightIndex] = value;
    updatedPrograms[programIndex] = {
      ...updatedPrograms[programIndex],
      highlights: updatedHighlights,
    };

    setWeeklyProgram({
      ...weeklyProgram,
      dailyPrograms: updatedPrograms,
    });
  };

  const handleDailyPosterUpload = (day: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Store the file
      setDailyPosterFiles(prev => ({ ...prev, [day]: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setDailyPosterPreviews(prev => ({ ...prev, [day]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addHighlight = (programIndex: number) => {
    if (!weeklyProgram) return;

    const updatedPrograms = [...weeklyProgram.dailyPrograms];
    updatedPrograms[programIndex].highlights.push("");

    setWeeklyProgram({
      ...weeklyProgram,
      dailyPrograms: updatedPrograms,
    });
  };

  const removeHighlight = (programIndex: number, highlightIndex: number) => {
    if (!weeklyProgram) return;

    const updatedPrograms = [...weeklyProgram.dailyPrograms];
    updatedPrograms[programIndex].highlights.splice(highlightIndex, 1);

    setWeeklyProgram({
      ...weeklyProgram,
      dailyPrograms: updatedPrograms,
    });
  };

  const handleSave = async () => {
    if (!weeklyProgram) return;

    setLoading(true);
    setSaveStatus("Saving...");

    try {
      let posterUrl = weeklyProgram.posterUrl;

      // Upload weekly poster if a new one was selected
      if (posterFile) {
        setSaveStatus("Uploading weekly poster...");
        const formData = new FormData();
        formData.append("file", posterFile);

        const uploadResponse = await fetch("/api/upload-image", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${password}`,
          },
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload weekly poster");
        }

        const uploadData = await uploadResponse.json();
        posterUrl = uploadData.imageUrl;
      }

      // Upload daily posters if new ones were selected
      const updatedDailyPrograms = [...weeklyProgram.dailyPrograms];

      for (let i = 0; i < updatedDailyPrograms.length; i++) {
        const day = updatedDailyPrograms[i].day;
        if (dailyPosterFiles[day]) {
          setSaveStatus(`Uploading ${day} poster...`);
          const formData = new FormData();
          formData.append("file", dailyPosterFiles[day]);

          const uploadResponse = await fetch("/api/upload-image", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${password}`,
            },
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload ${day} poster`);
          }

          const uploadData = await uploadResponse.json();
          updatedDailyPrograms[i].posterUrl = uploadData.imageUrl;
        }
      }

      setSaveStatus("Saving program data...");

      // Update the program data
      const updatedProgram = {
        ...weeklyProgram,
        posterUrl,
        dailyPrograms: updatedDailyPrograms,
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/update-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({
          currentWeek: updatedProgram,
          previousWeeks: [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        console.error("Save failed:", errorData);
        throw new Error(errorData.error || "Failed to save program");
      }

      const result = await response.json();
      console.log("Save successful:", result);

      setSaveStatus("✓ Saved successfully!");
      setWeeklyProgram(updatedProgram);
      setPosterFile(null);
      setDailyPosterFiles({});
      setDailyPosterPreviews({});

      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      console.error("Error saving program:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setSaveStatus(`✗ Error: ${errorMessage}`);
      setTimeout(() => setSaveStatus(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    localStorage.removeItem("adminAuth");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-amber-500/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-block relative mb-4">
                <Image
                  src="/logo02.png"
                  alt="Club Cocobongo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h1 className="text-3xl font-black text-white mb-2">Admin Portal</h1>
              <p className="text-white/60">Enter password to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {authError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-3 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-amber-500/20"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      {/* Header */}
      <nav className="bg-black/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/logo02.png"
                alt="Club Cocobongo"
                width={50}
                height={50}
                className="object-contain"
              />
              <div>
                <h1 className="text-xl font-black text-white">Admin Portal</h1>
                <p className="text-white/60 text-sm">Program Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {weeklyProgram && (
          <div className="space-y-8">
            {/* Save Status Bar */}
            {saveStatus && (
              <div className={`fixed top-24 right-6 z-50 px-6 py-3 rounded-xl shadow-lg backdrop-blur-xl ${
                saveStatus.includes("✓")
                  ? "bg-green-500/20 border border-green-500/30 text-green-400"
                  : saveStatus.includes("✗")
                  ? "bg-red-500/20 border border-red-500/30 text-red-400"
                  : "bg-amber-500/20 border border-amber-500/30 text-amber-400"
              }`}>
                {saveStatus}
              </div>
            )}

            {/* Week Dates */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Week Schedule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Start Date (Monday)
                  </label>
                  <input
                    type="date"
                    value={weeklyProgram.startDate}
                    onChange={(e) =>
                      setWeeklyProgram({ ...weeklyProgram, startDate: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    End Date (Sunday)
                  </label>
                  <input
                    type="date"
                    value={weeklyProgram.endDate}
                    onChange={(e) =>
                      setWeeklyProgram({ ...weeklyProgram, endDate: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Weekly Poster Upload */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Weekly Program Poster</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Upload Poster Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePosterUpload}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-black hover:file:bg-amber-400 file:cursor-pointer focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>

                {posterPreview && (
                  <div className="relative w-full max-w-2xl mx-auto">
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={posterPreview}
                        alt="Poster preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Daily Programs */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Daily Programs</h2>
              <div className="space-y-6">
                {weeklyProgram.dailyPrograms.map((program, index) => (
                  <div
                    key={program.day}
                    className="bg-black/40 rounded-xl p-6 border border-white/10 space-y-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-amber-400">{program.day}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">
                          Event Title
                        </label>
                        <input
                          type="text"
                          value={program.title}
                          onChange={(e) => updateDailyProgram(index, "title", e.target.value)}
                          className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                          placeholder="e.g., Karaoke Night"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">
                          Host/DJ
                        </label>
                        <input
                          type="text"
                          value={program.host}
                          onChange={(e) => updateDailyProgram(index, "host", e.target.value)}
                          className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                          placeholder="e.g., DJ Mufasa"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm font-medium mb-2">
                        Description
                      </label>
                      <textarea
                        value={program.description}
                        onChange={(e) => updateDailyProgram(index, "description", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                        placeholder="Describe the event..."
                      />
                    </div>

                    {/* Daily Program Poster Upload */}
                    <div>
                      <label className="block text-white/70 text-sm font-medium mb-2">
                        Daily Poster Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleDailyPosterUpload(program.day, e)}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-black hover:file:bg-amber-400 file:cursor-pointer focus:outline-none focus:border-amber-500/50 transition-colors text-sm"
                      />

                      {/* Preview current or new poster */}
                      {(dailyPosterPreviews[program.day] || program.posterUrl) && (
                        <div className="mt-3 relative w-full max-w-xs">
                          <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10">
                            <img
                              src={dailyPosterPreviews[program.day] || program.posterUrl}
                              alt={`${program.day} poster`}
                              className="w-full h-full object-cover"
                            />
                            {dailyPosterPreviews[program.day] && (
                              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                New
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-white/70 text-sm font-medium">
                          Highlights
                        </label>
                        <button
                          type="button"
                          onClick={() => addHighlight(index)}
                          className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                        >
                          + Add Highlight
                        </button>
                      </div>
                      <div className="space-y-2">
                        {program.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={highlight}
                              onChange={(e) => updateHighlight(index, hIndex, e.target.value)}
                              className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                              placeholder="Enter highlight"
                            />
                            <button
                              type="button"
                              onClick={() => removeHighlight(index, hIndex)}
                              className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="sticky bottom-6 flex justify-center">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold px-12 py-4 rounded-xl hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 text-lg"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

