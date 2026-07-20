import React from "react";
import TitleHeader from "../components/TitleHeader";
import { testimonials } from "../constants";
import GlowCard from "../components/GlowCard";

const Testimonials = () => {
  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title=" What People Say About Me ?"
          sub="⭐️ Client FeedBack Highlights"
        />

        <div className="flex justify-center mt-6">
          <a
            href={`${import.meta.env.BASE_URL}review.html`}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
          >
            <span>Worked with me? Drop a review, I'd love your feedback!</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>

        <div className="lg:columns-3 md:columns-2 columns-1 mt-12">
          {testimonials.map(({ imgPath, name, review, mentions, id }) => (
            <GlowCard card={{ review }} key={id}>
              <div className="flex items-center gap-3">
                <div className="">
                  <img src={imgPath} alt={name} />
                </div>
                <div className="">
                  <p className="font-bold">{name}</p>
                  <p className="text-white-50">{mentions}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
