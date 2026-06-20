import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectLinks = {
  project1: "https://devschedule.in",
  project2: "https://ragya.com",
  project3: "https://sohrab300.github.io/Video-Call-WebApp/",
};

const Showcase = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    const projects = [
      project1Ref.current,
      project2Ref.current,
      project3Ref.current,
    ];

    projects.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        },
      );
    });

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
      },
    );
  }, []);

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* Left */}
          <div className="first-project-wrapper" ref={project1Ref}>
            <a
              href={projectLinks.project1}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Library Management Platform"
              className="image-wrapper shuffle-image-wrapper block"
            >
                <img
                  src={`${import.meta.env.BASE_URL}/images/project2-2.png`}
                  alt="Library Management Platform dashboard"
                  className="shuffle-image shuffle-image-back"
                />
                <img
                  src={`${import.meta.env.BASE_URL}/images/project2-1.png`}
                  alt="Library Management Platform preview"
                  className="shuffle-image shuffle-image-front"
                />
            </a>
            <div className="text-content">
              <a href={projectLinks.project1} target="_blank" rel="noreferrer">
                <h2>Library Management Platform</h2>
              </a>
              <p className="text-white-50 md:text-xl">
                A full-stack library management platform designed for browsing,
                borrowing, and managing books with a clean user experience.
              </p>
            </div>
          </div>
          {/* Right */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project2Ref}>
              <a
                href={projectLinks.project2}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Ryde project"
                className="image-wrapper bg-[#f34204] block"
              >
                <img
                  src={`${import.meta.env.BASE_URL}/images/project1.png`}
                  alt="Ryde"
                />
              </a>
              <a href={projectLinks.project2} target="_blank" rel="noreferrer">
                <h2>On-Demand Rides Made Simple with Ryde</h2>
              </a>
            </div>
            <div className="project" ref={project3Ref}>
              <a
                href={projectLinks.project3}
                target="_blank"
                rel="noreferrer"
                aria-label="Open YC Directory project"
                className="image-wrapper bg-[#e4abec] p-2 block"
              >
                <img
                  src={`${import.meta.env.BASE_URL}/images/project3.png`}
                  alt="YC Directory"
                />
              </a>
              <a href={projectLinks.project3} target="_blank" rel="noreferrer">
                <h2>YC Directory - A Startup Showcase App</h2>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
