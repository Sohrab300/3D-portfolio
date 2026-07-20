import { useState } from "react";
import emailjs from "@emailjs/browser";
import TitleHeader from "../components/TitleHeader";

const ReviewForm = () => {
  const [form, setForm] = useState({
    reviewer_name: "",
    reviewer_role: "",
    review_text: "",
    rating: 0,
  });
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.rating === 0) {
      setStatus({ type: "error", message: "Please select a star rating." });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_REVIEW_TEMPLATE_ID,
        {
          reviewer_name: form.reviewer_name,
          reviewer_role: form.reviewer_role,
          review_text: form.review_text,
          rating: form.rating,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );
      setForm({
        reviewer_name: "",
        reviewer_role: "",
        review_text: "",
        rating: 0,
      });
      setStatus({
        type: "success",
        message:
          "Thank you! Your review has been submitted and is pending approval.",
      });
    } catch (error) {
      console.error(
        "EmailJS Error - Full object:",
        JSON.stringify(error, null, 2),
      );
      console.error("Status:", error?.status);
      console.error("Text:", error?.text);
      console.error("Service ID:", import.meta.env.VITE_APP_EMAILJS_SERVICE_ID);
      console.error(
        "Template ID:",
        import.meta.env.VITE_APP_EMAILJS_REVIEW_TEMPLATE_ID,
      );
      console.error(
        "Public Key defined:",
        !!import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );
      setStatus({
        type: "error",
        message: "Failed to submit review. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex-center section-padding min-h-screen">
      <div className="w-full h-full md:px-10 px-5 max-w-2xl mx-auto">
        <TitleHeader
          title="Write a Review"
          sub="⭐ Worked with me? I'd love to hear your feedback!"
        />
        <div className="flex-center card-border rounded-xl p-10 mt-16">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7">
            <div>
              <label htmlFor="reviewer_name">Your Name</label>
              <input
                type="text"
                id="reviewer_name"
                name="reviewer_name"
                value={form.reviewer_name}
                onChange={handleChange}
                placeholder="What's your name?"
                required
              />
            </div>

            <div>
              <label htmlFor="reviewer_role">Your Role / Company</label>
              <input
                type="text"
                id="reviewer_role"
                name="reviewer_role"
                value={form.reviewer_role}
                onChange={handleChange}
                placeholder="e.g. CTO at Acme Inc."
                required
              />
            </div>

            <div>
              <label>Rating</label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, rating: star })}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="text-3xl transition-transform hover:scale-110 focus:outline-none"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <span
                      className={
                        star <= (hovered || form.rating)
                          ? "text-yellow-400"
                          : "text-gray-600"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="review_text">Your Review</label>
              <textarea
                id="review_text"
                name="review_text"
                value={form.review_text}
                onChange={handleChange}
                placeholder="Share your experience working with me..."
                rows="5"
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              <div className="cta-button group">
                <div className="bg-circle" />
                <p className="text">
                  {loading ? "Submitting..." : "Submit Review"}
                </p>
                <div className="arrow-wrapper">
                  <img
                    src={`${import.meta.env.BASE_URL}/images/arrow-down.svg`}
                    alt="arrow"
                  />
                </div>
              </div>
            </button>

            {status && (
              <p
                className={`text-sm ${
                  status.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReviewForm;
