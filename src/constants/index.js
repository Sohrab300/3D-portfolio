const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const words = [
  { text: "Ideas", imgPath: `${import.meta.env.BASE_URL}/images/ideas.svg` },
  {
    text: "Concepts",
    imgPath: `${import.meta.env.BASE_URL}/images/concepts.svg`,
  },
  {
    text: "Designs",
    imgPath: `${import.meta.env.BASE_URL}/images/designs.svg`,
  },
  { text: "Code", imgPath: `${import.meta.env.BASE_URL}/images/code.svg` },
];

const counterItems = [
  { value: 2, suffix: "+", label: "Years of Experience" },
  { value: 7, suffix: "+", label: "Satisfied Clients" },
  { value: 10, suffix: "+", label: "Completed Projects" },
  { value: 90, suffix: "%", label: "Client Retention Rate" },
];

const logoIconsList = [
  {
    imgPath: `${import.meta.env.BASE_URL}/images/logos/company-logo-1.png`,
  },
  {
    imgPath: `${import.meta.env.BASE_URL}/images/logos/company-logo-2.png`,
  },
  {
    imgPath: `${import.meta.env.BASE_URL}/images/logos/company-logo-3.png`,
  },
  {
    imgPath: `${import.meta.env.BASE_URL}/images/logos/company-logo-4.png`,
  },
  {
    imgPath: `${import.meta.env.BASE_URL}/images/logos/company-logo-5.png`,
  },
  {
    imgPath: `${import.meta.env.BASE_URL}/images/logos/company-logo-6.png`,
  },
  {
    imgPath: `${import.meta.env.BASE_URL}/images/logos/company-logo-7.png`,
  },
  {
    imgPath: `${import.meta.env.BASE_URL}/images/logos/company-logo-8.png`,
  },
  {
    imgPath: `${import.meta.env.BASE_URL}/images/logos/company-logo-9.png`,
  },
  {
    imgPath: `${import.meta.env.BASE_URL}/images/logos/company-logo-10.png`,
  },
  {
    imgPath: `${import.meta.env.BASE_URL}/images/logos/company-logo-11.png`,
  },
];

const abilities = [
  {
    imgPath: `${import.meta.env.BASE_URL}/images/seo.png`,
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: `${import.meta.env.BASE_URL}/images/chat.png`,
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: `${import.meta.env.BASE_URL}/images/time.png`,
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: `${import.meta.env.BASE_URL}/images/logos/react.png`,
  },
  {
    name: "Python Developer",
    imgPath: `${import.meta.env.BASE_URL}/images/logos/python.svg`,
  },
  {
    name: "Backend Developer",
    imgPath: `${import.meta.env.BASE_URL}/images/logos/node.png`,
  },
  {
    name: "Interactive Developer",
    imgPath: `${import.meta.env.BASE_URL}/images/logos/three.png`,
  },
  {
    name: "Project Manager",
    imgPath: `${import.meta.env.BASE_URL}/images/logos/git.svg`,
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: `${import.meta.env.BASE_URL}/models/react_logo-transformed.glb`,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: `${import.meta.env.BASE_URL}/models/python-transformed.glb`,
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: `${import.meta.env.BASE_URL}/models/node-transformed.glb`,
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: `${import.meta.env.BASE_URL}/models/three.js-transformed.glb`,
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: `${import.meta.env.BASE_URL}/models/git-svg-transformed.glb`,
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review:
      "Independently architected and delivered a full-stack product that converts user-uploaded images into 3D-printable shadow lamp STL files; end to end from backend to user-facing interface.",
    imgPath: `${import.meta.env.BASE_URL}/images/CW_long_Logo.svg`,
    logoPath: `${import.meta.env.BASE_URL}/images/CW_logo.png`,
    title: "Freelance Full-Stack Developer",
    date: "June 2026 - present",
    responsibilities: [
      "Built the entire backend from scratch using FastAPI and Docker, deployed on Google Cloud Run with request-based billing for cost efficiency.",
      "Engineered an image processing pipeline (rembg, Potrace, Pillow) to convert user-uploaded photos and SVGs into clean vector paths fed into OpenSCAD for parametric 3D model generation.",
      "Developed the frontend in React, Vite, and TypeScript with a React Three Fiber 3D viewer, allowing users to preview lamp shapes in real time before ordering.",
      "Integrated Supabase for order tracking and user data persistence, enabling end-to-end order management from upload to fulfillment.",
    ],
  },
  {
    review:
      "Sole developer responsible for delivering a complete, production-ready website from zero to deployment based on client-provided Figma designs.",
    imgPath: `${import.meta.env.BASE_URL}/images/MW_long_logo.png`,
    logoPath: `${import.meta.env.BASE_URL}/images/MW_logo.png`,
    title: "Freelance Full-Stack Developer",
    date: "March 2026 - April 2026",
    responsibilities: [
      "Built the entire website from scratch using React and Node.js, translating Figma mockups into a fully functional, responsive web application.",
      "Integrated Supabase for backend data management, handling authentication and persistent storage for the platform's core features.",
      "Delivered the complete product independently, managing client communication, requirements gathering, and iterative feedback cycles end to end.",
    ],
  },
  {
    review:
      "Engaged as a freelance developer to improve frontend quality and performance of an existing web product.",
    imgPath: `${import.meta.env.BASE_URL}/images/AS_long_logo.png`,
    logoPath: `${import.meta.env.BASE_URL}/images/AS_logo.png`,
    title: "Freelance Frontend Developer",
    date: "February 2026 - March 2026",
    responsibilities: [
      "Translated Figma mockups into pixel-perfect, responsive page sections, enhancing the visual consistency of the existing product.",
      "Conducted a performance audit and implemented optimizations that improved the Lighthouse performance score from 65 to 90, including asset optimization, lazy loading, and code splitting.",
      "Implemented pagination on the blog listing page, reducing initial load times and improving perceived performance for content-heavy pages.",
    ],
  },
  {
    review:
      "Owned the frontend of a Hindustani Classical Music streaming platform, driving features across web and mobile from UI to backend integration.",
    imgPath: `${import.meta.env.BASE_URL}/images/ragya_long_logo.png`,
    logoPath: `${import.meta.env.BASE_URL}/images/ragya_logo.jpeg`,
    title: "Software Engineer",
    date: "October 2024 - December 2025",
    responsibilities: [
      "Converted playlist pages from CSR to SSR using Next.js, significantly improving load times and enabling rich link previews for shared playlist URLs.",
      "Built a full-featured search system integrated with GraphQL, allowing users to query songs across the entire database by multiple categories directly from the navbar.",
      "Developed a song-level sharing feature, extending the platform's existing playlist-sharing functionality to individual tracks.",
      "Integrated audio streaming APIs and optimized Redux state management for seamless, low-latency playback transitions across web and mobile (React Native).",
      "Collaborated on backend tasks using Ruby on Rails; writing database migrations and exposing REST endpoints consumed by the frontend.",
      "Maintained responsive, high-fidelity UI components built with MUI, aligned to Figma mockups, with data sourced from AWS S3 and deployed via AWS Amplify.",
    ],
  },
  {
    review:
      "Contributed to the national-scale Riparian Buffer Mapping of Indian Rivers project under ISRO's Remote Sensing and GIS division.",
    imgPath: `${import.meta.env.BASE_URL}/images/isro_logo.png`,
    logoPath: `${import.meta.env.BASE_URL}/images/isro_logo.png`,
    title: "Project Trainee",
    date: "March 2024 - June 2024",
    responsibilities: [
      "Acquired and preprocessed multi-temporal satellite imagery from Google Earth Engine, covering river corridors and riparian vegetation across India.",
      "Processed and analyzed geospatial datasets using Python (NumPy, Pandas, Rasterio/GDAL) in Google Colab to extract river boundary and tree cover data.",
      "Manually delineated riparian buffer zones on both banks of rivers using ArcGIS and QGIS, ensuring spatial accuracy across large geographic extents.",
    ],
  },
];

const expLogos = [
  {
    name: "MSH",
    imgPath: `${import.meta.env.BASE_URL}/images/MSH_logo.png`,
  },
  {
    name: "MW",
    imgPath: `${import.meta.env.BASE_URL}/images/MW_logo.png`,
  },
  {
    name: "AS",
    imgPath: `${import.meta.env.BASE_URL}/images/AS_logo.png`,
  },
  {
    name: "ragya",
    imgPath: `${import.meta.env.BASE_URL}/images/ragya_logo.jpeg`,
  },
  {
    name: "isro",
    imgPath: `${import.meta.env.BASE_URL}/images/isro_logo.png`,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: `${import.meta.env.BASE_URL}/images/client1.png`,
  },
  {
    id: 2,
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: `${import.meta.env.BASE_URL}/images/client3.png`,
  },
  {
    id: 3,
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: `${import.meta.env.BASE_URL}/images/client2.png`,
  },
  {
    id: 4,
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: `${import.meta.env.BASE_URL}/images/client5.png`,
  },
  {
    id: 5,
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: `${import.meta.env.BASE_URL}/images/client4.png`,
  },
  {
    id: 6,
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: `${import.meta.env.BASE_URL}/images/client6.png`,
  },
];

const socialImgs = [
  {
    name: "insta",
    url: "https://www.instagram.com/sourabhsheikh/",
    imgPath: `${import.meta.env.BASE_URL}/images/insta.png`,
  },
  {
    name: "GitHub",
    url: "https://www.github.com/Sohrab300",
    imgPath: `${import.meta.env.BASE_URL}/images/github.svg`,
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/sohrab-sheikh-139166249/",
    imgPath: `${import.meta.env.BASE_URL}/images/linkedin.png`,
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
