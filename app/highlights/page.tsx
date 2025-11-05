"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

interface HighlightItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  artist: string;
  title: string;
}

// Highlights data
// Note: DNG files are not supported in browsers - convert to JPG/PNG
// Supported formats: JPG, JPEG, PNG, GIF, WEBP for images | MP4, WEBM, MOV for videos
const highlights: HighlightItem[] = [
  // Kaligraph Jones
  {
    id: '1',
    type: 'image',
    src: '/highlights/kaligraph jones/IMG_0186.JPG',
    artist: 'Kaligraph Jones',
    title: 'Live Performance'
  },
  {
    id: '2',
    type: 'video',
    src: '/highlights/kaligraph jones/IMG_2138.MOV',
    artist: 'Kaligraph Jones',
    title: 'Exclusive Show'
  },
  {
    id: '12',
    type: 'image',
    src: '/highlights/kaligraph jones/IMG_2932.jpg',
    artist: 'Masauti',
    title: 'Behind The Scenes'
  },

  // Okello Max
  {
    id: '3',
    type: 'video',
    src: '/highlights/okello max/IMG_2809.MOV',
    artist: 'Okello Max',
    title: 'Live at Cocobongo'
  },
  {
    id: '4',
    type: 'video',
    src: '/highlights/okello max/IMG_2871.MOV',
    artist: 'Okello Max',
    title: 'Unforgettable Performance'
  },
  {
    id: '5',
    type: 'image',
    src: '/highlights/okello max/IMG_3270.JPG',
    artist: 'Okello Max',
    title: 'Epic Night'
  },

  // Cocobongo Nights
  {
    id: '6',
    type: 'image',
    src: '/highlights/cocobongo nights/IMG_0187.JPG',
    artist: 'Cocobongo Nights',
    title: 'The Vibe'
  },
  {
    id: '7',
    type: 'image',
    src: '/highlights/cocobongo nights/IMG_0238.JPG',
    artist: 'Cocobongo Nights',
    title: 'Club Atmosphere'
  },
  {
    id: '8',
    type: 'video',
    src: '/highlights/cocobongo nights/IMG_0445.MOV',
    artist: 'Cocobongo Nights',
    title: 'Party Energy'
  },
  {
    id: '9',
    type: 'video',
    src: '/highlights/cocobongo nights/IMG_1626.MP4',
    artist: 'Cocobongo Nights',
    title: 'Dance Floor Action'
  },
  {
    id: '10',
    type: 'video',
    src: '/highlights/cocobongo nights/IMG_2796.MOV',
    artist: 'Cocobongo Nights',
    title: 'Weekend Vibes'
  },
  // IMG_3050.DNG - Not supported (RAW format - convert to JPG to use)

  // Mejja
  {
    id: '11',
    type: 'video',
    src: '/highlights/mejja/IMG_3294.MP4',
    artist: 'Mejja',
    title: 'Live Performance'
  },
];

export default function HighlightsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Initialize loading states using useMemo to avoid cascading renders
  const initialLoadingStates = useMemo(() => {
    const states: { [key: string]: boolean } = {};
    highlights.forEach(item => {
      states[item.id] = true; // Start with everything loading
    });
    return states;
  }, []);

  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>(initialLoadingStates);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track loading state for each media item
  const setMediaLoading = (id: string, isLoading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [id]: isLoading }));
  };

  // Handle share functionality
  const handleShare = async () => {
    const shareUrl = window.location.origin + '/highlights';
    const shareData = {
      title: 'Club Cocobongo Highlights',
      text: 'Check out these amazing highlights from Club Cocobongo - Diani\'s premier nightlife destination!',
      url: shareUrl,
    };

    try {
      // Check if Web Share API is available (mobile/modern browsers)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      }
    } catch {
      // If sharing fails or is cancelled, try clipboard as fallback
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } catch {
        console.error('Sharing failed');
      }
    }
  };

  // Auto-play current video
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo && highlights[currentIndex].type === 'video') {
      currentVideo.currentTime = 0;

      // Only play if video is ready
      const playVideo = () => {
        currentVideo.play().catch(() => {
          // Autoplay might be blocked
        });
      };

      if (currentVideo.readyState >= 3) {
        // Video is ready to play
        playVideo();
      } else {
        // Wait for video to be ready
        currentVideo.addEventListener('canplay', playVideo, { once: true });
      }
    }

    // Pause other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
      }
    });
  }, [currentIndex]);

  // Handle scroll
  const handleScroll = useCallback((direction: 'up' | 'down') => {
    if (direction === 'down' && currentIndex < highlights.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'up' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        handleScroll('down');
      } else if (e.key === 'ArrowUp') {
        handleScroll('up');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, handleScroll]);

  // Wheel navigation
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 500);

      isScrolling = true;

      if (e.deltaY > 0) {
        handleScroll('down');
      } else {
        handleScroll('up');
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex, handleScroll]);

  // Touch navigation for mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleScroll('down');
        } else {
          handleScroll('up');
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentIndex, handleScroll]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden" ref={containerRef}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo02.png"
                alt="Club Cocobongo"
                width={40}
                height={40}
                className="sm:w-12 sm:h-12"
              />
              <div className="text-sm sm:text-base lg:text-lg">
                <div className="font-bold text-white/90 leading-none">CLUB</div>
                <div className="font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent leading-none">
                  COCOBONGO
                </div>
              </div>
            </Link>

            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors text-sm sm:text-base"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* Highlights Container */}
      <div className="relative w-full h-full">
        {highlights.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-transform duration-500 ease-out ${
              index === currentIndex
                ? 'translate-y-0 opacity-100'
                : index < currentIndex
                ? '-translate-y-full opacity-0'
                : 'translate-y-full opacity-0'
            }`}
          >
            {/* Media Container */}
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {/* Loading State - Show thumbnail and info */}
              {loadingStates[item.id] && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black via-slate-900 to-black z-20">
                  {/* Artist Info Preview */}
                  <div className="text-center space-y-4 px-6">
                    {/* Icon */}
                    <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border-2 border-amber-500/30">
                      {item.type === 'video' ? (
                        <svg className="w-10 h-10 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                      ) : (
                        <svg className="w-10 h-10 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>

                    {/* Artist Name */}
                    <div>
                      <h3 className="text-white font-bold text-2xl sm:text-3xl mb-2">
                        {item.artist}
                      </h3>
                      <p className="text-amber-400/90 text-base sm:text-lg">
                        {item.title}
                      </p>
                    </div>

                    {/* Loading Spinner */}
                    <div className="relative inline-block">
                      <div className="w-12 h-12 border-3 border-white/20 border-t-amber-400 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-amber-400/20 rounded-full blur-lg animate-pulse"></div>
                      </div>
                    </div>

                    {/* Loading Text */}
                    <p className="text-white/50 text-sm">
                      {item.type === 'video' ? 'Loading video...' : 'Loading image...'}
                    </p>
                  </div>
                </div>
              )}

              {item.type === 'image' ? (
                <div className="relative w-full h-full">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-contain"
                    priority={index === currentIndex}
                    onLoadingComplete={() => setMediaLoading(item.id, false)}
                    onLoadStart={() => setMediaLoading(item.id, true)}
                  />
                </div>
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={item.src}
                  className="w-full h-full object-contain"
                  loop
                  playsInline
                  muted={isMuted}
                  preload="metadata"
                  onLoadStart={() => setMediaLoading(item.id, true)}
                  onCanPlay={() => setMediaLoading(item.id, false)}
                  onLoadedMetadata={() => {
                    // Video metadata is loaded, we can show it now
                    setMediaLoading(item.id, false);
                  }}
                />
              )}

              {/* Gradient Overlays */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

              {/* Content Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                <div className="max-w-md">
                  <h2 className="text-white font-bold text-2xl sm:text-3xl mb-2">
                    {item.artist}
                  </h2>
                  <p className="text-white/80 text-base sm:text-lg mb-4">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 text-amber-400 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>Club Cocobongo, Diani</span>
                  </div>
                </div>
              </div>

              {/* Side Actions */}
              <div className="absolute right-4 sm:right-6 bottom-24 sm:bottom-32 flex flex-col gap-6 z-10">
                {/* Mute/Unmute Button (for videos) */}
                {item.type === 'video' && index === currentIndex && (
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    {isMuted ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>
                )}

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all group"
                >
                  {shareSuccess ? (
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  )}
                  {shareSuccess && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-green-500 text-white text-xs px-3 py-1.5 rounded-full">
                      Link Copied!
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col gap-2">
        {highlights.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-amber-400 h-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll Hints */}
      {currentIndex < highlights.length - 1 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <button
            onClick={() => handleScroll('down')}
            className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
          >
            <span className="text-xs font-semibold tracking-wider uppercase">Swipe Up</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="fixed top-20 left-0 right-0 z-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex gap-1">
            {highlights.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full bg-amber-400 transition-all duration-300 ${
                    index < currentIndex
                      ? 'w-full'
                      : index === currentIndex
                      ? 'w-full'
                      : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

