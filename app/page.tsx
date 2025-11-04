"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const weeklyProgram = [
    {
      day: "MONDAY",
      event: "SENSATIONAL KARAOKE",
      host: "KOWA THE GREAT",
    },
    {
      day: "TUESDAY",
      event: "WINE & DINE",
      host: "",
    },
    {
      day: "WEDNESDAY",
      event: "WET & WILD",
      host: "DJ RICKY",
    },
    {
      day: "THURSDAY",
      event: "AFRO PIANO",
      host: "DJ RICKY",
    },
    {
      day: "FRIDAY",
      event: "BOOTY BUM",
      host: "DJ MUFASA | MC KONKI",
    },
    {
      day: "SATURDAY",
      event: "DJ RAMOZ",
      host: "HALLOWEEN MASQURADE PARTY",
    },
    {
      day: "SUNDAY",
      event: "AFRO SPOOK",
      host: "MVAZI X TEEKAY X SAUL BUCHO",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-2xl border-b border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-orange-500/5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <a href="#home" className="group flex items-center space-x-3 relative">
              <div className="relative flex items-center space-x-3">
                {/* Teardrop container that extends to navbar top */}
                <div className="relative -mt-6 w-10 h-24 transform group-hover:scale-105 transition-transform duration-300">
                  {/* White teardrop shape with flat top and smooth rounded bottom */}
                  <div
                    className="absolute inset-0 bg-white shadow-xl"
                    style={{
                      borderRadius: '0 0 50% 50%',
                      clipPath: 'path("M 0 0 L 40 0 L 40 56 Q 40 68 35 74 Q 30 80 20 80 Q 10 80 5 74 Q 0 68 0 56 Z")',
                    }}
                  >
                    {/* Logo positioned in the circular part with more padding */}
                    <div className="absolute inset-0 flex items-end justify-center pb-5 px-2">
                      <Image
                        src="/logo.png"
                        alt="Club Cocobongo Logo"
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-xl tracking-tight">
                  <div className="font-black text-white leading-none">CLUB</div>
                  <div className="font-black bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent leading-none">COCOBONGO</div>
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#home" className="relative px-4 py-2 text-sm font-semibold text-white/80 hover:text-white transition-all group">
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></div>
              </a>
              <a href="#events" className="relative px-4 py-2 text-sm font-semibold text-white/80 hover:text-white transition-all group">
                <span className="relative z-10">Events</span>
                <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></div>
              </a>
              <a href="#menu" className="relative px-4 py-2 text-sm font-semibold text-white/80 hover:text-white transition-all group">
                <span className="relative z-10">Menu</span>
                <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></div>
              </a>
              <a href="#about" className="relative px-4 py-2 text-sm font-semibold text-white/80 hover:text-white transition-all group">
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></div>
              </a>
              <div className="w-px h-6 bg-white/10 mx-3"></div>
              <a
                href="tel:0717535345"
                className="relative group ml-2"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-sm">Reserve Table</span>
                </div>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative group"
            >
              <div className="absolute -inset-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="space-y-1.5">
                  <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-6 space-y-3 border-t border-white/5">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Home
              </a>
              <a
                href="#events"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Events
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Menu
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                About
              </a>
              <a
                href="tel:0717535345"
                className="block bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold px-4 py-3 rounded-lg text-center shadow-lg mt-4"
              >
                Reserve Table
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 rounded-full px-6 py-2.5 backdrop-blur-sm animate-slide-down">
                <div className="relative">
                  <span className="absolute inset-0 w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                  <span className="relative block w-2 h-2 bg-amber-500 rounded-full"></span>
                </div>
                <span className="text-amber-400 font-bold tracking-[0.2em] text-xs uppercase">Premium Nightlife Experience</span>
              </div>

              <div className="relative">
                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  CLUB
                </h1>
                <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] font-black bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent tracking-tighter leading-none relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  COCOBONGO
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent blur-2xl opacity-30 -z-10">
                    COCOBONGO
                  </div>
                </h1>
              </div>
            </div>

            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-full px-8 py-3 backdrop-blur-md shadow-lg shadow-amber-500/10">
                <div className="relative flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                  <span className="text-amber-400 font-bold tracking-wide text-sm">UNDER NEW MANAGEMENT</span>
                </div>
              </div>

              <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed font-light">
                Experience the finest nightlife at Diani&apos;s most exclusive club.
                Join us for unforgettable nights of music, entertainment, and exceptional service.
              </p>

              <div className="flex items-center justify-center gap-2 text-white/60">
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-sm">Opposite Diani Reef Hotel</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <a
                href="tel:0717535345"
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold px-10 py-4 rounded-full text-base transition-all duration-300 shadow-2xl flex items-center gap-3 group-hover:scale-105 transform">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>0717 535 345</span>
                </div>
              </a>
              <a
                href="#menu"
                className="group relative bg-white/5 backdrop-blur-sm border-2 border-white/10 hover:border-amber-500/50 hover:bg-white/10 text-white font-bold px-10 py-4 rounded-full text-base transition-all duration-300 flex items-center gap-3 hover:scale-105 transform"
              >
                <span>View Menu</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
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
              WEEKLY <span className="gradient-text-animated">EVENTS</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-white/60 text-lg font-light">
              Seven nights a week, unforgettable experiences await. Join us for the best entertainment in Diani.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
            {/* Program Image */}
            <div className="relative group order-2 lg:order-1 animate-scale-in">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-1000 animate-glow"></div>
              <div className="relative bg-gradient-to-br from-slate-800/20 to-slate-900/20 backdrop-blur-sm rounded-3xl p-3 border border-amber-500/20 shadow-2xl">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/program.jpg"
                    alt="Club Cocobongo Weekly Program"
                    width={800}
                    height={1200}
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
            </div>

            {/* Interactive Program Cards */}
            <div className="space-y-5 order-1 lg:order-2">
              {weeklyProgram.map((item, index) => (
                <div
                  key={index}
                  className="group relative animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-500 hover:translate-x-2 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10">
                    {/* Day Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur opacity-50"></div>
                        <div className="relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 rounded-full shadow-lg">
                          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-black font-black text-sm tracking-wider">
                            {item.day}
                          </span>
                        </div>
                      </div>
                      <div className="text-4xl opacity-20 group-hover:opacity-40 transition-all duration-300 group-hover:scale-110 transform">
                        🎵
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-500 group-hover:bg-clip-text transition-all duration-300">
                        {item.event}
                      </h3>
                      {item.host && (
                        <div className="flex items-center gap-2 text-amber-400/90">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                          <p className="font-semibold text-sm tracking-wide">
                            {item.host}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Hover Effect Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl shadow-lg shadow-amber-500/50"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reservations CTA */}
          <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="inline-block relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur-xl opacity-30 animate-glow"></div>
              <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                  <div className="text-left flex-1">
                    <div className="inline-flex items-center gap-2 text-white/50 text-xs mb-3 uppercase tracking-widest font-semibold">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Location
                    </div>
                    <div className="flex items-center gap-3 text-white mb-4">
                      <span className="font-bold text-lg">Opposite Diani Reef Hotel</span>
                    </div>
                    <p className="gradient-text-animated text-xl md:text-2xl font-black">
                      RESERVATIONS & VIP BOOKINGS
                    </p>
                  </div>
                  <a
                    href="tel:0717535345"
                    className="group relative flex-shrink-0"
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
      </section>

      {/* Menu Section */}
      <section id="menu" className="relative py-20 md:py-32 bg-black">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-amber-400 font-semibold tracking-[0.3em] text-sm uppercase mb-4">
              Culinary Excellence
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              FOOD & <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">BEVERAGES</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-6"></div>
            <p className="text-white/60 text-lg">
              Indulge in our curated selection of premium drinks and gourmet cuisine, crafted to perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Cocktails Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-amber-500/20 hover:border-amber-500/50 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 h-full">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="text-5xl">🍹</div>
                </div>
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors">
                  Signature Cocktails
                </h3>
                <p className="text-white/60 leading-relaxed mb-4">
                  Expertly mixed cocktails and premium spirits from around the world
                </p>
                <div className="flex items-center justify-center gap-1 text-amber-400">
                  <span className="text-sm font-semibold">Explore Menu</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Wine Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-amber-500/20 hover:border-amber-500/50 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 h-full">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="text-5xl">🍷</div>
                </div>
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors">
                  Premium Wines
                </h3>
                <p className="text-white/60 leading-relaxed mb-4">
                  A carefully curated wine collection featuring the finest vintages
                </p>
                <div className="flex items-center justify-center gap-1 text-amber-400">
                  <span className="text-sm font-semibold">Explore Menu</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Food Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-amber-500/20 hover:border-amber-500/50 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 h-full">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="text-5xl">🍽️</div>
                </div>
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors">
                  Gourmet Cuisine
                </h3>
                <p className="text-white/60 leading-relaxed mb-4">
                  Delicious dishes prepared by our talented culinary team
                </p>
                <div className="flex items-center justify-center gap-1 text-amber-400">
                  <span className="text-sm font-semibold">Explore Menu</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-amber-500/20 rounded-2xl px-8 py-4">
              <p className="text-white/70">
                <span className="text-amber-400 font-bold">Tuesday Special:</span> Join us for our Wine & Dine experience
              </p>
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

      {/* Footer */}
      <footer className="relative bg-black border-t border-amber-500/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {/* Teardrop logo container */}
                <div className="relative w-10 h-20">
                  {/* White teardrop shape with flat top and smooth rounded bottom */}
                  <div
                    className="absolute inset-0 bg-white shadow-xl"
                    style={{
                      borderRadius: '0 0 50% 50%',
                      clipPath: 'path("M 0 0 L 40 0 L 40 48 Q 40 60 35 66 Q 30 72 20 72 Q 10 72 5 66 Q 0 60 0 48 Z")',
                    }}
                  >
                    {/* Logo positioned in the circular part with more padding */}
                    <div className="absolute inset-0 flex items-end justify-center pb-4 px-2">
                      <Image
                        src="/logo.png"
                        alt="Club Cocobongo Logo"
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    </div>
                  </div>

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
              <a href="#" className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/50 flex items-center justify-center transition-all hover:scale-110 group">
                <svg className="w-5 h-5 text-white/60 group-hover:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/50 flex items-center justify-center transition-all hover:scale-110 group">
                <svg className="w-5 h-5 text-white/60 group-hover:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/50 flex items-center justify-center transition-all hover:scale-110 group">
                <svg className="w-5 h-5 text-white/60 group-hover:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-white/60 text-sm mb-1">
                Powered by <span className="text-amber-400 font-semibold">StdioX Labs</span>
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

