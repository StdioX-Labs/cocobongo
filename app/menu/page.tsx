"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<'food' | 'drinks'>('food');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Sophisticated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Luxurious Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        {/* Premium Glass Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60 backdrop-blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.03] via-transparent to-orange-500/[0.03]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>

        {/* Subtle Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Refined Logo */}
            <Link href="/" className="group flex items-center space-x-2 sm:space-x-3 relative z-10">
              <div className="relative flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                {/* Logo with Elegant Hover */}
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 rounded-2xl blur-xl transition-all duration-700"></div>
                  <div className="relative transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-700 ease-out">
                    <Image
                      src="/logo02.png"
                      alt="Club Cocobongo Logo"
                      width={48}
                      height={48}
                      className="object-contain drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] sm:w-14 sm:h-14"
                    />
                  </div>
                </div>

                {/* Elegant Typography */}
                <div className="text-base sm:text-lg lg:text-xl tracking-tight">
                  <div className="font-bold text-white/90 leading-none tracking-wider transition-colors duration-300 group-hover:text-white">
                    CLUB
                  </div>
                  <div className="font-black bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent leading-none tracking-wide">
                    COCOBONGO
                  </div>
                </div>
              </div>
            </Link>

            {/* Sophisticated Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {/* Navigation Links */}
              <div className="flex items-center gap-1 mr-6">
                <Link href="/#home" className="relative px-5 py-2.5 text-[13px] font-medium text-white/70 hover:text-white transition-all duration-300 group">
                  <span className="relative z-10 tracking-wide">Home</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.03] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-3/4 transition-all duration-300"></div>
                </Link>

                <Link href="/#events" className="relative px-5 py-2.5 text-[13px] font-medium text-white/70 hover:text-white transition-all duration-300 group">
                  <span className="relative z-10 tracking-wide">Events</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.03] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-3/4 transition-all duration-300"></div>
                </Link>

                <Link href="/menu" className="relative px-5 py-2.5 text-[13px] font-medium text-amber-400 transition-all duration-300 group">
                  <span className="relative z-10 tracking-wide">Menu</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-amber-500/5 rounded-xl"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400"></div>
                </Link>

                <Link href="/highlights" className="relative px-5 py-2.5 text-[13px] font-medium text-white/70 hover:text-white transition-all duration-300 group">
                  <span className="relative z-10 tracking-wide">Highlights</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.03] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-3/4 transition-all duration-300"></div>
                </Link>

                <Link href="/#about" className="relative px-5 py-2.5 text-[13px] font-medium text-white/70 hover:text-white transition-all duration-300 group">
                  <span className="relative z-10 tracking-wide">About</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.03] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-3/4 transition-all duration-300"></div>
                </Link>
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

            {/* Mobile Menu Button */}
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

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-6 space-y-2 border-t border-white/5">
              <Link
                href="/#home"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-5 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent rounded-xl transition-all duration-300"
              >
                <span className="tracking-wide">Home</span>
              </Link>
              <Link
                href="/#events"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-5 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent rounded-xl transition-all duration-300"
              >
                <span className="tracking-wide">Events</span>
              </Link>
              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-5 py-3 text-sm font-medium text-amber-400 bg-gradient-to-r from-amber-500/5 to-transparent rounded-xl transition-all duration-300"
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
              <Link
                href="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-5 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent rounded-xl transition-all duration-300"
              >
                <span className="tracking-wide">About</span>
              </Link>
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

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black"></div>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute inset-0 opacity-[0.015]" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-5xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 animate-fade-in">
              <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-amber-500/50"></div>
              <span className="text-amber-400/90 font-light tracking-[0.2em] sm:tracking-[0.25em] text-[10px] sm:text-[11px] uppercase">Curated Selections</span>
              <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-amber-500/50"></div>
            </div>

            {/* Elegant Title */}
            <h1 className="relative mb-6 sm:mb-8 animate-slide-up">
              <span className="block text-white/40 font-light text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">Club Cocobongo</span>
              <span className="block font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none mb-2">
                Our Menu
              </span>
              <span className="block text-base sm:text-lg md:text-xl text-white/50 font-light tracking-wide mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed px-4">
                A symphony of flavors from around the world,<br className="hidden sm:block" />
                thoughtfully curated for discerning palates
              </span>
            </h1>
          </div>

          {/* Decorative Divider - Perfectly Centered */}
          <div className="flex items-center justify-center mb-8 sm:mb-12">
            <div className="flex items-center gap-2 sm:gap-4 animate-expand">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/50 to-amber-500/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70 flex-shrink-0"></div>
              <div className="h-px w-20 bg-gradient-to-r from-amber-500/30 via-amber-500/50 to-amber-500/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70 flex-shrink-0"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-amber-500/50 to-amber-500/30"></div>
            </div>
          </div>

          {/* Luxurious Tab Navigation */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <div className="relative inline-flex gap-1 sm:gap-2 p-1.5 sm:p-2 bg-gradient-to-br from-black/80 via-slate-900/60 to-black/80 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.7),0_0_1px_0_rgba(251,191,36,0.1)] w-full max-w-md sm:max-w-lg">
              {/* Premium Animated Slider with Layered Gradients */}
              <div
                className={`absolute top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  activeTab === 'food' ? 'left-1.5 sm:left-2 w-[calc(50%-6px)] sm:w-[calc(50%-4px)]' : 'left-[calc(50%+0px)] w-[calc(50%-6px)] sm:w-[calc(50%-4px)]'
                }`}
              >
                {/* Multiple gradient layers for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-amber-600/30 to-orange-500/30 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent rounded-full"></div>
                <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-500/40 to-orange-500/40 rounded-full blur-md"></div>
                <div className="absolute inset-[1px] bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full border border-amber-500/30 shadow-inner"></div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_rgba(251,191,36,0.2)]"></div>
              </div>

              {/* Food Tab */}
              <button
                onClick={() => setActiveTab('food')}
                className={`relative px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 font-light text-xs sm:text-sm md:text-base tracking-[0.05em] sm:tracking-[0.1em] uppercase transition-all duration-700 z-10 rounded-full group overflow-hidden flex-1 ${
                  activeTab === 'food'
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 relative z-10">
                  <span className={`text-lg sm:text-xl md:text-2xl transition-all duration-700 ${
                    activeTab === 'food' 
                      ? 'scale-110 sm:scale-125 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)] filter brightness-125' 
                      : 'scale-100 grayscale-[50%] opacity-60 group-hover:grayscale-0 group-hover:opacity-80'
                  }`}>🍽️</span>
                  <span className={`font-serif text-sm sm:text-base md:text-lg tracking-wider transition-all duration-700 ${
                    activeTab === 'food' ? 'font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]' : 'font-light'
                  }`}>
                    Cuisine
                  </span>
                </span>
                {/* Elegant Shine Effect */}
                {activeTab === 'food' && (
                  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite]"></div>
                  </div>
                )}
                {/* Hover glow for inactive state */}
                {activeTab !== 'food' && (
                  <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-all duration-500"></div>
                )}
              </button>

              {/* Drinks Tab */}
              <button
                onClick={() => setActiveTab('drinks')}
                className={`relative px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 font-light text-xs sm:text-sm md:text-base tracking-[0.05em] sm:tracking-[0.1em] uppercase transition-all duration-700 z-10 rounded-full group overflow-hidden flex-1 ${
                  activeTab === 'drinks'
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 relative z-10">
                  <span className={`text-lg sm:text-xl md:text-2xl transition-all duration-700 ${
                    activeTab === 'drinks' 
                      ? 'scale-110 sm:scale-125 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)] filter brightness-125' 
                      : 'scale-100 grayscale-[50%] opacity-60 group-hover:grayscale-0 group-hover:opacity-80'
                  }`}>🍸</span>
                  <span className={`font-serif text-sm sm:text-base md:text-lg tracking-wider transition-all duration-700 ${
                    activeTab === 'drinks' ? 'font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]' : 'font-light'
                  }`}>
                    Beverages
                  </span>
                </span>
                {/* Elegant Shine Effect */}
                {activeTab === 'drinks' && (
                  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite]"></div>
                  </div>
                )}
                {/* Hover glow for inactive state */}
                {activeTab !== 'drinks' && (
                  <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-all duration-500"></div>
                )}
              </button>
            </div>
          </div>

          {/* Menu Content */}
          <div className="max-w-7xl mx-auto">
            {activeTab === 'food' && <FoodMenu />}
            {activeTab === 'drinks' && <DrinksMenu />}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-amber-500/30"></div>
              <div className="w-1 h-1 rounded-full bg-amber-500/50"></div>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-amber-500/30"></div>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Reserve Your Table</h3>
            <p className="text-white/50 text-base sm:text-lg font-light mb-8 sm:mb-10 px-4">Experience exceptional cuisine in an elegant atmosphere</p>

            <a href="tel:0717535345" className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-amber-500/30 px-6 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-500">
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-white font-light tracking-wide text-sm sm:text-base">0717 535 345</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FoodMenu() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MenuCategory
        icon="🍳"
        title="Breakfast"
        items={[
          { name: 'English Breakfast', desc: 'Bacon, eggs, tomatoes, sausages, beans, mushroom, toast, tea, coffee, juice', price: '1,500' },
          { name: 'Continental Breakfast', desc: 'Waffles, pancakes, fruit platter, juice, coffee, tea', price: '1,500' },
          { name: 'Assorted Breakfast', desc: 'Tea, coffee, pancakes, waffles, milk', price: '1,500' },
          { name: 'Sausages', price: '300' },
          { name: 'Choma Sausages', price: '250' },
          { name: 'Eggs Cooked Your Style', price: '700' },
          { name: 'Hot Chocolate', price: '800' },
          { name: 'Hot Dawa', price: '200' },
          { name: 'Masala Tea', price: '300' },
          { name: 'White Coffee', price: '400' },
          { name: 'Espresso', price: '200' },
          { name: 'Cappuccino', price: '350' },
          { name: 'Coffelate', price: '400' },
          { name: 'Americano', price: '300' },
          { name: 'Mocha', price: '400' },
          { name: 'Herbs Tea', price: '350' },
          { name: 'Iced Cappuccino', price: '450' },
          { name: 'Iced Coffee', price: '450' },
        ]}
      />
      <MenuCategory
        icon="🥟"
        title="Starters & Soups"
        items={[
          { name: 'Chicken Wings', price: '800' },
          { name: 'Vegetable Samosa', desc: '3 pieces per serving', price: '350' },
          { name: 'Meat Samosa', desc: '3 pieces per serving', price: '500' },
          { name: 'Tempura Prawns', price: '700' },
          { name: 'Calamari Rings', price: '1,500' },
          { name: 'Nachos Vegetable', price: '1,100' },
          { name: 'Ossobuco Soup', price: '700' },
          { name: 'Chicken Soup', price: '650' },
          { name: 'Tomato Soup', price: '500' },
          { name: "Soup of the Day", desc: "Chef's special", price: '800' },
        ]}
      />
      <MenuCategory
        icon="🍖"
        title="Main Course"
        items={[
          { name: 'Full Chicken', desc: 'Cooked your style with 2 sides', price: '3,000' },
          { name: '1/2 Chicken', desc: 'Cooked your style with 2 sides', price: '1,500' },
          { name: 'Full Chicken Kienyeji', desc: 'Cooked your style', price: '3,500' },
          { name: '1/2 Chicken Kienyeji', desc: 'Cooked your style', price: '1,800' },
          { name: 'Chicken Meuniere', price: '1,300' },
          { name: 'Chicken Schnitzel', price: '1,400' },
          { name: 'Beef Steak Grilled/Stew', price: '1,500' },
          { name: 'Beef Stroganoff', desc: 'With mashed potatoes and vegetables', price: '1,850' },
          { name: 'Beef Stew', price: '800' },
          { name: 'Grilled Beef 1/2 kg', desc: 'With 2 sides', price: '1,200' },
          { name: 'Grilled Beef 1kg', desc: 'With 2 sides', price: '2,400' },
          { name: 'Grilled Goat 1/2kg', price: '1,500' },
          { name: 'Grilled Goat 1kg', price: '3,000' },
          { name: 'Goat Arm 1.5kg', price: '3,500' },
          { name: 'Goat Leg 2kg', price: '4,500' },
        ]}
      />
      <MenuCategory
        icon="🐟"
        title="Seafood"
        items={[
          { name: 'Whole Fish', desc: 'Cooked your style', price: '1,500' },
          { name: 'Catch of the Day', desc: '200g', price: '1,600' },
          { name: 'Lobster', price: '2,400' },
          { name: 'Octopus', desc: 'Cooked your style', price: '1,300' },
          { name: 'King Prawns', price: '2,300' },
          { name: 'Jumbo Prawns', price: '2,500' },
          { name: 'Seafood Platter', desc: 'Fish, lobster, king prawns, calamari, octopus', price: '4,500' },
        ]}
      />
      <MenuCategory
        icon="🍽️"
        title="Platters"
        items={[
          { name: 'Vegetables Platter', desc: 'Veg samosa, veg tacos, veg rolls, feta samosa, fried onions', price: '1,800' },
          { name: 'Meat Platter', desc: 'Mbuzi, beef, chicken, fish choma, sausage, vegs, ugali', price: '3,800' },
          { name: 'Seafood Platter', desc: 'Fish, lobster, king prawns, calamari, octopus', price: '4,500' },
        ]}
      />
      <MenuCategory
        icon="🥗"
        title="Salads & Desserts"
        items={[
          { name: 'Garden Salad', price: '800' },
          { name: 'Greek Salad', price: '1,200' },
          { name: 'Caesar Salad', price: '1,000' },
          { name: 'Seafood Salad', price: '1,400' },
          { name: 'Tuna Salad', price: '1,300' },
          { name: 'Kachumbari', price: '400' },
          { name: 'Ice Cream', price: '250' },
          { name: 'Milk Shake', price: '750' },
          { name: 'Smoothie', price: '900' },
          { name: 'Tropical Fruits + Ice Cream', price: '650' },
          { name: 'Banana Split', price: '700' },
          { name: 'Fruit Salad', price: '500' },
        ]}
      />
      <MenuCategory
        icon="🍕"
        title="Pizzas & Pastas"
        items={[
          { name: 'Margherita', price: '900' },
          { name: 'Marinara', price: '1,100' },
          { name: 'Chicken Calzone', desc: 'Open/Closed', price: '1,500' },
          { name: 'Prosciutto', price: '1,350' },
          { name: 'Vegetariana', price: '1,200' },
          { name: 'Hawaiian', price: '1,300' },
          { name: 'Seafood Pizza', price: '1,500' },
          { name: 'Verdura', price: '1,500' },
          { name: 'Diavola', price: '1,250' },
          { name: 'Carbonara', price: '1,300' },
          { name: 'Bolognese', price: '1,200' },
          { name: 'Pomodoro Veg', price: '800' },
          { name: 'Spaghetti Frutti di Mare', desc: 'Seafood', price: '1,600' },
          { name: 'Pasta Sauce', price: '950' },
        ]}
      />
      <MenuCategory
        icon="🍔"
        title="Burgers"
        items={[
          { name: 'Beef Burger', price: '1,200' },
          { name: 'Beef Cheese Burger', price: '1,050' },
          { name: 'Mini Beef Burger', price: '650' },
          { name: 'Chicken Burger', price: '1,100' },
          { name: 'Chicken Cheese Burger', price: '1,050' },
          { name: 'Mini Chicken Burger', price: '600' },
          { name: 'Fish Burger', desc: 'Tuna', price: '1,500' },
          { name: 'Steak Baguette', price: '1,700' },
          { name: 'Polish Zapiekanka', desc: 'With ham and mushrooms', price: '800' },
        ]}
      />
      <MenuCategory
        icon="🍛"
        title="Swahili Food"
        items={[
          { name: 'Beef Biryani', price: '750' },
          { name: 'Chicken Biryani', price: '850' },
          { name: 'Mbuzi Biryani', price: '950' },
          { name: 'Beef Pilau', price: '600' },
          { name: 'Chicken Pilau', price: '700' },
          { name: 'Mbuzi Pilau', price: '800' },
          { name: 'Eggs Curry', price: '550' },
          { name: 'Prawns Curry', desc: 'Served with coconut rice', price: '1,600' },
          { name: 'Octopus Curry', price: '1,100' },
        ]}
      />
      <MenuCategory
        icon="🍚"
        title="Accompaniments"
        items={[
          { name: 'Ugali', price: '150' },
          { name: 'Vegetable Rice', price: '350' },
          { name: 'Plain Rice', price: '300' },
          { name: 'Coconut Rice', price: '350' },
          { name: 'Mash Potatoes', price: '450' },
          { name: 'Chips', price: '300' },
          { name: 'Mixed Vegetables', price: '300' },
          { name: 'Spinach', desc: 'Creamed/Sauté', price: '450' },
          { name: 'Chapati', price: '300' },
        ]}
      />
      <MenuCategory
        icon="👶"
        title="Kids Corner"
        items={[
          { name: 'Chicken Nuggets', price: '650' },
          { name: 'Fish Fingers', price: '800' },
          { name: 'Chicken Wings', price: '800' },
        ]}
      />
    </div>
  );
}

function DrinksMenu() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MenuCategory
        icon="🥃"
        title="Aperitifs"
        items={[
          { name: 'Campari', price: '250' },
          { name: 'Aperol', price: '300' },
          { name: 'Martini Bianco', price: '300' },
          { name: 'Martini Extra', price: '300' },
          { name: 'Martini Rosso', price: '300' },
          { name: 'Cointreau', price: '350' },
        ]}
      />
      <MenuCategory
        icon="🍸"
        title="Vodka"
        items={[
          { name: 'Ciroc', size: '750ml', price: '8,500' },
          { name: 'Absolut', size: '750ml', price: '7,500' },
          { name: 'Belvedere', size: '750ml', price: '8,000' },
          { name: 'Smirnoff Black Label', size: '750ml', price: '6,000' },
          { name: 'Smirnoff Red Label', size: '750ml', price: '4,000' },
          { name: 'Smirnoff Red Label', size: '375ml', price: '2,200' },
          { name: 'Smirnoff Red Label', size: '250ml', price: '1,500' },
          { name: 'Gillbeys', size: '750ml', price: '4,000' },
          { name: 'Gillbeys', size: '375ml', price: '2,200' },
          { name: 'Gillbeys', size: '250ml', price: '1,500' },
        ]}
      />
      <MenuCategory
        icon="🍸"
        title="Gin"
        items={[
          { name: 'Tanqueray Dry', size: '750ml', price: '7,500' },
          { name: 'Tanqueray Royal', size: '750ml', price: '7,500' },
          { name: 'Tanqueray No.10', size: '750ml', price: '8,500' },
          { name: 'Tanqueray Sevilla', size: '750ml', price: '7,500' },
          { name: 'Tanqueray Rangpur', size: '750ml', price: '7,500' },
          { name: 'Bombay Sapphire', size: '750ml', price: '8,500' },
          { name: 'Beefeater', size: '750ml', price: '7,500' },
          { name: 'Hendricks', size: '750ml', price: '12,500' },
          { name: 'Gordons', size: '750ml', price: '5,000' },
          { name: 'Monkey 47', size: '700ml', price: '10,000' },
        ]}
      />
      <MenuCategory
        icon="🥃"
        title="Scotch Whisky"
        items={[
          { name: 'Johnny Walker Blue Label', size: '750ml', price: '50,000' },
          { name: 'Johnny Walker Gold Label', size: '750ml', price: '20,000' },
          { name: 'Johnny Walker 18y', size: '750ml', price: '20,000' },
          { name: 'Johnny Walker Reserve', size: '750ml', price: '18,000' },
          { name: 'Johnny Walker Green Label', size: '750ml', price: '15,000' },
          { name: 'Johnny Walker Double Black', size: '750ml', price: '11,250' },
          { name: 'Johnny Walker Black Label', size: '750ml', price: '5,000' },
          { name: 'Johnny Walker Black Label', size: '375ml', price: '3,800' },
          { name: 'Johnny Walker Red Label', size: '750ml', price: '5,000' },
          { name: 'Johnny Walker Red Label', size: '375ml', price: '2,600' },
          { name: 'Chivas Regal 18y', size: '750ml', price: '19,000' },
          { name: 'Chivas Regal 15y', size: '750ml', price: '12,000' },
          { name: 'Chivas Regal 12y', size: '750ml', price: '9,000' },
          { name: 'Glenfiddich 18y', size: '750ml', price: '25,000' },
          { name: 'Glenfiddich 15y', size: '750ml', price: '18,000' },
          { name: 'Glenfiddich 12y', size: '750ml', price: '15,000' },
          { name: 'Glenlivet 18y', size: '750ml', price: '25,000' },
          { name: 'Glenlivet 15y', size: '750ml', price: '18,500' },
          { name: 'Glenlivet 12y', size: '750ml', price: '15,000' },
          { name: 'Singleton 18y', size: '750ml', price: '18,000' },
          { name: 'Singleton 15y', size: '750ml', price: '15,000' },
          { name: 'Singleton 12y', size: '750ml', price: '12,000' },
          { name: 'Balantines', size: '750ml', price: '7,500' },
          { name: 'Monkey Shoulder', size: '750ml', price: '9,000' },
          { name: 'Famous Grouse', size: '750ml', price: '5,500' },
          { name: 'Grants', size: '750ml', price: '5,000' },
          { name: 'William Lawsons', size: '750ml', price: '5,000' },
        ]}
      />
      <MenuCategory
        icon="🥃"
        title="Irish Whiskey"
        items={[
          { name: 'Jameson', size: '750ml', price: '6,000' },
          { name: 'Jameson', size: '375ml', price: '3,200' },
          { name: 'Jameson Black Barrel', size: '750ml', price: '9,500' },
        ]}
      />
      <MenuCategory
        icon="🥃"
        title="Bourbon"
        items={[
          { name: 'Bulleit', size: '750ml', price: '7,500' },
          { name: 'Jim Beam', size: '750ml', price: '5,000' },
          { name: 'Jack Daniels', size: '750ml', price: '7,500' },
          { name: 'Jack Daniels', size: '375ml', price: '3,800' },
          { name: 'Jack Daniels Honey', size: '750ml', price: '8,000' },
          { name: 'Jack Daniels Single Barrel', size: '750ml', price: '16,000' },
          { name: 'Gentleman Jack', size: '750ml', price: '12,500' },
          { name: 'Southern Comfort', size: '750ml', price: '6,000' },
        ]}
      />
      <MenuCategory
        icon="🥃"
        title="Brandy & Cognac"
        items={[
          { name: 'Viceroy', price: '5,000' },
          { name: 'Martel VS', size: '750ml', price: '10,000' },
          { name: 'Martel VSOP', size: '750ml', price: '7,000' },
          { name: 'Martel Blue Swift', price: '18,000' },
          { name: 'Hennessy VS', size: '750ml', price: '11,000' },
          { name: 'Hennessy VSOP', size: '750ml', price: '20,000' },
          { name: 'Remy Martin', size: '750ml', price: '20,000' },
        ]}
      />
      <MenuCategory
        icon="🥃"
        title="Rum"
        items={[
          { name: 'Bacardi White', size: '750ml', price: '7,500' },
          { name: "Mayer's White", size: '750ml', price: '7,500' },
          { name: "Mayer's Black", size: '750ml', price: '7,500' },
          { name: 'Captain Morgan', size: '750ml', price: '6,250' },
          { name: 'Captain Morgan Spiced Gold', size: '750ml', price: '7,500' },
        ]}
      />
      <MenuCategory
        icon="🌮"
        title="Tequila"
        items={[
          { name: 'Don Julio', desc: 'Shot', price: '500' },
          { name: 'Don Julio Reposado', desc: 'Shot', price: '600' },
          { name: 'Don Julio Anejo', desc: 'Shot', price: '700' },
          { name: 'Camino Silver', desc: 'Shot', price: '300' },
          { name: 'Camino Gold', desc: 'Shot', price: '300' },
          { name: 'Jose Cuervo Silver', desc: 'Shot', price: '400' },
          { name: 'Jose Cuervo Gold', desc: 'Shot', price: '400' },
        ]}
      />
      <MenuCategory
        icon="🍾"
        title="Liqueurs"
        items={[
          { name: 'Amarula', size: '750ml', price: '7,500' },
          { name: 'Baileys', size: '750ml', price: '7,500' },
          { name: 'Jagermeister', size: '750ml', price: '8,750' },
          { name: 'Sambuca', size: '750ml', price: '6,000' },
          { name: 'Sheridans', size: '750ml', price: '10,000' },
          { name: 'Tequila Rose', price: '10,000' },
        ]}
      />
      <MenuCategory
        icon="🍷"
        title="Wines"
        items={[
          { name: 'Cuvee Speciale Sweet Red', desc: 'Per bottle', price: '5,000' },
          { name: 'Spier Sauvignon Blanc Dry', desc: 'Per bottle', price: '5,000' },
          { name: 'KingPin Cabernet Dry', desc: 'Per bottle', price: '5,000' },
          { name: 'Nederburg Chardonnay', desc: 'Per bottle', price: '5,000' },
          { name: 'Mucho Mas Rose Dry', desc: 'Per bottle', price: '5,500' },
          { name: 'House Wine', desc: 'Per glass, dry/sweet', price: '500' },
          { name: 'Martini Rose', price: '6,500' },
        ]}
      />
      <MenuCategory
        icon="🍾"
        title="Sparkling & Champagne"
        items={[
          { name: 'Moet & Chandon', price: '20,000' },
          { name: 'Belaire', price: '15,000' },
          { name: 'Bottega Gold', price: '12,000' },
          { name: 'Swartland', price: '8,000' },
          { name: 'J.C.Le Rouxe La Fleurette', price: '5,000' },
          { name: "L'Arnaude Brut", price: '5,000' },
        ]}
      />
      <MenuCategory
        icon="🍺"
        title="Beer Bottles"
        items={[
          { name: 'Tusker Lager', size: '500ml', price: '400' },
          { name: 'Balozi Lager', size: '500ml', price: '400' },
          { name: 'White Cap Lager', size: '500ml', price: '400' },
          { name: 'Pilsner Lager', size: '500ml', price: '400' },
          { name: 'Tusker Ndimu', size: '500ml', price: '400' },
          { name: 'Tusker Lite', size: '300ml', price: '400' },
          { name: 'Tusker Malt', size: '300ml', price: '400' },
          { name: 'White Cap Crisps', size: '300ml', price: '400' },
          { name: 'Guinness Stout', size: '500ml', price: '450' },
          { name: 'Guinness Smooth', size: '500ml', price: '450' },
          { name: 'Heineken', size: '330ml', price: '450' },
          { name: 'Corona', size: '330ml', price: '500' },
          { name: 'Desperado', size: '330ml', price: '450' },
          { name: 'King Fisher', size: '330ml', price: '450' },
          { name: 'Smirnoff Ice', price: '400' },
          { name: 'Snapp', price: '400' },
        ]}
      />
      <MenuCategory
        icon="🍺"
        title="Ciders"
        items={[
          { name: 'Tusker Cider', size: '500ml', price: '400' },
          { name: 'Savannah', price: '450' },
          { name: 'Hunters Dry', price: '450' },
          { name: 'Hunters Gold', price: '450' },
          { name: 'Kenya Original', price: '450' },
          { name: 'Manyatta', price: '450' },
        ]}
      />
      <MenuCategory
        icon="🍺"
        title="Beer Cans"
        items={[
          { name: 'Guinness', price: '500' },
          { name: 'Tusker Malt', price: '450' },
          { name: 'Pilsner', price: '450' },
          { name: 'Balozi', price: '450' },
          { name: 'Tusker Lager', price: '450' },
          { name: 'White Cap Lager', price: '450' },
          { name: 'Smirnoff Black Ice', price: '400' },
          { name: 'Smirnoff Pineapple Punch', price: '400' },
          { name: 'Smirnoff Guarana', price: '400' },
          { name: 'Snapp', price: '400' },
          { name: 'Tusker Cider', price: '450' },
        ]}
      />
      <MenuCategory
        icon="🍹"
        title="Signature Cocktails"
        items={[
          { name: 'Mojito', desc: 'White rum, lime, mint, sugar, soda', price: '750' },
          { name: 'Strawberry Mojito', desc: 'White rum, lime, mint, sugar, strawberry', price: '800' },
          { name: 'Spiced Mojito', desc: 'Dark rum, lime, mint, sugar, soda', price: '750' },
          { name: 'Piña Colada', desc: 'White rum, pineapple juice, malibu, coconut cream', price: '850' },
          { name: 'Blue Piña Colada', desc: 'White rum, blue curacao, malibu, pineapple juice, coconut', price: '850' },
          { name: 'Dawa', desc: 'Vodka, lime, honey', price: '700' },
          { name: 'Caipirinha', desc: 'Cachaca/white rum, sugar, soda water', price: '750' },
          { name: 'Caipiroska', desc: 'Vodka, lime juice, sugar', price: '700' },
          { name: 'Cuba Libre', desc: 'Dark rum, havana, lime, cola', price: '800' },
          { name: 'Long Island Ice Tea', desc: 'Vodka, tequila, gin, white rum, cointreau, cola', price: '1,200' },
          { name: 'Adios Motherfucker', desc: 'White rum, vodka, triple sec, gin, lime, sprite, blue curacao', price: '1,400' },
          { name: 'Bullfrog', desc: 'Vodka, gin, white rum, tequila, triple sec, blue curacao, red bull', price: '1,200' },
          { name: 'Mai Tai', desc: 'Dark rum, white rum, orange curacao, almond syrup, lime', price: '1,000' },
          { name: 'Margarita', desc: 'Tequila, triple sec, lime juice', price: '800' },
          { name: 'Blue Margarita', desc: 'Tequila, blue curacao, cointreau, lime', price: '850' },
          { name: 'Frozen Margarita', desc: 'Tequila, cointreau, lime juice', price: '850' },
          { name: 'Frozen Strawberry Margarita', desc: 'Tequila, cointreau, strawberry, lime', price: '850' },
          { name: 'Tequila Sunrise', desc: 'Tequila, orange juice, grenadine', price: '800' },
          { name: 'Sex on the Beach', desc: 'Vodka, peach schnapps, orange juice, cranberry', price: '900' },
          { name: 'Cosmopolitan', desc: 'Vodka, cointreau, cranberry juice, lime', price: '850' },
          { name: 'Espresso Martini', desc: 'Vodka, kahlua, espresso, simple syrup', price: '850' },
          { name: 'Classic Martini', desc: 'Vodka, gin, dry vermouth', price: '900' },
          { name: 'Manhattan', desc: 'Bourbon whisky, sweet vermouth, angostura', price: '900' },
          { name: 'Whisky Sour', desc: 'Bourbon whisky, egg white, lime, simple syrup', price: '850' },
          { name: 'Gin Sour', desc: 'Gin, egg white, sugar syrup, lime juice', price: '850' },
          { name: 'Gin Tonic', desc: 'Gin, tonic, lime', price: '700' },
          { name: 'Moscow Mule', desc: 'Vodka, lime juice, ginger beer', price: '800' },
          { name: 'Americano', desc: 'Campari, martini rosso, soda water', price: '800' },
          { name: 'Negroni', desc: 'Campari, martini rosso, gin', price: '900' },
          { name: 'Aperol Spritz', desc: 'Aperol, vodka, prosecco, soda', price: '1,000' },
          { name: 'Jager Bomb', desc: 'Jagermeister, red bull', price: '1,000' },
          { name: 'Daiquiri', desc: 'White rum, lime juice, sugar', price: '850' },
          { name: 'Mango Daiquiri', desc: 'White rum, lime juice, mango juice, sugar', price: '850' },
          { name: 'Love Potion', desc: 'Vodka, peach schnapps, cranberry juice, grenadine', price: '850' },
          { name: 'Blue Hawaii', desc: 'White rum, vodka, blue curacao, pineapple juice, sugar', price: '800' },
          { name: 'Tropical Tipsy', desc: 'White rum, midori, blue curacao, pineapple juice, coconut', price: '900' },
          { name: 'White Russian', desc: 'Vodka, coffee liqueur, cream', price: '900' },
          { name: 'Black Russian', desc: 'Vodka, coffee liqueur', price: '800' },
          { name: 'Vodka Tonic', price: '700' },
          { name: 'Screwdriver', desc: 'Vodka, orange juice', price: '700' },
          { name: 'Vodka Sunrise', desc: 'Vodka, orange juice, grenadine syrup', price: '750' },
        ]}
      />
      <MenuCategory
        icon="🥤"
        title="Mocktails"
        items={[
          { name: 'Coconut Kiss', desc: 'Pineapple juice, orange juice, coconut cream, grenadine', price: '500' },
          { name: 'Dawa Sawa', desc: 'Lime, honey, sprite', price: '400' },
          { name: 'Apple Ginger Fizz', desc: 'Fresh mint, lime, sugar, soda water', price: '450' },
          { name: 'Virgin Mojito', desc: 'Lime, mint, sugar, soda water', price: '400' },
          { name: 'Blush Berry Cooler', desc: 'Mixed berry juice, lemon juice, mint, sprite', price: '450' },
          { name: 'Lemonade', desc: 'Lemon juice, simple syrup, sparkling water', price: '450' },
          { name: 'Tropical Breeze', desc: 'Pineapple juice, orange juice, coconut syrup, lime juice', price: '450' },
          { name: 'Berry Bliss', desc: 'Cranberry juice, apple juice, lemon juice', price: '450' },
          { name: 'Passion Sunrise', desc: 'Passion fruit juice, orange juice, grenadine', price: '450' },
          { name: 'Mango Mint Cooler', desc: 'Mango juice, simple syrup, mint leaves, lemon juice, sparkling water', price: '400' },
          { name: 'Coco Lime Fizz', desc: 'Coconut milk, pineapple syrup, lime juice, sparkling water', price: '500' },
        ]}
      />
      <MenuCategory
        icon="🥤"
        title="Soft Drinks"
        items={[
          { name: 'Soda', desc: 'Cola, Fanta, Sprite, Crest', price: '200' },
          { name: 'Fresh Juice', desc: 'Passion, orange, mango, pineapple', price: '350' },
          { name: 'Del Monte Juice', size: '1L', price: '450' },
          { name: 'Still Water', size: '0.5L', price: '150' },
          { name: 'Still Water', size: '1L', price: '300' },
          { name: 'Sparkling Water', size: '1L', price: '400' },
          { name: 'Sparkling Water', size: '0.5L', price: '200' },
          { name: 'Keringet', size: '1L', price: '350' },
          { name: 'Red Bull', price: '450' },
          { name: 'Lime Cordial', price: '50' },
        ]}
      />
    </div>
  );
}

interface MenuItem {
  name: string;
  desc?: string;
  size?: string;
  price: string;
}

function MenuCategory({ icon, title, items }: { icon: string; title: string; items: MenuItem[] }) {
  return (
    <div className="group relative">
      <div className="relative bg-gradient-to-b from-slate-900/80 to-black/80 backdrop-blur-2xl border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/5">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div className="relative p-4 sm:p-6 lg:p-8">
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="text-2xl sm:text-3xl lg:text-4xl transform group-hover:scale-110 transition-transform duration-500">{icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight truncate">{title}</h3>
                <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-amber-500/50 to-transparent mt-1.5 sm:mt-2"></div>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-5 max-h-[400px] sm:max-h-[500px] overflow-y-auto custom-scrollbar pr-2 sm:pr-3">
            {items.map((item, i) => (
              <div key={i} className="group/item relative py-2 sm:py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-all duration-300 rounded-lg px-1.5 sm:px-2">
                <div className="flex justify-between items-start gap-3 sm:gap-6">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white/90 text-xs sm:text-sm tracking-wide mb-0.5 sm:mb-1 group-hover/item:text-amber-400/90 transition-colors duration-300 leading-tight">
                      {item.name}
                    </h4>
                    {(item.desc || item.size) && (
                      <p className="text-white/40 text-[10px] sm:text-xs leading-relaxed font-light line-clamp-2">
                        {item.desc || item.size}
                      </p>
                    )}
                  </div>
                  <div className="flex items-baseline gap-0.5 sm:gap-1 flex-shrink-0">
                    <span className="text-[9px] sm:text-[10px] text-amber-500/60 font-light">KSH</span>
                    <span className="font-serif text-amber-400/90 font-medium text-sm sm:text-base tracking-tight whitespace-nowrap">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

