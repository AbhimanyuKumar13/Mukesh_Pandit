// Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import ThemeToggle from "./ThemeToggle";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/images/logo.png";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close on outside click/tap
  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (!panelRef.current || !btnRef.current) return;
      if (
        !panelRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        close();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  // Focus management
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        const first = panelRef.current?.querySelector(
          "a, button, [tabindex]:not([tabindex='-1'])"
        );
        if (first) first.focus();
      });
    } else {
      btnRef.current?.focus();
    }
  }, [open]);

  // ---------- Framer Motion variants ----------
  const headerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  // Name comes first
  const nameContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05, // start immediately
      },
    },
  };

  const nameLine = {
    hidden: { opacity: 0, x: -40 },
    show: (custom = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "circOut",
        delay: custom * 0.04,
      },
    }),
  };

  // Logo animates AFTER the name finishes
  const logoVariant = {
    hidden: { opacity: 0, scale: 0.8, x: -20 },
    show: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
        delay: 0.45, // <-- logo waits until name completes
      },
    },
  };

  const navGroup = {
    hidden: { opacity: 0, y: -6 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
        delay: 0.55, // nav enters after logo
      },
    },
  };

  const navItem = {
    hidden: { opacity: 0, y: -6 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35 },
    },
  };

  const mobilePanelVariant = {
    hidden: { height: 0, opacity: 0, overflow: "hidden" },
    show: {
      height: "auto",
      opacity: 1,
      overflow: "hidden",
      transition: { duration: 0.35 },
    },
    exit: { height: 0, opacity: 0, transition: { duration: 0.28 } },
  };

  return (
    <motion.header
      className={styles.header}
      variants={headerContainer}
      initial="hidden"
      animate="show"
    >
      <Link to="/" className={styles.nameLogoContainer}>
        <motion.img
          className={styles.logo}
          src={logo}
          alt="logo"
          variants={logoVariant}
          aria-hidden={false}
        />

        <motion.div
          className={styles.name}
          variants={nameContainer}
          aria-label="Company name"
        >
          {/* Pandit */}
          <motion.h1 custom={0} variants={nameLine} style={{ margin: 0 }}>
            <span className={styles.nameSpan}>P</span>andit{" "}
          </motion.h1>

          {/* Construction */}
          <motion.h1 custom={1} variants={nameLine} style={{ margin: 0 }}>
            <span className={styles.nameSpan}>C</span>onstruction
          </motion.h1>
        </motion.div>
      </Link>

      <motion.div className={styles.rightGroup} variants={navGroup}>
        {/* Desktop nav (hidden on small screens via CSS) */}
        <motion.nav
          className={styles.navContainer}
          aria-label="Main navigation"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.06, delayChildren: 0.08 },
            },
          }}
        >
          <ul className={styles.nav}>
            <motion.li variants={navItem}>
              <Link to="/" className={styles.navItems}>
                Home
              </Link>
            </motion.li>
            <motion.li variants={navItem}>
              <Link to="/ourServices" className={styles.navItems}>
                Our Services
              </Link>
            </motion.li>
            <motion.li variants={navItem}>
              <Link to="/projects" className={styles.navItems}>
                Projects &amp; Work
              </Link>
            </motion.li>
            <motion.li variants={navItem}>
              <Link to="/about" className={styles.navItems}>
                About Us
              </Link>
            </motion.li>
            <motion.li variants={navItem}>
              <Link to="/contact" className={styles.navItems}>
                Contact Us
              </Link>
            </motion.li>
          </ul>
        </motion.nav>

        {/* Controls: Theme toggle + hamburger */}
        <motion.div
          className={styles.headerControls}
          variants={navGroup}
          style={{ display: "flex", alignItems: "center" }}
        >
          <motion.div
            style={{ display: "flex", alignItems: "center" }}
            variants={navItem}
          >
            <ThemeToggle />
          </motion.div>

          <motion.button
            ref={btnRef}
            className={styles.hamburgerBtn}
            onClick={toggle}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            title={open ? "Close menu" : "Open menu"}
            variants={navItem}
            whileTap={{ scale: 0.94 }}
          >
            {open ? (
              <IoMdClose className={styles.icon} />
            ) : (
              <GiHamburgerMenu className={styles.icon} />
            )}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Mobile panel (slide-down). Hidden on wide screens via CSS media query */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-nav"
            ref={panelRef}
            className={`${styles.mobilePanel} ${open ? styles.open : ""}`}
            role="dialog"
            aria-hidden={!open}
            variants={mobilePanelVariant}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.ul
              className={styles.mobileNavList}
              style={{ margin: 0, padding: 0 }}
            >
              <motion.li variants={navItem}>
                <Link to="/" className={styles.mobileNavLink} onClick={close}>
                  Home
                </Link>
              </motion.li>
              <motion.li variants={navItem}>
                <Link
                  to="/ourServices"
                  className={styles.mobileNavLink}
                  onClick={close}
                >
                  Our Services
                </Link>
              </motion.li>
              <motion.li variants={navItem}>
                <Link
                  to="/projects"
                  className={styles.mobileNavLink}
                  onClick={close}
                >
                  Projects &amp; Work
                </Link>
              </motion.li>
              <motion.li variants={navItem}>
                <Link
                  to="/about"
                  className={styles.mobileNavLink}
                  onClick={close}
                >
                  About Us
                </Link>
              </motion.li>
              <motion.li variants={navItem}>
                <Link
                  to="/contact"
                  className={styles.mobileNavLink}
                  onClick={close}
                >
                  Contact Us
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
