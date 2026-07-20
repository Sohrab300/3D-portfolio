import { useState, useRef, useEffect } from "react";
import TitleHeader from "../components/TitleHeader";

const Showcase = () => {
  const cards = [
    {
      title: "Astra Shop",
      genre: "E-Commerce App",
      image: `${import.meta.env.BASE_URL}images/showcase/AS.png`,
      tech: ["React", "Redux", "Tailwind CSS", "Node.js", "MongoDB"],
      description:
        "A premium e-commerce web application featuring high-fidelity search, dynamic filters, real-time checkout integrations, and full admin inventory dashboards.",
    },
    {
      title: "Dev Schedule Dashboard",
      genre: "Productivity Portal",
      image: `${import.meta.env.BASE_URL}images/showcase/DS-A.png`,
      tech: ["React", "Tailwind CSS", "Vite", "Recharts", "Framer Motion"],
      description:
        "An interactive, visually rich scheduling portal designed for developers. Features real-time event tracking, workload statistics, and automated task metrics.",
    },
    {
      title: "Dev Schedule Landing",
      genre: "Marketing Page",
      image: `${import.meta.env.BASE_URL}images/showcase/DS-B.png`,
      tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "GSAP"],
      description:
        "A high-performance, SEO-optimized landing page featuring elegant micro-animations, interactive product previews, and responsive layouts.",
    },
    {
      title: "Music Wave Player",
      genre: "Audio Streaming",
      image: `${import.meta.env.BASE_URL}images/showcase/MW.png`,
      tech: ["Next.js", "Web Audio API", "Redux Toolkit", "Tailwind CSS"],
      description:
        "A modern web-based audio player engineered for high-fidelity streaming. Features custom playlist builders, audio queues, and custom equalizer settings.",
    },
    {
      title: "Nexus Tech Portal",
      genre: "Business Platform",
      image: `${import.meta.env.BASE_URL}images/showcase/NT.png`,
      tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Prisma"],
      description:
        "A comprehensive portal offering agency services, interactive client calendars, automated invoicing systems, and secure document vaults.",
    },
    {
      title: "Portfolio Designer",
      genre: "Creative Sandbox",
      image: `${import.meta.env.BASE_URL}images/showcase/PD.png`,
      tech: ["React", "Three.js", "React Three Fiber", "Drei", "GSAP"],
      description:
        "An immersive 3D portfolio studio demonstrating shaders, interactive camera motions, light configuration controls, and custom model maps.",
    },
    {
      title: "Ryde Grid Analytics",
      genre: "Logistics Dashboard",
      image: `${import.meta.env.BASE_URL}images/showcase/RG.png`,
      tech: ["React", "Leaflet Maps", "Recharts", "Node.js", "Express"],
      description:
        "A real-time analytics hub mapping transit routes, driver dispatcher grids, regional demand hotspots, and trip completion metrics.",
    },
    {
      title: "Shadow Craft Studio",
      genre: "3D Customizer",
      image: `${import.meta.env.BASE_URL}images/showcase/SC.png`,
      tech: ["React", "Three.js", "React Three Fiber", "Drei", "Tailwind CSS"],
      description:
        "A photorealistic interactive 3D product customizer allowing dynamic material edits, lighting controls, and real-time shadow casting.",
    },
  ];

  const N = cards.length;
  const theta = 360 / N;
  const autoplaySpeed = 0.08; // slow autoplay speed in degrees/frame

  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayTitle, setDisplayTitle] = useState(cards[0].title);
  const [displayGenre, setDisplayGenre] = useState(cards[0].genre);
  const [transitionClass, setTransitionClass] = useState("");
  const [dimensions, setDimensions] = useState({ width: 460, height: 270 });
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [wrapperHeight, setWrapperHeight] = useState("485px");

  const radius = dimensions.width * 1.35; // Mathematically optimized cylinder radius for 8 cards

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const rotationRef = useRef(0);
  const velocityRef = useRef(autoplaySpeed);
  const targetRotationRef = useRef(null);
  const lastActiveIndex = useRef(0);
  const prevActiveIndex = useRef(0);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const requestRef = useRef(null);

  // Responsive card dimensions update on screen resize
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobileOrTablet(w < 768); // side-by-side layout starts at md (768px)

      // Calculate wrapper height dynamically based on screen width
      if (w < 550) {
        setWrapperHeight("280px");
      } else if (w < 768) {
        setWrapperHeight("320px");
      } else if (w < 1024) {
        setWrapperHeight("400px");
      } else {
        setWrapperHeight("485px");
      }

      let cardW = 460;
      if (w < 550) {
        cardW = Math.round(Math.min(170, Math.max(160, w * 0.52))); // Extra compact on mobile under 550px
      } else if (w < 768) {
        cardW = Math.round(Math.min(180, Math.max(240, w * 0.58))); // Compact card width on large mobile/tablet
      } else {
        // Tablet and Desktop (w >= 768) - side-by-side layout when open:
        if (isDetailOpen) {
          if (w < 768) {
            cardW = 260; // Enlarge 3D cards on small tablets
          } else if (w < 900) {
            cardW = 200; // Enlarge 3D cards on small tablets
          } else if (w < 1024) {
            cardW = 250; // Enlarge 3D cards on medium tablets
          } else if (w < 1280) {
            cardW = 260; // Medium card for iPads and small desktops
          } else if (w < 1440) {
            cardW = 360; // Large card
          } else {
            cardW = 380; // Full desktop size when detail is open
          }
        } else {
          // Closed state sizing:
          if (w < 768) {
            cardW = 180; // Normal mobile size when closed
          } else if (w < 900) {
            cardW = 240; // Normal tablet size when closed
          } else if (w < 1024) {
            cardW = 280; // Normal tablet size when closed
          } else if (w < 1280) {
            cardW = 320; // Medium card for iPads and small desktops
          } else {
            cardW = 360; // Normal desktop size when closed
          }
        }
      }
      const cardH = Math.round(cardW * 0.628); // Match showcase images aspect ratio (approx 2940x1845)
      setDimensions({ width: cardW, height: cardH });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDetailOpen]);

  // Block body scroll when details modal is open
  useEffect(() => {
    if (isDetailOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDetailOpen]);

  // Mouse / Touch handlers for dragging
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    dragStartRotation.current = rotationRef.current;

    lastXRef.current = clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0; // reset velocity during active drag
    targetRotationRef.current = null; // Cancel any active snapping animation on drag start
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTimeRef.current;
    const deltaX = clientX - lastXRef.current;

    // Map drag distance to rotation angle (360 degrees = full screen width)
    const deltaRot = (deltaX / window.innerWidth) * 360;
    rotationRef.current -= deltaRot;

    // Track drag velocity in degrees per frame (assume 16.7ms per frame)
    if (deltaTime > 0) {
      const instantVelocity = -deltaRot / deltaTime; // Match sign to rotation decrement
      // Smooth the velocity tracking using an exponential moving average
      velocityRef.current =
        velocityRef.current * 0.6 + instantVelocity * 16.7 * 0.4;
    }

    lastXRef.current = clientX;
    lastTimeRef.current = currentTime;

    // Update DOM directly for zero-latency 3D rotation
    if (trackRef.current) {
      trackRef.current.style.transform = `rotateY(${-rotationRef.current}deg)`;
    }

    // Update active index for the title box & indicators
    const roundedIndex =
      ((Math.round(rotationRef.current / theta) % N) + N) % N;
    if (roundedIndex !== lastActiveIndex.current) {
      lastActiveIndex.current = roundedIndex;
      setActiveIndex(roundedIndex);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  const handleCardClick = (index) => {
    const currentCardIndex = Math.round(rotationRef.current / theta);
    const diff = index - (((currentCardIndex % N) + N) % N);

    // Find shortest rotation direction
    let shortestDiff = diff;
    if (diff > N / 2) shortestDiff -= N;
    if (diff < -N / 2) shortestDiff += N;

    const newTargetIndex = currentCardIndex + shortestDiff;
    targetRotationRef.current = newTargetIndex * theta;
    setIsDetailOpen(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentCardIndex = Math.round(rotationRef.current / theta);
      if (e.key === "ArrowLeft") {
        targetRotationRef.current = (currentCardIndex - 1) * theta;
      } else if (e.key === "ArrowRight") {
        targetRotationRef.current = (currentCardIndex + 1) * theta;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [theta]);

  // Handle activeIndex changes to trigger smoke fade-out and slide-in transitions
  useEffect(() => {
    if (activeIndex === prevActiveIndex.current) return;

    // Trigger fade-out (smoke) animation
    setTransitionClass("smoke-exit");

    const timeoutOut = setTimeout(() => {
      // Once fully dissolved, switch texts
      setDisplayTitle(cards[activeIndex].title);
      setDisplayGenre(cards[activeIndex].genre);
      // Trigger fade-in (slide right to left) animation
      setTransitionClass("smoke-enter");
      prevActiveIndex.current = activeIndex;
    }, 400); // matches the 0.4s animation time

    return () => clearTimeout(timeoutOut);
  }, [activeIndex]);

  // Reset the transition class after fade-in finishes
  useEffect(() => {
    if (transitionClass === "smoke-enter") {
      const timeoutEnter = setTimeout(() => {
        setTransitionClass("");
      }, 400);
      return () => clearTimeout(timeoutEnter);
    }
  }, [transitionClass]);

  // Physics animation loop using requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      if (isDragging) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      if (targetRotationRef.current !== null) {
        // Smoothly interpolate towards the target card angle (snap animation)
        const diff = targetRotationRef.current - rotationRef.current;
        if (Math.abs(diff) < 0.05) {
          rotationRef.current = targetRotationRef.current;
          targetRotationRef.current = null;
          velocityRef.current = autoplaySpeed; // Resume standard autoplay velocity
        } else {
          rotationRef.current += diff * 0.08; // Lerp speed of snap
        }
      } else {
        // Inertia physics: Apply current velocity, decay towards standard autoplay speed
        rotationRef.current += velocityRef.current;

        // Decelerate / decay velocity back to slow autoplay speed
        // If spun fast it slows down; if spun backwards it reverses and spins forward again
        velocityRef.current = velocityRef.current * 0.96 + autoplaySpeed * 0.04;
      }

      // Update DOM directly for absolute maximum performance
      if (trackRef.current) {
        trackRef.current.style.transform = `rotateY(${-rotationRef.current}deg)`;
      }

      // Update active index state only when the active card changes (crosses halfway threshold)
      const roundedIndex =
        ((Math.round(rotationRef.current / theta) % N) + N) % N;
      if (roundedIndex !== lastActiveIndex.current) {
        lastActiveIndex.current = roundedIndex;
        setActiveIndex(roundedIndex);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isDragging, theta, N]);

  return (
    <section id="work" className="app-showcase">
      <div className="w-full flex flex-col items-center">
        <TitleHeader
          title="Featured Work"
          sub="🎬 Drag cards to spin, or click them to center"
        />
        <div
          className={`w-[100%] 2xl:w-[85%] flex items-center justify-center mt-6 md:mt-8 md:mb-6 transition-all duration-500 ease-in-out relative ${
            !isMobileOrTablet && isDetailOpen ? "gap-8 md:gap-0" : "gap-0"
          }`}
          style={{
            height: wrapperHeight,
          }}
        >
          {/* Inline Details Card for Tablet and Desktop */}
          <div
            className={`project-detail-card ${
              !isMobileOrTablet && isDetailOpen
                ? "w-full md:w-[35%] md:max-w-[260px] lg:max-w-[320px] h-[75%] lg:h-[80%] xl:h-[90%] opacity-100 scale-100 border border-white/10"
                : "w-0 max-w-0 opacity-0 scale-95 pointer-events-none border-transparent"
            }`}
          >
            <button
              onClick={() => setIsDetailOpen(false)}
              className="close-button"
              aria-label="Close details"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="detail-content">
              <h3 className="detail-title">{cards[activeIndex].title}</h3>
              <p className="detail-desc line-clamp-2 md:line-clamp-none">
                {cards[activeIndex].description}
              </p>

              <div className="detail-tech-list">
                {cards[activeIndex].tech?.map((t) => (
                  <span key={t} className="detail-tech-badge">
                    {t}
                  </span>
                ))}
              </div>

              <a href="#contact" className="detail-cta">
                <span>Visit </span>
                <svg
                  className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Spacer that animates its width to push them apart like justify-between on desktop */}
          <div
            className={`transition-all duration-500 ease-in-out hidden md:block ${!isMobileOrTablet && isDetailOpen ? "flex-grow" : "w-0 flex-grow-0"}`}
          />

          <div
            ref={containerRef}
            className={`carousel-container transition-all duration-500 ease-in-out ${
              !isMobileOrTablet && isDetailOpen
                ? "w-full md:w-[58%] max-w-[700px] origin-center"
                : "w-full max-w-[1200px]"
            }`}
            style={{
              height: `${Math.round(dimensions.height * 1.5 + 20)}px`,
              transform:
                !isMobileOrTablet && isDetailOpen
                  ? "scale(0.70) translateX(-40px)"
                  : "scale(1) translateX(0)",
            }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            <div
              ref={trackRef}
              className="carousel-track"
              style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
                transform: `rotateY(${-rotationRef.current}deg)`,
              }}
            >
              {cards.map((card, i) => {
                const isActive = activeIndex === i;
                return (
                  <div
                    key={card.title}
                    onClick={() => handleCardClick(i)}
                    className={`carousel-card ${isActive ? "carousel-card-active" : ""}`}
                    style={{
                      transform: `rotateY(${i * theta}deg) translateZ(${radius}px)`,
                    }}
                  >
                    <div className="card-image-container">
                      <img
                        src={card.image}
                        alt={card.title}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Project Title Box */}
        <div className="active-project-title-box">
          <div className={transitionClass}>
            <h2>{displayTitle}</h2>
            <p>{displayGenre}</p>
          </div>
        </div>

        {/* Indicators */}
        <div className="carousel-indicators">
          {cards.map((_, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(i)}
              className={`carousel-dot ${activeIndex === i ? "carousel-dot-active" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Screen Overlay Dialog Modal Backdrop - Mobile Only */}
      {isMobileOrTablet && (
        <div
          className={`fixed inset-0 z-55 flex items-center justify-center p-4 transition-all duration-300 ease-in-out bg-black/70 backdrop-blur-md ${
            isDetailOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsDetailOpen(false)}
        >
          {/* Dialog Content Card */}
          <div
            className={`relative w-full max-w-[420px] h-[50%] bg-black-100 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col transition-all duration-300 ${
              isDetailOpen
                ? "scale-100 translate-y-0 opacity-100"
                : "scale-95 translate-y-4 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsDetailOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 backdrop-blur-sm cursor-pointer"
              aria-label="Close details"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col gap-4 text-left">
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                {cards[activeIndex].title}
              </h3>

              <p className="text-md text-white/70 leading-relaxed">
                {cards[activeIndex].description}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {cards[activeIndex].tech?.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              onClick={() => setIsDetailOpen(false)}
              className="mt-auto px-5 py-3 rounded-xl bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg"
            >
              <span>Visit </span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Showcase;
