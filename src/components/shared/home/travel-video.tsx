"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type TravelVideoProps = {
  desktopSources: string[];
  mobileSources?: string[];
  poster?: string;
  className?: string;
};

export function TravelVideo({
  desktopSources,
  mobileSources = [],
  poster,
  className = "",
}: TravelVideoProps) {
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  /*
   * =========================================================
   * VIDEO SOURCES
   * =========================================================
   */

  const desktopVideos = useMemo(
    () => desktopSources.filter(Boolean),
    [desktopSources]
  );

  const mobileVideos = useMemo(
    () =>
      mobileSources.length > 0
        ? mobileSources.filter(Boolean)
        : desktopVideos,
    [mobileSources, desktopVideos]
  );

  /*
   * =========================================================
   * CURRENT VIDEO
   * =========================================================
   */

  const currentDesktop = desktopVideos.length
    ? desktopVideos[currentIndex % desktopVideos.length]
    : undefined;

  const currentMobile = mobileVideos.length
    ? mobileVideos[currentIndex % mobileVideos.length]
    : currentDesktop;

  /*
   * =========================================================
   * VIDEO READY
   * =========================================================
   */

  const handleCanPlay = useCallback(() => {
    setIsReady(true);
  }, []);

  /*
   * =========================================================
   * NEXT VIDEO
   * =========================================================
   */

  const playNext = useCallback(() => {
    if (desktopVideos.length <= 1) {
      return;
    }

    setIsReady(false);

    setCurrentIndex((previous) => {
      return (previous + 1) % desktopVideos.length;
    });
  }, [desktopVideos.length]);

  /*
   * =========================================================
   * PLAY CURRENT VIDEO
   * =========================================================
   */

  useEffect(() => {
    const desktopVideo = desktopVideoRef.current;
    const mobileVideo = mobileVideoRef.current;

    const videos = [
      desktopVideo,
      mobileVideo,
    ].filter(
      (video): video is HTMLVideoElement =>
        video !== null
    );

    videos.forEach((video) => {
      video.currentTime = 0;

      const promise = video.play();

      if (promise !== undefined) {
        promise.catch(() => {
          /*
           * Autoplay can be blocked by the browser.
           * Video is muted, so this normally succeeds.
           */
        });
      }
    });
  }, [currentIndex]);

  /*
   * =========================================================
   * EMPTY STATE
   * =========================================================
   */

  if (desktopVideos.length === 0) {
    return (
      <div
        className={`
          absolute
          inset-0
          bg-[#004E12]
          ${className}
        `}
        aria-hidden="true"
      />
    );
  }

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div
      className={`
        absolute
        inset-0
        overflow-hidden
        ${className}
      `}
      aria-hidden="true"
    >
      {/* ===================================================
          DESKTOP VIDEO
          =================================================== */}

      {currentDesktop && (
        <video
          ref={desktopVideoRef}
          key={`desktop-${currentIndex}`}
          className={`
            absolute
            inset-0
            hidden
            h-full
            w-full
            object-cover
            md:block
            transition-opacity
            duration-700
            ${isReady ? "opacity-100" : "opacity-0"}
          `}
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster={poster}
          onCanPlay={handleCanPlay}
          onEnded={playNext}
        >
          <source
            src={currentDesktop}
            type="video/mp4"
          />
        </video>
      )}

      {/* ===================================================
          MOBILE VIDEO
          =================================================== */}

      {currentMobile && (
        <video
          ref={mobileVideoRef}
          key={`mobile-${currentIndex}`}
          className={`
            absolute
            inset-0
            h-full
            w-full
            object-cover
            md:hidden
            transition-opacity
            duration-700
            ${isReady ? "opacity-100" : "opacity-0"}
          `}
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster={poster}
          onCanPlay={handleCanPlay}
          onEnded={playNext}
        >
          <source
            src={currentMobile}
            type="video/mp4"
          />
        </video>
      )}

      {/* ===================================================
          POSTER / LOADING BACKGROUND
          =================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          inset-0
          bg-[#004E12]
          bg-cover
          bg-center
          transition-opacity
          duration-700
          ${isReady ? "opacity-0" : "opacity-100"}
        `}
        style={
          poster
            ? {
                backgroundImage: `url("${poster}")`,
              }
            : undefined
        }
      />

      {/* ===================================================
          CINEMATIC OVERLAY
          =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/30
        "
      />

      {/* ===================================================
          TOP GRADIENT
          =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-48
          bg-gradient-to-b
          from-black/50
          via-black/20
          to-transparent
        "
      />

      {/* ===================================================
          BOTTOM GRADIENT
          =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-2/3
          bg-gradient-to-t
          from-black/60
          via-black/20
          to-transparent
        "
      />
    </div>
  );
}