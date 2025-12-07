import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiLinkedin } from "react-icons/ci";
import confetti from "canvas-confetti";

const MotionLink = motion.create(Link); 
const container = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, when: "beforeChildren" },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const socialHover = { scale: 1.06, y: -3, transition: { duration: 0.15 } };
const linkHover = { x: 6, transition: { duration: 0.18 } };
const btnTap = { scale: 0.98 };
const btnWhileHover = { y: -3, boxShadow: "0 10px 25px rgba(50,100,200,0.12)" };

const Footer = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ sending: false, ok: null, error: "" });
  const [showSuccessText, setShowSuccessText] = useState(false);
  const submitBtnRef = useRef(null);

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      return "Please enter a valid email.";
    if (!form.message.trim()) return "Please enter a message.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ sending: false, ok: false, error: err });
      return;
    }

    setStatus({ sending: true, ok: null, error: "" });

    try {
      // prefer Vite env var, fallback to /api/contact
      const base = import.meta.env.VITE_API_URL || "";
      const url = `${base}/contact`.replace(/([^:]\/)\/+/g, "$1"); // remove double slashes

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Server error. Try again later.");
      }

      // success
      setStatus({ sending: false, ok: true, error: "" });
      setForm({ name: "", email: "", message: "" });
      setShowSuccessText(true);

      // confetti + accessibility
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      if (submitBtnRef.current) submitBtnRef.current.focus();

      // hide success after 3s
      setTimeout(() => setShowSuccessText(false), 3000);
    } catch (error) {
      setStatus({
        sending: false,
        ok: false,
        error: error.message || "Something went wrong",
      });
    }
  };

  return (
    <motion.footer
      className={styles.footer}
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className={`${styles.container} mx-auto px-4`} variants={item}>
        {/* Quick Links */}
        <motion.div className={styles.links} variants={item}>
          <h2 className={styles.sectionTitle}>Quick Links</h2>
          <ul className={styles.linkList}>
            <motion.li variants={item}>
              <MotionLink to="/" className={styles.link} whileHover={linkHover}>
                Home
              </MotionLink>
            </motion.li>
            <motion.li variants={item}>
              <MotionLink to="/ourServices" className={styles.link} whileHover={linkHover}>
                Our Services
              </MotionLink>
            </motion.li>
            <motion.li variants={item}>
              <MotionLink to="/projects" className={styles.link} whileHover={linkHover}>
                Projects
              </MotionLink>
            </motion.li>
            <motion.li variants={item}>
              <MotionLink to="/about" className={styles.link} whileHover={linkHover}>
                About Us
              </MotionLink>
            </motion.li>
            <motion.li variants={item}>
              <MotionLink to="/contact" className={styles.link} whileHover={linkHover}>
                Contact
              </MotionLink>
            </motion.li>
          </ul>
        </motion.div>

        {/* Social */}
        <motion.div className={styles.social} variants={item}>
          <h2 className={styles.sectionTitle}>Follow On</h2>
          <motion.div className={styles.socialIcons} variants={item}>
            <motion.a
              href="https://youtube.com/c/ErMukeshPandit"
              className={styles.socialLink}
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={socialHover}
              variants={item}
            >
              <FaYoutube size={20} />
              <h2 className={styles.linkname}>Youtube</h2>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/civilengineerss?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className={styles.socialLink}
              aria-label="X"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={socialHover}
              variants={item}
            >
              <CiLinkedin size={20} />
              <h2 className={styles.linkname}>LinkedIn</h2>
            </motion.a> 
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div className={styles.formSection} variants={item}>
          <h2 className={styles.sectionTitle}>Contact Me</h2>

          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } },
            }}
          >
            <label className="sr-only" htmlFor="footer-name">
              Name
            </label>
            <motion.input
              id="footer-name"
              name="name"
              className={styles.input}
              placeholder="Your name"
              value={form.name}
              onChange={onChange}
              aria-label="Your name"
              required
              variants={item}
              whileFocus={{ scale: 1.01 }}
            />

            <label className="sr-only" htmlFor="footer-email">
              Email
            </label>
            <motion.input
              id="footer-email"
              name="email"
              className={styles.input}
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange}
              aria-label="Your email"
              type="email"
              required
              variants={item}
              whileFocus={{ scale: 1.01 }}
            />

            <label className="sr-only" htmlFor="footer-message">
              Message
            </label>
            <motion.textarea
              id="footer-message"
              name="message"
              className={styles.textarea}
              placeholder="How can I help?"
              value={form.message}
              onChange={onChange}
              aria-label="Your message"
              required
              variants={item}
              whileFocus={{ scale: 1.01 }}
            />

            <div>
              <motion.button
                className={styles.submitButton}
                type="submit"
                disabled={status.sending}
                aria-disabled={status.sending}
                ref={submitBtnRef}
                variants={item}
                whileTap={btnTap}
                whileHover={btnWhileHover}
              >
                {status.sending ? "Sending…" : "Send Message"}
              </motion.button>
            </div>

            {/* status messages */}
            {showSuccessText && (
              <motion.p style={{ color: "var(--accent)", marginTop: 8 }} variants={item}>
                Message sent — thanks!
              </motion.p>
            )}
            {status.ok === false && status.error && (
              <motion.p style={{ color: "#f87171", marginTop: 8 }} variants={item}>
                {status.error}
              </motion.p>
            )}
          </motion.form>
        </motion.div>
      </motion.div>

      {/* Bottom */}
      <motion.div className={styles.bottom} variants={item}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Mukesh Kumar Pandit Portfolio Web App. All Rights
          Reserved.
        </p>
        <motion.div className={styles.credit} variants={item}>
          <h1 className={styles.abhitag}>Developed and Designed by: Er. Abhimanyu Kumar</h1>
          <a className={styles.abhiProfileLink} href="https://abhi050505.netlify.app" target="_blank" rel="noopener noreferrer">
            <motion.span whileHover={{ scale: 1.08 }}>{/* keep icon interactive */}<CgProfile /></motion.span>
          </a>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
