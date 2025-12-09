import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Home.module.css";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import Construction1 from "../assets/Construction1.jpg";
import Construction2 from "../assets/Construction2.jpg";
import Construction3 from "../assets/Construction3.jpg";
import Construction4 from "../assets/Construction4.jpg";
import Construction5 from "../assets/Construction5.jpg";
import Construction6 from "../assets/Construction6.jpg";


import { FaLongArrowAltRight } from "react-icons/fa";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export const Home = () => {
  const d = new Date();
  const hour = d.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const prefersReduced = useReducedMotion();

  const page = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const banners = [Construction1, Construction2, Construction3, Construction4, Construction5, Construction6];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef(null);
  const swapInterval = 4500;

  useEffect(() => {
    if (prefersReduced) return;
    function start() {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (!paused && !isDragging) setIndex((i) => (i + 1) % banners.length);
      }, swapInterval);
    }
    start();
    return () => clearInterval(intervalRef.current);
  }, [paused, isDragging, banners.length, prefersReduced]);

  const goNext = useCallback(() => setIndex((i) => (i + 1) % banners.length), [banners.length]);
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + banners.length) % banners.length), [banners.length]);

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);
 
  const onDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x; 
    if (offset < -80 || (velocity < -800 && offset < -20)) {
      goNext();
    } else if (offset > 80 || (velocity > 800 && offset > 20)) {
      goPrev();
    }
    setIsDragging(false);
  };

  const onDragStart = () => {
    setIsDragging(true);
    setPaused(true);
  };

  const imgVariants = {
    enter: { opacity: 0, scale: 0.995, x: 30 },
    center: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.995, x: -30, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const bobLoop = prefersReduced
    ? { opacity: 1 }
    : {
        y: [0, -8, 0],
        rotate: [0, 0.6, 0],
        transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <motion.main className={styles.hero} aria-label="Homepage hero section" variants={page} initial="hidden" animate="show">
      <motion.section className={styles.left} variants={item}>
        <h2 className={styles.greeting}>Hello, {greeting}</h2>

        <h1 className={styles.name}>
          I'm, <span className={styles.highlight}>M</span>ukesh Pandit
        </h1>

        <div className={styles.skills}>
          I'm{" "}
          <span aria-hidden className={styles.typewriter}>
            <Typewriter
              words={["a Sr. Civil Engineer", "Your Construction Guide"]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </div>

        <p className={styles.subtitle}>
          “A Sr. Civil Engineer with 13+ years of hands-on experience in construction, site
          execution, and project coordination—dedicated to transforming plans into strong,
          precise, and enduring structures. I combine technical expertise with practical
          decision-making to deliver quality, safety, and efficiency in every project I lead.”
        </p>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/about" className={styles.cta} aria-label="Know more about Mukesh">
            Know More About Me
          </Link>
        </div>

        <motion.div className={styles.ourservices} variants={item}>
          <div className={styles.servicesInner}>
            <div>
              <h1 className={styles.slogan}>Let's Build Your Dream With Us</h1>
              <h2 className={styles.ExploreMsg}>Explore our services</h2>
            </div>

            <Link to="/ourServices" className={styles.arrowWrap} aria-label="Explore our services">
              <motion.span
                className={styles.arrow}
                animate={prefersReduced ? {} : { x: [0, 6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaLongArrowAltRight />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </motion.section>
 
      <aside
        className={styles.right}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className={styles.bannerContainer} 
            animate={bobLoop}
            exit={{ opacity: 0 }} 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            whileTap={{ cursor: "grabbing" }}
            style={{ touchAction: "pan-y" }}  
          >
            <motion.img
              src={banners[index]}
              alt={`Banner ${index + 1}`}
              className={styles.bannerImg}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
 
        <div className={styles.pager}>
          {banners.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.activeDot : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Show banner ${i + 1}`}
            />
          ))}
        </div>
      </aside>
    </motion.main>
  );
};
