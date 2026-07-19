import { useState, useRef, useEffect } from "react";
import TitleHeader from "../components/TitleHeader";

const Showcase = () => {
  const cards = [
    {
      title: "Ryde Music Streaming",
      year: 2024,
      genre: "React / Node.js",
      image: `${import.meta.env.BASE_URL}/images/project1.png`,
    },
    {
      title: "Dev Schedule Dashboard",
      year: 2024,
      genre: "React / Tailwind",
      image: `${import.meta.env.BASE_URL}/images/project2-1.png`,
    },
    {
      title: "Dev Schedule Landing",
      year: 2024,
      genre: "React / Vite",
      image: `${import.meta.env.BASE_URL}/images/project2-2.png`,
    },
    {
      title: "Hindustani Music Player",
      year: 2023,
      genre: "Next.js / Player",
      image: `${import.meta.env.BASE_URL}/images/project2.png`,
    },
    {
      title: "Shadow Craft Lamp 3D",
      year: 2024,
      genre: "React / Three.js",
      image: `${import.meta.env.BASE_URL}/images/project-3.png`,
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

  const radius = dimensions.width * 0.78; // Mathematically optimized cylinder radius

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
      let cardW = 460;
      if (w < 550) {
        cardW = Math.round(Math.min(240, Math.max(160, w * 0.52))); // Extra compact on mobile under 550px
      } else if (w < 768) {
        cardW = Math.round(Math.min(320, Math.max(240, w * 0.58))); // Compact card width on large mobile/tablet
      } else if (w < 1024) {
        cardW = 380; // Stable sizing on tablet
      }
      const cardH = Math.round(cardW * 0.58); // Maintain widescreen 16:9 aspect ratio
      setDimensions({ width: cardW, height: cardH });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          ref={containerRef}
          className="carousel-container mt-6 md:mt-12 lg:mt-16 lg:mb-8"
          style={{ height: `${Math.round(dimensions.height * 1.5 + 20)}px` }}
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
    </section>
  );
};

export default Showcase;
