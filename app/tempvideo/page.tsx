"use client";
import React, { useRef, useState, useEffect } from "react";

const EnhancedVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [buffered, setBuffered] = useState<number>(0);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [quality, setQuality] = useState<string>("Auto");
  const [showQualityMenu, setShowQualityMenu] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSkipIndicator, setShowSkipIndicator] = useState<
    "forward" | "backward" | null
  >(null);

  const defaultVideoUrl =
    "https://minio.gen-tech.io/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3Rlc3QtYnVja2V0L01BVFJJWCUyMEZ1bGwlMjBNb3ZpZSUyMDIwMjRfJTIwTmVvJTIwUmV0dXJucyUyMF8lMjBGdWxsSER2aWRlb3M0bWUlMjBOZXclMjBBY3Rpb24lMjBNb3ZpZXMlMjAyMDI0JTIwaW4lMjBFbmdsaXNoJTIwJTI4R2FtZSUyME1vdmllJTI5Lm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUg4MlRTN1pYV0s3STFVUTRSVUlQJTJGMjAyNTEwMDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMDA4VDEwMDIzMFomWC1BbXotRXhwaXJlcz00MzE5NyZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSklPREpVVXpkYVdGZExOMGt4VlZFMFVsVkpVQ0lzSW1WNGNDSTZNVGMxT1RrMU9EazNPU3dpY0dGeVpXNTBJam9pWjJWdWRHVmphQ0o5Llc3OU1lR1lkV0FLWjBNTVRQMV9GS3hHVDRaU1RnYjhHNFdqT0ZydHVsTDBlTmZOT05MZlJtT1JfQXpRUW13dk1TVkMwb2RFWmhpSVZsZnZRaTNBVjJ3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9MTkxYzhiMjk2Y2VjYWUwMDkxYTI4YzQzNTIyMGY1Mjc4ODE3NzVmYmU4ZTU0MDM3MTkyNmQzOGM3NjU2ODliNA";

  const [videoUrl, setVideoUrl] = useState<string>(defaultVideoUrl);
  const [inputUrl, setInputUrl] = useState<string>(defaultVideoUrl);

  // Format time as MM:SS or HH:MM:SS
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Show skip indicator animation
  const showSkipAnimation = (direction: "forward" | "backward") => {
    setShowSkipIndicator(direction);
    setTimeout(() => setShowSkipIndicator(null), 500);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.key.toLowerCase()) {
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "arrowright":
          e.preventDefault();
          videoRef.current.currentTime = Math.min(
            videoRef.current.currentTime + 5,
            videoRef.current.duration
          );
          showSkipAnimation("forward");
          break;
        case "arrowleft":
          e.preventDefault();
          videoRef.current.currentTime = Math.max(
            videoRef.current.currentTime - 5,
            0
          );
          showSkipAnimation("backward");
          break;
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "arrowup":
          e.preventDefault();
          changeVolume(Math.min(volume + 0.1, 1));
          break;
        case "arrowdown":
          e.preventDefault();
          changeVolume(Math.max(volume - 0.1, 0));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [volume]);

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", () => {
        if (isPlaying) setShowControls(false);
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Error entering fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleProgress = () => {
    if (videoRef.current && videoRef.current.buffered.length > 0) {
      const bufferedEnd = videoRef.current.buffered.end(
        videoRef.current.buffered.length - 1
      );
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setBuffered((bufferedEnd / duration) * 100);
      }
    }
  };

  const handleProgressBarHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const time = pos * (videoRef.current.duration || 0);
    setHoverTime(time);
    setHoverPosition(e.clientX - rect.left);
  };

  const handleProgressBarLeave = () => {
    setHoverTime(null);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 0);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const changeSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const changeVolume = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeVolume(parseFloat(e.target.value));
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted || volume === 0) {
        const newVolume = volume === 0 ? 1 : volume;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const downloadVideo = () => {
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setShowSettings(false);
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        videoRef.current.duration
      );
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 10,
        0
      );
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        ref={containerRef}
        style={{
          maxWidth: "1400px",
          width: "100%",
          position: "relative",
        }}
      >
        <h1
          style={{
            color: "#fff",
            marginBottom: "30px",
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "700",
            letterSpacing: "-0.5px",
          }}
        >
          Professional Video Player
        </h1>

        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter video URL"
            style={{
              width: "70%",
              maxWidth: "900px",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "#0f0f0f",
              color: "#fff",
              marginRight: "8px",
            }}
          />
          <button
            onClick={() => setVideoUrl(inputUrl)}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              background: "#e50914",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Load
          </button>
        </div>

        <div
          style={{
            position: "relative",
            backgroundColor: "#000",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          }}
          onClick={togglePlayPause}
        >
          <video
            ref={videoRef}
            autoPlay
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              cursor: "pointer",
            }}
            src={videoUrl}
            onTimeUpdate={handleTimeUpdate}
            onProgress={handleProgress}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={handlePlay}
            onPause={handlePause}
          >
            Your browser does not support the video tag.
          </video>

          {/* Skip Indicators */}
          {showSkipIndicator && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: showSkipIndicator === "forward" ? "60%" : "40%",
                transform: "translate(-50%, -50%)",
                fontSize: "60px",
                color: "#fff",
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                animation: "fadeOut 0.5s ease-out",
                pointerEvents: "none",
              }}
            >
              {showSkipIndicator === "forward" ? "⏩" : "⏪"}
              <div
                style={{
                  fontSize: "18px",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                {showSkipIndicator === "forward" ? "+5s" : "-5s"}
              </div>
            </div>
          )}

          {/* Loading Spinner */}
          {!isPlaying && currentTime === 0 && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                fontSize: "48px",
              }}
            >
              ⏳
            </div>
          )}

          {/* Custom Controls */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
              padding: "60px 20px 20px",
              opacity: showControls ? 1 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: showControls ? "auto" : "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress Bar Container */}
            <div
              ref={progressBarRef}
              onMouseMove={handleProgressBarHover}
              onMouseLeave={handleProgressBarLeave}
              onClick={handleProgressBarClick}
              style={{
                position: "relative",
                width: "100%",
                height: "6px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                cursor: "pointer",
                marginBottom: "20px",
                borderRadius: "3px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: `${buffered}%`,
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  transition: "width 0.2s",
                  borderRadius: "3px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: `${(currentTime / duration) * 100}%`,
                  backgroundColor: "#e50914",
                  transition: "width 0.1s",
                  borderRadius: "3px",
                }}
              />
              {hoverTime !== null && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: `${hoverPosition}px`,
                    transform: "translateX(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    color: "#000",
                    padding: "6px 10px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  {formatTime(hoverTime)}
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "15px",
              }}
            >
              {/* Left Controls */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <button
                  onClick={togglePlayPause}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "28px",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    transition: "transform 0.1s",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const t = e.currentTarget as HTMLButtonElement;
                    t.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const t = e.currentTarget as HTMLButtonElement;
                    t.style.transform = "scale(1)";
                  }}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>

                <button
                  onClick={skipBackward}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "24px",
                    padding: "8px",
                  }}
                >
                  ⏪
                </button>

                <button
                  onClick={skipForward}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "24px",
                    padding: "8px",
                  }}
                >
                  ⏩
                </button>

                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <button
                    onClick={toggleMute}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "22px",
                      padding: "8px",
                    }}
                  >
                    {isMuted || volume === 0
                      ? "🔇"
                      : volume < 0.5
                      ? "🔉"
                      : "🔊"}
                  </button>
                  {showVolumeSlider && (
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      style={{
                        width: "100px",
                        marginLeft: "12px",
                        cursor: "pointer",
                        accentColor: "#e50914",
                      }}
                    />
                  )}
                </div>

                <div
                  style={{
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "500",
                    marginLeft: "5px",
                  }}
                >
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Right Controls */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  position: "relative",
                }}
              >
                {/* Quality Selector */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "13px",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      fontWeight: "600",
                    }}
                  >
                    {quality}
                  </button>
                  {showQualityMenu && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "45px",
                        right: "0",
                        backgroundColor: "rgba(28, 28, 28, 0.98)",
                        borderRadius: "8px",
                        padding: "8px",
                        minWidth: "120px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
                      }}
                    >
                      {["Auto", "1080p", "720p", "480p", "360p"].map((q) => (
                        <button
                          key={q}
                          onClick={() => {
                            setQuality(q);
                            setShowQualityMenu(false);
                          }}
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            backgroundColor:
                              quality === q
                                ? "rgba(229, 9, 20, 0.8)"
                                : "transparent",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            textAlign: "left",
                            marginBottom: "4px",
                          }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Settings */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "24px",
                      padding: "8px",
                    }}
                  >
                    ⚙
                  </button>
                  {showSettings && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "45px",
                        right: "0",
                        backgroundColor: "rgba(28, 28, 28, 0.98)",
                        borderRadius: "8px",
                        padding: "15px",
                        minWidth: "240px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
                        zIndex: 1000,
                      }}
                    >
                      <div style={{ marginBottom: "15px" }}>
                        <div
                          style={{
                            color: "#999",
                            fontSize: "11px",
                            marginBottom: "10px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Playback Speed
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                          }}
                        >
                          {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(
                            (speed) => (
                              <button
                                key={speed}
                                onClick={() => changeSpeed(speed)}
                                style={{
                                  padding: "8px 14px",
                                  backgroundColor:
                                    playbackSpeed === speed
                                      ? "#e50914"
                                      : "rgba(255,255,255,0.1)",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                }}
                              >
                                {speed}x
                              </button>
                            )
                          )}
                        </div>
                      </div>
                      <button
                        onClick={downloadVideo}
                        style={{
                          width: "100%",
                          padding: "12px",
                          backgroundColor: "rgba(255,255,255,0.1)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        ⬇ Download Video
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={toggleFullscreen}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "24px",
                    padding: "8px",
                  }}
                >
                  {isFullscreen ? "⛶" : "⛶"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            color: "#999",
            marginTop: "30px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: "20px 30px",
              borderRadius: "12px",
            }}
          >
            <p
              style={{ marginBottom: "15px", color: "#fff", fontWeight: "600" }}
            >
              ⌨️ Keyboard Shortcuts
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
                textAlign: "left",
              }}
            >
              <div>
                <kbd
                  style={{
                    padding: "2px 6px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "3px",
                  }}
                >
                  Space
                </kbd>{" "}
                Play/Pause
              </div>
              <div>
                <kbd
                  style={{
                    padding: "2px 6px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "3px",
                  }}
                >
                  F
                </kbd>{" "}
                Fullscreen
              </div>
              <div>
                <kbd
                  style={{
                    padding: "2px 6px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "3px",
                  }}
                >
                  ←
                </kbd>{" "}
                Skip -5s
              </div>
              <div>
                <kbd
                  style={{
                    padding: "2px 6px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "3px",
                  }}
                >
                  →
                </kbd>{" "}
                Skip +5s
              </div>
              <div>
                <kbd
                  style={{
                    padding: "2px 6px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "3px",
                  }}
                >
                  M
                </kbd>{" "}
                Mute
              </div>
              <div>
                <kbd
                  style={{
                    padding: "2px 6px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "3px",
                  }}
                >
                  ↑↓
                </kbd>{" "}
                Volume
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.3);
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedVideoPlayer;
