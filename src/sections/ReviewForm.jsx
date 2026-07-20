import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import TitleHeader from "../components/TitleHeader";

const ReviewForm = () => {
  const [form, setForm] = useState({
    reviewer_name: "",
    reviewer_role: "",
    review_text: "",
    rating: 0,
    social_url: "",
    photo_permission: false,
  });
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // Lock scrolling on the review page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
          social_url: form.social_url,
          photo_permission: form.photo_permission ? "Yes" : "No",
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );
      setForm({
        reviewer_name: "",
        reviewer_role: "",
        review_text: "",
        rating: 0,
        social_url: "",
        photo_permission: false,
      });
      setStatus({
        type: "success",
        message:
          "Thank you! Your review has been submitted and is pending approval.",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({
        type: "error",
        message: "Failed to submit review. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-screen h-screen flex items-center justify-center bg-black-100 overflow-hidden p-4 md:p-6">
      <div className="w-full max-w-[480px] flex flex-col items-center gap-6">
        <TitleHeader
          title="Write a Review"
          sub="⭐ Worked with me? I'd love to hear your feedback!"
        />
        <div className="w-full card-border rounded-xl p-6 md:p-8 bg-black-100/40 backdrop-blur-md shadow-2xl">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="reviewer_name"
                  className="text-xs font-semibold text-white/80"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="reviewer_name"
                  name="reviewer_name"
                  value={form.reviewer_name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="mt-1 w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="reviewer_role"
                  className="text-xs font-semibold text-white/80"
                >
                  Role / Company
                </label>
                <input
                  type="text"
                  id="reviewer_role"
                  name="reviewer_role"
                  value={form.reviewer_role}
                  onChange={handleChange}
                  placeholder="e.g. CTO at Acme"
                  required
                  className="mt-1 w-full"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="social_url"
                className="text-xs font-semibold text-white/80"
              >
                LinkedIn or Instagram Profile URL
              </label>
              <input
                type="url"
                id="social_url"
                name="social_url"
                value={form.social_url}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                required
                className="mt-1 w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 items-center">
              <div>
                <label className="text-xs font-semibold text-white/80">
                  Rating
                </label>
                <div className="flex gap-1.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      className="text-2xl transition-transform hover:scale-110 focus:outline-none"
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

              <div className="">
                <label className="text-xs font-semibold text-white/80">
                  Permission
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="photo_permission"
                    name="photo_permission"
                    checked={form.photo_permission}
                    onChange={(e) =>
                      setForm({ ...form, photo_permission: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-yellow-400 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <label
                    htmlFor="photo_permission"
                    className="text-[11px] mt-2 font-semibold text-white/80 leading-snug cursor-pointer select-none"
                  >
                    Allow use of your photo on review
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="review_text"
                className="text-xs font-semibold text-white/80"
              >
                Your Review
              </label>
              <textarea
                id="review_text"
                name="review_text"
                value={form.review_text}
                onChange={handleChange}
                placeholder="Share your experience working with me..."
                rows="3"
                required
                className="mt-1 w-full"
              />
            </div>

            <button type="submit" disabled={loading} className="mt-2">
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
                className={`text-xs mt-1 ${
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
