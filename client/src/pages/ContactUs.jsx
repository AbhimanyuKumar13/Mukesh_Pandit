import styles from "./ContactUs.module.css";
import { useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, duration: 0.45, ease: "easeOut" },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const api = import.meta.env.VITE_API_URL;
      const response = await fetch(`${api}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        e.target.reset();
        setFormData({ name: "", email: "", message: "" });
        setToast(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setTimeout(() => setToast(false), 3000);
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={styles.container}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.form
        onSubmit={handleSubmit}
        className={styles.contactForm}
        variants={item}
      >
        <motion.h2 className={styles.heading} variants={item}>
          Get in Touch
        </motion.h2>

        <motion.p className={styles.subheading} variants={item}>
          Have a question or want to collaborate? Fill out the form below or
          reach me at <a href="mailto:mk9974119152@gmail.com">mk9974119152@gmail.com</a> or (+91) 9974119152.
        </motion.p>

        <motion.div className={styles.inputGroup} variants={item}>
          <span className={styles.icon}>👤</span>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </motion.div>

        <motion.div className={styles.inputGroup} variants={item}>
          <span className={styles.icon}>📧</span>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </motion.div>

        <motion.div className={styles.inputGroup} variants={item}>
          <span className={styles.icon}>💬</span>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
          variants={item}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? <span className={styles.spinner}></span> : null}
          {loading ? "Sending..." : "Send Message"}
        </motion.button>

        {toast && (
          <motion.div
            className={styles.toast}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            ✅ Message Sent Successfully!
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
}
