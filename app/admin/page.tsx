"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WeeklyProgram, DailyProgram } from "../types/program";

interface HighlightItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  artist: string;
  title: string;
}

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
  const [changesSaved, setChangesSaved] = useState(false);

  // Highlights data
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [highlightFiles, setHighlightFiles] = useState<{ [key: string]: File }>({});
  const [highlightPreviews, setHighlightPreviews] = useState<{ [key: string]: string }>({});

  // Upload progress tracking
  const [uploadProgress, setUploadProgress] = useState({
    isUploading: false,
    currentFile: '',
    totalFiles: 0,
    completedFiles: 0,
    currentFileName: '',
    stage: '', // 'uploading', 'saving', 'complete'
  });

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
      loadHighlights();
    }
  }, [isAuthenticated]);

  const loadHighlights = async () => {
    try {
      const response = await fetch("/api/get-highlights");
      const data = await response.json();
      if (data.highlights) {
        setHighlights(data.highlights);
      }
    } catch (error) {
      console.error("Error loading highlights:", error);
    }
  };

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

  const clearDayContent = (programIndex: number) => {
    if (!weeklyProgram) return;

    // Show confirmation dialog
    if (!confirm(`Are you sure you want to clear all content for ${weeklyProgram.dailyPrograms[programIndex].day}?`)) {
      return;
    }

    const updatedPrograms = [...weeklyProgram.dailyPrograms];
    const day = updatedPrograms[programIndex].day;

    // Reset to default empty state
    updatedPrograms[programIndex] = {
      day: day,
      title: "",
      host: "",
      description: "",
      highlights: [],
      posterUrl: ""
    };

    // Clear any pending poster upload for this day
    setDailyPosterFiles(prev => {
      const updated = { ...prev };
      delete updated[day];
      return updated;
    });

    setDailyPosterPreviews(prev => {
      const updated = { ...prev };
      delete updated[day];
      return updated;
    });

    setWeeklyProgram({
      ...weeklyProgram,
      dailyPrograms: updatedPrograms,
    });
  };

  // Highlights management functions
  const addHighlightItem = () => {
    const newHighlight: HighlightItem = {
      id: Date.now().toString(),
      type: 'image',
      src: '',
      artist: '',
      title: '',
    };
    setHighlights([...highlights, newHighlight]);
  };

  const removeHighlightItem = (id: string) => {
    if (!confirm('Are you sure you want to remove this highlight?')) {
      return;
    }
    setHighlights(highlights.filter(h => h.id !== id));
    // Clean up any pending uploads
    setHighlightFiles(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    setHighlightPreviews(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const updateHighlightField = (id: string, field: keyof HighlightItem, value: string) => {
    setHighlights(highlights.map(h =>
      h.id === id ? { ...h, [field]: value } : h
    ));
  };

  const handleHighlightFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Determine type from file
      const type = file.type.startsWith('video/') ? 'video' : 'image';

      // Store the file
      setHighlightFiles(prev => ({ ...prev, [id]: file }));

      // Update highlight type
      updateHighlightField(id, 'type', type);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setHighlightPreviews(prev => ({ ...prev, [id]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveHighlights = async () => {
    setLoading(true);
    setSaveStatus("Preparing to upload highlights...");

    // Count total files to upload
    const filesToUpload = Object.keys(highlightFiles).length;

    setUploadProgress({
      isUploading: true,
      currentFile: '',
      totalFiles: filesToUpload,
      completedFiles: 0,
      currentFileName: '',
      stage: 'uploading',
    });

    try {
      // Upload any new files to Contabo
      const updatedHighlights = [...highlights];
      let uploadedCount = 0;

      for (let i = 0; i < updatedHighlights.length; i++) {
        const highlight = updatedHighlights[i];
        if (highlightFiles[highlight.id]) {
          const file = highlightFiles[highlight.id];

          setUploadProgress(prev => ({
            ...prev,
            currentFile: highlight.artist || 'highlight',
            currentFileName: file.name,
            completedFiles: uploadedCount,
          }));

          setSaveStatus(`Uploading ${highlight.artist || 'highlight'} to cloud...`);
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", "highlights");

          const uploadResponse = await fetch("/api/contabo-upload", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${password}`,
            },
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload ${highlight.artist || 'highlight'}`);
          }

          const uploadData = await uploadResponse.json();
          updatedHighlights[i].src = uploadData.url;
          uploadedCount++;

          setUploadProgress(prev => ({
            ...prev,
            completedFiles: uploadedCount,
          }));
        }
      }

      // Save to API
      setUploadProgress(prev => ({
        ...prev,
        stage: 'saving',
      }));

      setSaveStatus("Saving highlights data...");

      const response = await fetch("/api/update-highlights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ highlights: updatedHighlights }),
      });

      if (!response.ok) {
        throw new Error("Failed to save highlights");
      }

      setUploadProgress(prev => ({
        ...prev,
        stage: 'complete',
      }));

      setSaveStatus("✓ Highlights saved successfully!");
      setHighlights(updatedHighlights);
      setHighlightFiles({});
      setHighlightPreviews({});
      setChangesSaved(true);

      setTimeout(() => {
        setSaveStatus("");
        setUploadProgress({
          isUploading: false,
          currentFile: '',
          totalFiles: 0,
          completedFiles: 0,
          currentFileName: '',
          stage: '',
        });
      }, 3000);
    } catch (error) {
      console.error("Error saving highlights:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setSaveStatus(`✗ Error: ${errorMessage}`);
      setUploadProgress({
        isUploading: false,
        currentFile: '',
        totalFiles: 0,
        completedFiles: 0,
        currentFileName: '',
        stage: '',
      });
      setTimeout(() => setSaveStatus(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!weeklyProgram) return;

    setLoading(true);
    setSaveStatus("Preparing to save...");

    // Count total files to upload
    const filesToUpload = (posterFile ? 1 : 0) + Object.keys(dailyPosterFiles).length;

    setUploadProgress({
      isUploading: true,
      currentFile: '',
      totalFiles: filesToUpload,
      completedFiles: 0,
      currentFileName: '',
      stage: 'uploading',
    });

    try {
      let posterUrl = weeklyProgram.posterUrl;
      let uploadedCount = 0;

      // Upload weekly poster if a new one was selected - USE CONTABO
      if (posterFile) {
        setUploadProgress(prev => ({
          ...prev,
          currentFile: 'Weekly Poster',
          currentFileName: posterFile.name,
          completedFiles: uploadedCount,
        }));

        setSaveStatus("Uploading weekly poster to cloud...");
        const formData = new FormData();
        formData.append("file", posterFile);
        formData.append("folder", "event-posters");

        const uploadResponse = await fetch("/api/contabo-upload", {
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
        posterUrl = uploadData.url;
        uploadedCount++;

        setUploadProgress(prev => ({
          ...prev,
          completedFiles: uploadedCount,
        }));
      }

      // Upload daily posters if new ones were selected - USE CONTABO
      const updatedDailyPrograms = [...weeklyProgram.dailyPrograms];

      for (let i = 0; i < updatedDailyPrograms.length; i++) {
        const day = updatedDailyPrograms[i].day;
        if (dailyPosterFiles[day]) {
          const file = dailyPosterFiles[day];

          setUploadProgress(prev => ({
            ...prev,
            currentFile: `${day} Poster`,
            currentFileName: file.name,
            completedFiles: uploadedCount,
          }));

          setSaveStatus(`Uploading ${day} poster to cloud...`);
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", "event-posters");

          const uploadResponse = await fetch("/api/contabo-upload", {
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
          updatedDailyPrograms[i].posterUrl = uploadData.url;
          uploadedCount++;

          setUploadProgress(prev => ({
            ...prev,
            completedFiles: uploadedCount,
          }));
        }
      }

      setUploadProgress(prev => ({
        ...prev,
        stage: 'saving',
      }));

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

      setUploadProgress(prev => ({
        ...prev,
        stage: 'complete',
      }));

      setSaveStatus("✓ Saved successfully!");
      setChangesSaved(true); // Mark that changes were saved
      setWeeklyProgram(updatedProgram);
      setPosterFile(null);
      setDailyPosterFiles({});
      setDailyPosterPreviews({});

      setTimeout(() => {
        setSaveStatus("");
        setUploadProgress({
          isUploading: false,
          currentFile: '',
          totalFiles: 0,
          completedFiles: 0,
          currentFileName: '',
          stage: '',
        });
      }, 3000);
    } catch (error) {
      console.error("Error saving program:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setSaveStatus(`✗ Error: ${errorMessage}`);
      setUploadProgress({
        isUploading: false,
        currentFile: '',
        totalFiles: 0,
        completedFiles: 0,
        currentFileName: '',
        stage: '',
      });
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
        <div className="max-w-md w-full mx-3 sm:mx-0">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-amber-500/20 shadow-2xl">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-block relative mb-3 sm:mb-4">
                <Image
                  src="/logo02.png"
                  alt="Club Cocobongo"
                  width={60}
                  height={60}
                  className="object-contain sm:w-[80px] sm:h-[80px]"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Admin Portal</h1>
              <p className="text-white/60 text-sm sm:text-base">Enter password to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-white/80 text-xs sm:text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/40 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {authError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg sm:rounded-xl p-3 text-red-400 text-xs sm:text-sm">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-amber-500/20 text-sm sm:text-base"
              >
                Login
              </button>
            </form>

            <div className="mt-4 sm:mt-6 text-center">
              <Link
                href="/"
                className="text-amber-400 hover:text-amber-300 text-xs sm:text-sm font-medium transition-colors"
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
      {/* Upload Progress Modal */}
      {uploadProgress.isUploading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-amber-500/30 shadow-2xl max-w-md w-full mx-4">
            {/* Warning Banner */}
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-red-400 font-bold text-sm mb-1">⚠️ Upload in Progress</h3>
                  <p className="text-red-300/80 text-xs leading-relaxed">
                    <strong>Do not close this window!</strong> Closing or refreshing will cancel the upload and you may lose your progress.
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Status */}
            <div className="text-center mb-6">
              {uploadProgress.stage === 'uploading' && (
                <>
                  <div className="inline-block relative mb-4">
                    <div className="w-20 h-20 border-4 border-white/10 border-t-amber-400 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-10 h-10 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    Uploading to Cloud...
                  </h3>
                  <p className="text-amber-400 text-sm font-medium mb-1">
                    {uploadProgress.currentFile}
                  </p>
                  <p className="text-white/50 text-xs truncate px-4">
                    {uploadProgress.currentFileName}
                  </p>
                </>
              )}

              {uploadProgress.stage === 'saving' && (
                <>
                  <div className="inline-block relative mb-4">
                    <div className="w-20 h-20 border-4 border-white/10 border-t-green-400 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-10 h-10 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    Saving Data...
                  </h3>
                  <p className="text-green-400 text-sm">
                    Almost done!
                  </p>
                </>
              )}

              {uploadProgress.stage === 'complete' && (
                <>
                  <div className="inline-block relative mb-4">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    ✓ Upload Complete!
                  </h3>
                  <p className="text-green-400 text-sm">
                    Your content has been saved successfully
                  </p>
                </>
              )}
            </div>

            {/* Progress Bar */}
            {uploadProgress.totalFiles > 0 && uploadProgress.stage !== 'complete' && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Progress</span>
                  <span>{uploadProgress.completedFiles} / {uploadProgress.totalFiles} files</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                    style={{ width: `${(uploadProgress.completedFiles / uploadProgress.totalFiles) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-blue-400 font-semibold text-xs mb-1">💡 Pro Tip</h4>
                  <p className="text-blue-300/80 text-xs leading-relaxed">
                    For faster uploads, use smaller file sizes. Compress images to under 5MB and videos under 20MB before uploading.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <nav className="bg-black/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Image
                src="/logo02.png"
                alt="Club Cocobongo"
                width={40}
                height={40}
                className="object-contain sm:w-[50px] sm:h-[50px]"
              />
              <div>
                <h1 className="text-base sm:text-xl font-black text-white">Admin Portal</h1>
                <p className="text-white/60 text-xs sm:text-sm hidden sm:block">Program Management</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/"
                onClick={(e) => {
                  if (changesSaved) {
                    e.preventDefault();
                    // Navigate to homepage and force reload to fetch fresh data
                    window.location.href = '/';
                    window.location.reload();
                  }
                }}
                className="text-white/70 hover:text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 sm:gap-2"
              >
                <span className="hidden sm:inline">View Site</span>
                <span className="sm:hidden">Site</span>
                {changesSaved && (
                  <span className="inline-flex items-center justify-center w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Changes saved - click to view updated site"></span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 text-xs sm:text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 max-w-7xl">
        {weeklyProgram && (
          <div className="space-y-4 sm:space-y-8">
            {/* Save Status Bar */}
            {saveStatus && (
              <div className={`fixed top-16 sm:top-24 right-2 sm:right-6 left-2 sm:left-auto z-50 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg backdrop-blur-xl text-xs sm:text-base ${
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
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Week Schedule</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Weekly Program Poster</h2>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-white/70 text-xs sm:text-sm font-medium mb-2">
                    Upload Poster Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePosterUpload}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg sm:rounded-xl text-white text-xs sm:text-sm file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-amber-500 file:text-black hover:file:bg-amber-400 file:cursor-pointer focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                  <p className="text-white/50 text-xs mt-2 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>Recommended: Under 5MB for faster uploads (Max: 10MB)</span>
                  </p>
                </div>

                {posterPreview && (
                  <div className="relative w-full max-w-xs sm:max-w-2xl mx-auto">
                    <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden border border-white/10">
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
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Daily Programs</h2>
              <div className="space-y-4 sm:space-y-6">
                {weeklyProgram.dailyPrograms.map((program, index) => (
                  <div
                    key={program.day}
                    className="bg-black/40 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10 space-y-3 sm:space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-amber-400">{program.day}</h3>
                      <button
                        type="button"
                        onClick={() => clearDayContent(index)}
                        className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 text-xs sm:text-sm font-medium flex items-center justify-center sm:justify-start gap-2"
                        title="Clear all content for this day"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Clear Day
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-white/70 text-xs sm:text-sm font-medium mb-2">
                          Event Title
                        </label>
                        <input
                          type="text"
                          value={program.title}
                          onChange={(e) => updateDailyProgram(index, "title", e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                          placeholder="e.g., Karaoke Night"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 text-xs sm:text-sm font-medium mb-2">
                          Host/DJ
                        </label>
                        <input
                          type="text"
                          value={program.host}
                          onChange={(e) => updateDailyProgram(index, "host", e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                          placeholder="e.g., DJ Mufasa"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-xs sm:text-sm font-medium mb-2">
                        Description
                      </label>
                      <textarea
                        value={program.description}
                        onChange={(e) => updateDailyProgram(index, "description", e.target.value)}
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                        placeholder="Describe the event..."
                      />
                    </div>

                    {/* Daily Program Poster Upload */}
                    <div>
                      <label className="block text-white/70 text-xs sm:text-sm font-medium mb-2">
                        Daily Poster Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleDailyPosterUpload(program.day, e)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg sm:rounded-xl text-white text-xs sm:text-sm file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-amber-500 file:text-black hover:file:bg-amber-400 file:cursor-pointer focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                      <p className="text-white/50 text-xs mt-1.5">
                        💡 Tip: Keep under 5MB for faster uploads
                      </p>

                      {/* Preview current or new poster */}
                      {(dailyPosterPreviews[program.day] || program.posterUrl) && (
                        <div className="mt-3 relative w-full max-w-xs mx-auto sm:mx-0">
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
                        <label className="block text-white/70 text-xs sm:text-sm font-medium">
                          Highlights
                        </label>
                        <button
                          type="button"
                          onClick={() => addHighlight(index)}
                          className="text-amber-400 hover:text-amber-300 text-xs sm:text-sm font-medium transition-colors"
                        >
                          + Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {program.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={highlight}
                              onChange={(e) => updateHighlight(index, hIndex, e.target.value)}
                              className="flex-1 px-3 sm:px-4 py-2 bg-black/40 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                              placeholder="Enter highlight"
                            />
                            <button
                              type="button"
                              onClick={() => removeHighlight(index, hIndex)}
                              className="px-3 sm:px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg sm:rounded-xl hover:bg-red-500/30 transition-colors text-xs sm:text-sm whitespace-nowrap"
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

            {/* Highlights Management Section */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Highlights Gallery</h2>
                <button
                  type="button"
                  onClick={addHighlightItem}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-300 text-sm"
                >
                  + Add Highlight
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className="bg-black/40 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10 space-y-3 sm:space-y-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-amber-400">
                        {highlight.artist || 'New Highlight'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeHighlightItem(highlight.id)}
                        className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all text-xs sm:text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-white/70 text-xs sm:text-sm font-medium mb-2">
                          Artist Name
                        </label>
                        <input
                          type="text"
                          value={highlight.artist}
                          onChange={(e) => updateHighlightField(highlight.id, 'artist', e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                          placeholder="e.g., Kaligraph Jones"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 text-xs sm:text-sm font-medium mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={highlight.title}
                          onChange={(e) => updateHighlightField(highlight.id, 'title', e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                          placeholder="e.g., Live Performance"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-xs sm:text-sm font-medium mb-2">
                        Upload Media (Image or Video)
                      </label>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => handleHighlightFileUpload(highlight.id, e)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-white/10 rounded-lg sm:rounded-xl text-white text-xs sm:text-sm file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-amber-500 file:text-black hover:file:bg-amber-400 file:cursor-pointer focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                      <div className="mt-2 space-y-1">
                        <p className="text-white/50 text-xs">
                          Supports: JPG, PNG, GIF, WEBP (max 10MB) | MP4, MOV, WEBM (max 50MB)
                        </p>
                        <p className="text-amber-400/80 text-xs flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                          <span>💡 Images under 5MB, videos under 20MB upload faster</span>
                        </p>
                      </div>
                    </div>

                    {/* Preview current or new media */}
                    {(highlightPreviews[highlight.id] || highlight.src) && (
                      <div className="mt-3 relative w-full max-w-xs mx-auto sm:mx-0">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 bg-black">
                          {highlight.type === 'video' ? (
                            <video
                              src={highlightPreviews[highlight.id] || highlight.src}
                              className="w-full h-full object-cover"
                              controls
                            />
                          ) : (
                            <img
                              src={highlightPreviews[highlight.id] || highlight.src}
                              alt={highlight.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                          {highlightPreviews[highlight.id] && (
                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                              New
                            </div>
                          )}
                        </div>
                        <p className="text-center text-white/60 text-xs mt-2">
                          {highlight.type === 'video' ? '📹 Video' : '🖼️ Image'}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {highlights.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-white/60 text-sm">
                      No highlights added yet. Click "Add Highlight" to get started.
                    </p>
                  </div>
                )}
              </div>

              {/* Save Highlights Button */}
              {highlights.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={saveHighlights}
                    disabled={loading}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 sm:px-12 py-3 sm:py-4 rounded-lg sm:rounded-xl hover:from-purple-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 text-base sm:text-lg"
                  >
                    {loading ? "Saving Highlights..." : "Save Highlights"}
                  </button>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="sticky bottom-3 sm:bottom-6 flex justify-center px-3 sm:px-0">
              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold px-8 sm:px-12 py-3 sm:py-4 rounded-lg sm:rounded-xl hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 text-base sm:text-lg"
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

