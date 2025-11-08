"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useProgramData } from "./hooks/useProgramData";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { programData } = useProgramData();

  // Get current week date range and daily programs
  const weekDates = useMemo(() => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Get Monday of current week
    const monday = new Date(now);
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday, go back 6 days, else go to Monday
    monday.setDate(now.getDate() + diff);
    monday.setHours(0, 0, 0, 0);

    // Get Sunday of current week
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    // Format dates
    const formatDate = (date: Date) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return {
        short: `${months[date.getMonth()]} ${date.getDate()}`,
        full: `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
        day: days[date.getDay()]
      };
    };

    // Generate all days of the week with their dates
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDays.push({
        date,
        formatted: formatDate(date)
      });
    }

    return {
      monday,
      sunday,
      mondayFormatted: formatDate(monday).short,
      sundayFormatted: formatDate(sunday).short,
      weekRange: `${formatDate(monday).short} - ${formatDate(sunday).short}`,
      year: now.getFullYear(),
      days: weekDays
    };
  }, []);

  // Use daily programs from API or fallback to default
  const dailyPrograms = programData?.dailyPrograms || [
    {
      day: 'Monday',
      title: 'Sensational Karaoke',
      host: 'Kowa the Great',
      description: 'Sing your heart out with Kowa the Great! Wide song selection and special drink offers.',
      highlights: ['Live karaoke', 'Pro sound system', 'Drink specials']
    },
    {
      day: 'Tuesday',
      title: 'Wine & Dine',
      host: 'Chef\'s Special',
      description: 'Elegant evening of fine wines and gourmet cuisine. Perfect for date nights.',
      highlights: ['Premium wines', 'Gourmet menu', 'Acoustic music']
    },
    {
      day: 'Wednesday',
      title: 'Wet & Wild',
      host: 'DJ Ricky',
      description: 'Mid-week madness with DJ Ricky! Electrifying beats and high-energy vibes.',
      highlights: ['DJ Ricky', 'Drink specials', 'Dance floor energy']
    },
    {
      day: 'Thursday',
      title: 'Afro Piano Night',
      host: 'DJ Ricky',
      description: 'Groove to smooth Afro Piano sounds. Soulful African beats and piano melodies.',
      highlights: ['Afro Piano', 'Soulful vibes', 'All night dancing']
    },
    {
      day: 'Friday',
      title: 'Booty Bum Friday',
      host: 'DJ Mufasa & MC Konki',
      description: 'The legendary weekend kickoff! Hip-hop, dancehall, and Afrobeat all night.',
      highlights: ['DJ Mufasa & MC Konki', 'Hip-hop & Dancehall', 'VIP service']
    },
    {
      day: 'Saturday',
      title: 'Halloween Masquerade Party',
      host: 'DJ Ramoz',
      description: 'Special Halloween Masquerade with DJ Ramoz. Costume contests and spine-tingling beats.',
      highlights: ['Masquerade theme', 'Costume contest', 'DJ Ramoz']
    },
    {
      day: 'Sunday',
      title: 'Afro Spook Sunday',
      host: 'Mvazi, Teekay & Saul Bucho',
      description: 'Triple DJ lineup with the best Afrobeat and Amapiano. End your week on a high note.',
      highlights: ['3 DJs', 'Afrobeat & Amapiano', 'Sunday vibes']
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Luxurious Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        {/* Premium Glass Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60 backdrop-blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.03] via-transparent to-orange-500/[0.03]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>

        {/* Subtle Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Refined Logo */}
            <a href="#home" className="group flex items-center space-x-3 relative z-10">
              <div className="relative flex items-center space-x-3 lg:space-x-4">
                {/* Logo with Elegant Hover */}
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 rounded-2xl blur-xl transition-all duration-700"></div>
                  <div className="relative transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-700 ease-out">
                    <Image
                      src="/logo02.png"
                      alt="Club Cocobongo Logo"
                      width={56}
                      height={56}
                      className="object-contain drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                    />
                  </div>
                </div>

                {/* Elegant Typography */}
                <div className="text-lg lg:text-xl tracking-tight">
                  <div className="font-bold text-white/90 leading-none tracking-wider transition-colors duration-300 group-hover:text-white">
                    CLUB
                  </div>
                  <div className="font-black bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent leading-none tracking-wide">
                    COCOBONGO
                  </div>
                </div>
              </div>
            </a>

            {/* Sophisticated Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {/* Navigation Links */}
              <div className="flex items-center gap-1 mr-6">
                <a href="#home" className="relative px-5 py-2.5 text-[13px] font-medium text-white/70 hover:text-white transition-all duration-300 group">
                  <span className="relative z-10 tracking-wide">Home</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.03] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-3/4 transition-all duration-300"></div>
                </a>

                <a href="#events" className="relative px-5 py-2.5 text-[13px] font-medium text-white/70 hover:text-white transition-all duration-300 group">
                  <span className="relative z-10 tracking-wide">Events</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.03] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-3/4 transition-all duration-300"></div>
                </a>

                <Link href="/menu" className="relative px-5 py-2.5 text-[13px] font-medium text-white/70 hover:text-white transition-all duration-300 group">
                  <span className="relative z-10 tracking-wide">Menu</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.03] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-3/4 transition-all duration-300"></div>
                </Link>

                <Link href="/highlights" className="relative px-5 py-2.5 text-[13px] font-medium text-white/70 hover:text-white transition-all duration-300 group">
                  <span className="relative z-10 tracking-wide">Highlights</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.03] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-3/4 transition-all duration-300"></div>
                </Link>

                <a href="#about" className="relative px-5 py-2.5 text-[13px] font-medium text-white/70 hover:text-white transition-all duration-300 group">
                  <span className="relative z-10 tracking-wide">About</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.03] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-3/4 transition-all duration-300"></div>
                </a>
              </div>

              {/* Elegant Divider */}
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

              {/* Premium CTA Button */}
              <a href="tel:0717535345" className="relative group ml-3">
                {/* Animated Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full opacity-60 group-hover:opacity-100 blur-md transition-all duration-500 animate-pulse"></div>

                {/* Button Container */}
                <div className="relative bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 rounded-full p-[1.5px] group-hover:p-[2px] transition-all duration-300">
                  <div className="bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 group-hover:bg-transparent transition-all duration-300">
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="text-[13px] font-semibold text-white tracking-wide">Reserve Table</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Refined Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative group p-2"
            >
              <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="space-y-1.5">
                  <span className={`block w-5 h-[2px] bg-gradient-to-r from-amber-400 to-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                  <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-5 h-[2px] bg-gradient-to-r from-white to-orange-400 rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
                </div>
              </div>
            </button>
          </div>

          {/* Elegant Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-6 space-y-2 border-t border-white/5">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-5 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent rounded-xl transition-all duration-300"
              >
                <span className="tracking-wide">Home</span>
              </a>
              <a
                href="#events"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-5 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent rounded-xl transition-all duration-300"
              >
                <span className="tracking-wide">Events</span>
              </a>
              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-5 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent rounded-xl transition-all duration-300"
              >
                <span className="tracking-wide">Menu</span>
              </Link>
              <Link
                href="/highlights"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-5 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent rounded-xl transition-all duration-300"
              >
                <span className="tracking-wide">Highlights</span>
              </Link>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-5 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent rounded-xl transition-all duration-300"
              >
                <span className="tracking-wide">About</span>
              </a>
              <a
                href="tel:0717535345"
                className="block mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold px-5 py-3.5 rounded-xl text-center shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300"
              >
                <span className="tracking-wide">Reserve Table</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Stunning Cinematic Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-24">
        {/* Cinematic Background with Animated Gradients */}
        <div className="absolute inset-0 bg-black">
          {/* Sophisticated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black"></div>


          {/* Elegant floating orbs */}
          <div className="absolute top-20 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-float"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>

          {/* Subtle noise texture for depth */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")' }}></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            {/* Main Hero Content */}
            <div className="text-center space-y-8 lg:space-y-12">

              {/* Elegant top badge */}
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-6 py-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
                  </span>
                  <span className="text-amber-400 font-semibold tracking-[0.3em] text-xs uppercase">Diani's Premier Destination</span>
                </div>
              </div>

              {/* Massive bold typography */}
              <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter">
                  <span className="block text-white mb-4">
                    CLUB
                  </span>
                  <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                    COCOBONGO
                  </span>
                </h1>

                {/* Elegant divider */}
                <div className="flex items-center justify-center gap-3">
                  <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                  <div className="w-2 h-2 rotate-45 bg-amber-500"></div>
                  <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                </div>
              </div>


              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <a href="tel:0717535345" className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full opacity-70 group-hover:opacity-100 blur transition-all duration-500"></div>
                  <div className="relative flex items-center gap-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>Reserve Your Table</span>
                  </div>
                </a>

                <Link href="/menu" className="group relative">
                  <div className="relative flex items-center gap-3 bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-amber-500/50 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300">
                    <span>Explore Menu</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Events Section */}
      <section id="events" className="relative py-20 md:py-32 bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-full px-6 py-2 backdrop-blur-sm mb-6 animate-slide-down">
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-amber-400 font-bold tracking-[0.2em] text-xs uppercase">What&apos;s Happening</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight animate-fade-in-up">
              WEEKLY <span className="gradient-text-animated">PROGRAM</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-white/60 text-lg font-light">
              Seven nights a week, unforgettable experiences await. Check out this week&apos;s lineup.
            </p>
          </div>

          {/* Weekly Program Grid - Display all posters */}
          <div className="max-w-7xl mx-auto">
            {/* Main Program and Description - Side by Side */}
            <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Main Program Overview Poster */}
              <div className="relative group h-full">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-1000"></div>
                <div className="relative bg-gradient-to-br from-slate-800/20 to-slate-900/20 backdrop-blur-sm rounded-3xl p-3 border border-amber-500/20 shadow-2xl h-full flex flex-col">

                  {/* Header Section */}
                  <div className="bg-gradient-to-br from-slate-900/80 to-black/60 border border-amber-500/20 rounded-xl p-6 md:p-8 mb-3 flex-shrink-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-black text-2xl md:text-3xl mb-2 leading-tight">
                            Weekly <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Program</span>
                          </h4>
                          <p className="text-amber-400 text-sm md:text-base font-bold">
                            {weekDates.weekRange}, {weekDates.year}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-2">
                            <div className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                            </div>
                            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Live Events</span>
                          </div>
                          <span className="text-white/60 text-xs font-semibold">7 Days • 7 Events</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-amber-500/10">
                        <p className="text-white/70 text-sm leading-relaxed">
                          Experience the ultimate nightlife with DJs, karaoke, themed parties, and more. Your week of unforgettable entertainment starts here!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Poster Image */}
                  <div className="relative overflow-hidden rounded-2xl flex-1 flex items-center justify-center bg-slate-900/40">
                    {programData?.currentWeek?.posterUrl ? (
                      programData.currentWeek.posterUrl.startsWith('http') ||
                      programData.currentWeek.posterUrl.startsWith('/uploads') ||
                      programData.currentWeek.posterUrl.startsWith('/api') ? (
                        <img
                          src={programData.currentWeek.posterUrl}
                          alt="Club Cocobongo Weekly Program"
                          className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <Image
                          src={programData.currentWeek.posterUrl}
                          alt="Club Cocobongo Weekly Program"
                          width={800}
                          height={1000}
                          className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700"
                          priority
                        />
                      )
                    ) : (
                      <Image
                        src="/programs/program.jpg"
                        alt="Club Cocobongo Weekly Program"
                        width={800}
                        height={1000}
                        className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                    )}
                  </div>

                  {/* Footer Section */}
                  <div className="bg-gradient-to-br from-slate-900/80 to-black/60 border border-amber-500/20 rounded-xl p-6 md:p-8 mt-3 flex-shrink-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <a
                          href="https://maps.app.goo.gl/7TE1d92TDiW1uuKJ6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 group"
                        >
                          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-2">
                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-white text-sm font-black group-hover:text-amber-400 transition-colors">Diani Beach</p>
                            <p className="text-white/70 text-xs group-hover:text-amber-400/70 transition-colors">Opposite Diani Reef Hotel</p>
                            <p className="text-amber-400 text-[10px] font-semibold mt-0.5">📍 Get Directions</p>
                          </div>
                        </a>
                        <a
                          href="tel:0717535345"
                          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          Reserve Now
                        </a>
                      </div>
                      <div className="pt-3 border-t border-amber-500/10">
                        <p className="text-white/60 text-xs mb-3 font-semibold">CLUB FEATURES</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full font-semibold">
                            VIP Tables
                          </span>
                          <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full font-semibold">
                            Premium Drinks
                          </span>
                          <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full font-semibold">
                            Live DJs
                          </span>
                          <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full font-semibold">
                            Open 7 Days
                          </span>
                          <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full font-semibold">
                            Gourmet Menu
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Weekly Program Description - Daily Cards */}
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col h-full">
                <div className="mb-6 flex-shrink-0">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
                    This Week at <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Cocobongo</span>
                  </h3>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-4 py-2">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-amber-400 font-bold text-sm">{weekDates.weekRange}, {weekDates.year}</span>
                  </div>
                </div>

                {/* Daily Program Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {dailyPrograms.map((program, index) => {
                    const dayDate = weekDates.days[index];
                    return (
                      <div
                        key={program.day}
                        className="bg-gradient-to-br from-slate-900/60 to-black/40 border border-amber-500/10 rounded-xl p-3 hover:border-amber-500/30 transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center font-black text-black text-xs">
                            {program.day.substring(0, 3).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-black text-base leading-tight group-hover:text-amber-400 transition-colors mb-1">
                              {program.title}
                            </h4>
                            <p className="text-amber-400 text-xs font-semibold mb-2">
                              {dayDate.formatted.full} • {program.host}
                            </p>
                            <p className="text-white/60 text-xs leading-relaxed mb-2">
                              {program.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {program.highlights.slice(0, 3).map((highlight, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/10 flex-shrink-0">
                  <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-amber-400 text-xs font-semibold">Open 7 Days</span>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-amber-400 text-xs font-semibold">0717 535 345</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Program Grid */}
            <div className="mb-12">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-8 text-center">
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">DAILY PROGRAMS</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dailyPrograms.slice(0, 4).map((program, index) => {
                  const dayDate = weekDates.days[index];
                  // Default fallback images
                  const defaultImages = [
                    "/programs/IMG-20251104-WA0033.jpg",
                    "/programs/IMG-20251104-WA0034.jpg",
                    "/programs/IMG-20251104-WA0035.jpg",
                    "/programs/IMG-20251104-WA0036.jpg"
                  ];
                  const posterSrc = program.posterUrl || defaultImages[index];

                  return (
                    <div
                      key={program.day}
                      className="group relative animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-500"></div>
                      <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 flex flex-col h-full">
                        {/* Image Container with Fixed Aspect Ratio */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-slate-900/40">
                          {posterSrc.startsWith('http') || posterSrc.startsWith('/uploads') || posterSrc.startsWith('/api') ? (
                            <img
                              src={posterSrc}
                              alt={`${program.day} - ${program.title}`}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <Image
                              src={posterSrc}
                              alt={`${program.day} - ${program.title}`}
                              width={400}
                              height={600}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black text-xs px-3 py-1.5 rounded-full">
                            {program.day.toUpperCase()}
                          </div>
                        </div>
                        {/* Content Container with Fixed Height */}
                        <div className="p-4 space-y-2 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 text-amber-400 text-sm flex-shrink-0">
                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold truncate">{dayDate.formatted.full.split(',')[0]}, {dayDate.formatted.short}</span>
                          </div>
                          <h4 className="text-white font-black text-lg leading-tight line-clamp-2 flex-shrink-0">{program.title}</h4>
                          <p className="text-white/60 text-sm line-clamp-3 flex-1">{program.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Location & Reservations CTA */}
          <div className="text-center mt-20 animate-fade-in-up">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
                  FIND <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">US</span>
                </h3>
                <p className="text-white/70 text-lg">Visit us at Diani Beach, opposite Diani Reef Hotel</p>
              </div>

              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-1000"></div>
                <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-4 md:p-6 shadow-2xl">
                  <div className="relative overflow-hidden rounded-2xl">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.7127982800316!2d39.589487574976786!3d-4.275937495698002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1840463f98d4562f%3A0xf8f8d4d762f25bc6!2sCoco%20Bongo%20Diani!5e0!3m2!1sen!2ske!4v1762288087660!5m2!1sen!2ske"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-br from-slate-900/80 to-black/60 border border-amber-500/20 rounded-xl p-4 md:p-6">
                    <div className="text-center sm:text-left">
                      <p className="text-white/60 text-xs mb-1 uppercase tracking-widest font-semibold">Reservations & VIP Bookings</p>
                      <p className="gradient-text-animated text-xl md:text-2xl font-black">
                        CALL US NOW
                      </p>
                    </div>
                    <a
                      href="tel:0717535345"
                      className="group relative"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                      <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-black text-lg md:text-xl px-10 py-5 rounded-full transition-all duration-300 transform group-hover:scale-105 shadow-2xl flex items-center gap-3">
                        <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        0717 535 345
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sophisticated Menu Preview Section */}
      <section id="menu" className="relative py-24 md:py-40 overflow-hidden">
        {/* Elegant Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '50px 50px'}}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Premium Header */}
            <div className="mb-16">
              {/* Refined Badge */}
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
                <span className="text-amber-400/80 font-light tracking-[0.35em] text-[10px] uppercase">Culinary Artistry</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent via-amber-500/40 to-transparent"></div>
              </div>

              {/* Elegant Title */}
              <h2 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                Gastronomy &
                <span className="block mt-2 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Fine Libations
                </span>
              </h2>

              {/* Decorative Separator */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/30 to-amber-500/50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60"></div>
                <div className="w-1 h-1 rounded-full bg-amber-500/40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent via-amber-500/30 to-amber-500/50"></div>
              </div>

              {/* Refined Description */}
              <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
                Immerse yourself in an exquisite culinary journey where<br className="hidden md:block" />
                world-class cuisine meets masterfully crafted libations
              </p>
            </div>

            {/* Luxurious Menu Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
              {/* Signature Cocktails Card */}
              <div className="group relative">
                {/* Animated Glow Effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-amber-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>

                {/* Card Container */}
                <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-black/90 backdrop-blur-xl border border-white/10 group-hover:border-amber-500/30 rounded-3xl p-10 transition-all duration-700 group-hover:transform group-hover:-translate-y-3">
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                      <span className="text-5xl filter group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.5)] transition-all duration-700">🍹</span>
                    </div>
                    {/* Decorative Corner Accent */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight group-hover:text-amber-400 transition-colors duration-500">
                    Signature Cocktails
                  </h3>
                  <div className="h-px w-16 bg-gradient-to-r from-amber-500/50 to-transparent mx-auto mb-5 group-hover:w-24 transition-all duration-500"></div>
                  <p className="text-white/50 text-[15px] leading-relaxed font-light">
                    Meticulously crafted libations and the world's finest spirits, curated by our master mixologists
                  </p>
                </div>
              </div>

              {/* Gourmet Cuisine Card */}
              <div className="group relative">
                {/* Animated Glow Effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-amber-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>

                {/* Card Container */}
                <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-black/90 backdrop-blur-xl border border-white/10 group-hover:border-amber-500/30 rounded-3xl p-10 transition-all duration-700 group-hover:transform group-hover:-translate-y-3">
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                      <span className="text-5xl filter group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.5)] transition-all duration-700">🍽️</span>
                    </div>
                    {/* Decorative Corner Accent */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight group-hover:text-amber-400 transition-colors duration-500">
                    Gourmet Cuisine
                  </h3>
                  <div className="h-px w-16 bg-gradient-to-r from-amber-500/50 to-transparent mx-auto mb-5 group-hover:w-24 transition-all duration-500"></div>
                  <p className="text-white/50 text-[15px] leading-relaxed font-light">
                    Exceptional culinary creations from our award-winning chefs, blending tradition with innovation
                  </p>
                </div>
              </div>

              {/* Premium Selection Card */}
              <div className="group relative">
                {/* Animated Glow Effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-amber-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>

                {/* Card Container */}
                <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-black/90 backdrop-blur-xl border border-white/10 group-hover:border-amber-500/30 rounded-3xl p-10 transition-all duration-700 group-hover:transform group-hover:-translate-y-3">
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                      <span className="text-5xl filter group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.5)] transition-all duration-700">🍷</span>
                    </div>
                    {/* Decorative Corner Accent */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight group-hover:text-amber-400 transition-colors duration-500">
                    Premium Selection
                  </h3>
                  <div className="h-px w-16 bg-gradient-to-r from-amber-500/50 to-transparent mx-auto mb-5 group-hover:w-24 transition-all duration-500"></div>
                  <p className="text-white/50 text-[15px] leading-relaxed font-light">
                    An distinguished collection of rare vintages, aged spirits, and exclusive beverages
                  </p>
                </div>
              </div>
            </div>

            {/* Elegant CTA Section */}
            <div className="space-y-8">
              {/* Menu Button */}
              <div>
                <Link href="/menu" className="group relative inline-block">
                  {/* Glowing Aura */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-amber-500/30 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-700 animate-pulse"></div>

                  {/* Button */}
                  <div className="relative bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 rounded-full p-[2px] group-hover:p-[2.5px] transition-all duration-500">
                    <div className="bg-black rounded-full px-12 py-5 group-hover:bg-transparent transition-all duration-500">
                      <div className="flex items-center gap-4 text-white group-hover:text-black transition-colors duration-500">
                        <span className="font-serif text-lg md:text-xl font-semibold tracking-wide">Explore Our Menu</span>
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Special Announcement */}
              <div className="relative inline-block group">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-amber-500/20 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative px-10 py-6">
                  <div className="flex items-center gap-3 text-[15px]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                      <span className="font-serif text-amber-400/90 font-semibold tracking-wider">Tuesday Special</span>
                    </div>
                    <div className="h-3 w-px bg-white/20"></div>
                    <span className="text-white/60 font-light">Join us for an exclusive Wine & Dine experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 md:py-32 bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-amber-400 font-semibold tracking-[0.3em] text-sm uppercase mb-4">
              About Us
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
              THE PREMIER NIGHTLIFE <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">DESTINATION</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-8"></div>

            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Club Cocobongo has been reborn under new management, bringing you an elevated nightlife experience
                in the heart of Diani. We&apos;ve reimagined what a premium club should be, combining world-class
                entertainment, exceptional service, and an atmosphere unlike any other.
              </p>
              <p>
                From our weekly themed events featuring top DJs to our exquisite food and beverage offerings,
                every detail has been crafted to ensure your night is unforgettable. Whether you&apos;re looking
                for a sophisticated dinner, incredible cocktails, or dancing until dawn, Club Cocobongo is your destination.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="space-y-2">
                <div className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">7</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">Nights a Week</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">10+</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">Premium Events</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">50+</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">Drink Selections</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">#1</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">In Diani</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="relative py-20 md:py-32 bg-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-black to-slate-900"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-6 py-3 mb-6">
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-amber-400 font-bold tracking-[0.2em] text-xs uppercase">Customer Reviews</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              WHAT OUR GUESTS <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">SAY</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-6"></div>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Join hundreds of satisfied customers who have experienced the best nightlife in Diani
            </p>
          </div>

          {/* Google Rating Summary */}
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-gradient-to-b from-slate-900/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-6xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">4.8</span>
                <div className="text-left">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/60 text-sm mt-1">Based on 150+ reviews</p>
                </div>
              </div>

              {/* Leave Review Button */}
              <a
                href="https://www.google.com/search?q=club+cocobongo&oq=club+&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIOCAEQRRgnGDsYgAQYigUyBggCEEUYOTIGCAMQRRg7MgoIBBAuGLEDGIAEMhAIBRAAGIMBGLEDGIAEGIoFMgYIBhBFGDwyBggHEEUYPdIBCDIwNTZqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#lrd=0x1840463f98d4562f:0xf8f8d4d762f25bc6,3,,,,"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block w-full mt-6"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full opacity-70 group-hover:opacity-100 blur transition-all duration-500"></div>
                <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 group-hover:scale-105">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Leave a Review on Google</span>
                </div>
              </a>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Review 1 */}
            <div className="group relative">
              <div className="relative bg-gradient-to-b from-slate-900/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 rounded-2xl transition-all duration-500"></div>

                <div className="relative">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    &quot;Amazing atmosphere! The DJs are incredible and the drinks are top-notch. Best club in Diani hands down!&quot;
                  </p>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-amber-400 font-bold">
                      JM
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">John M.</p>
                      <p className="text-white/40 text-xs">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="group relative">
              <div className="relative bg-gradient-to-b from-slate-900/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 rounded-2xl transition-all duration-500"></div>

                <div className="relative">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    &quot;Fantastic venue with great music and excellent service. The staff are friendly and professional. Highly recommend!&quot;
                  </p>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-amber-400 font-bold">
                      SK
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Sarah K.</p>
                      <p className="text-white/40 text-xs">1 month ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="group relative">
              <div className="relative bg-gradient-to-b from-slate-900/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 rounded-2xl transition-all duration-500"></div>

                <div className="relative">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    &quot;Had an amazing night here! Great ambiance, delicious cocktails, and the live DJ was phenomenal. Will definitely be back!&quot;
                  </p>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-amber-400 font-bold">
                      DW
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">David W.</p>
                      <p className="text-white/40 text-xs">3 weeks ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Reviews on Google */}
          <div className="text-center">
            <a
              href="https://www.google.com/search?q=club+cocobongo&oq=club+&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIOCAEQRRgnGDsYgAQYigUyBggCEEUYOTIGCAMQRRg7MgoIBBAuGLEDGIAEMhAIBRAAGIMBGLEDGIAEGIoFMgYIBhBFGDwyBggHEEUYPdIBCDIwNTZqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#lrd=0x1840463f98d4562f:0xf8f8d4d762f25bc6,3,,,,"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-all duration-300 group"
            >
              <span>View All Reviews on Google</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-amber-500/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {/* Simple logo without background */}
                <div className="relative">
                  <Image
                    src="/logo02.png"
                    alt="Club Cocobongo Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="text-2xl font-black">
                  <span className="text-white">CLUB</span>
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> COCOBONGO</span>
                </div>
              </div>
              <p className="text-white/60 mb-4 max-w-md">
                Diani&apos;s premier nightlife destination. Experience unforgettable nights of world-class entertainment,
                exceptional service, and an atmosphere like no other.
              </p>
              <div className="flex items-center gap-2 text-white/60">
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Opposite Diani Reef Hotel</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-white/60 hover:text-amber-400 transition-colors text-sm">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#events" className="text-white/60 hover:text-amber-400 transition-colors text-sm">
                    Weekly Events
                  </a>
                </li>
                <li>
                  <a href="#menu" className="text-white/60 hover:text-amber-400 transition-colors text-sm">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-white/60 hover:text-amber-400 transition-colors text-sm">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a href="tel:0717535345" className="text-white/60 hover:text-amber-400 transition-colors text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    0717 535 345
                  </a>
                </li>
                <li className="text-white/60 text-sm flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div>Open Daily</div>
                    <div className="text-amber-400">7 Days a Week</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-amber-500/10">
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/theclub_cocobongo_official1/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/50 flex items-center justify-center transition-all hover:scale-110 group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@the.club.cocobongo?_r=1&_t=ZM-9191fPBtSfM"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/50 flex items-center justify-center transition-all hover:scale-110 group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/50 flex items-center justify-center transition-all hover:scale-110 group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-white/60 text-sm mb-1">
                Powered by{" "}
                <a
                  href="https://soldoutafrica.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 font-semibold hover:text-amber-300 transition-colors duration-300"
                >
                  StdioX Labs
                </a>
              </p>
              <p className="text-white/40 text-xs">
                © 2025 Club Cocobongo. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

