import React from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";
import MukeshPandit from '../assets/images/MukeshPandit.jpg'

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, when: "beforeChildren", duration: 0.45 }
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.25 } }
};

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};

const photoVariant = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  hover: { scale: 1.03, transition: { duration: 0.2 } }
};

const cardHover = { scale: 1.02, y: -4, boxShadow: "0 14px 30px rgba(12,18,28,0.08)" };

const About = () => {
  return (
    <motion.main
      className={styles.aboutContainer}
      aria-labelledby="about-heading"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.header className={styles.header} variants={itemVariant}>
        <motion.div className={styles.profile} variants={itemVariant}>
          <motion.div
            className={styles.photoContainer}
            aria-hidden="true"
            variants={photoVariant}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <img className={styles.photo} src={MukeshPandit} alt="Dp" />
          </motion.div>

          <div className={styles.nameBlock}>
            <motion.h1
              id="about-heading"
              className={styles.name}
              variants={itemVariant}
            >
              Mukesh Pandit
            </motion.h1>
            <motion.p className={styles.role} variants={itemVariant}>
              Civil Engineer
            </motion.p>

            <motion.div className={styles.contact} variants={itemVariant}>
              <a
                href="mailto:mk9974119152@gmail.com"
                className={styles.contactLink}
              >
                mk9974119152@gmail.com
              </a>
              <a href="tel:+919974119152" className={styles.contactLink}>
                (+91) 9974119152
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.header>

      <motion.section className={styles.grid} variants={itemVariant}>
        <motion.article
          className={styles.card}
          variants={itemVariant}
          whileHover={cardHover}
        >
          <h3 className={styles.cardHeading}>Career Objective</h3>
          <p>
            To capitalize the total knowledge, skills, creative ability, talent
            of an organization’s workforce and find opportunities for
            advancement contributing to the growth of the organization and
            personal growth as well.
          </p>
        </motion.article>

        <motion.article
          className={styles.card}
          variants={itemVariant}
          whileHover={cardHover}
        >
          <h3 className={styles.cardHeading}>Education</h3>
          <ul className={styles.list}>
            <li>
              <strong>Diploma in Civil Engineer</strong>
              <div className={styles.meta}>
                Gujarat Technological University • 2012 • CGPA: 8.54
              </div>
            </li>
            <li>
              <strong>Higher Secondary</strong>
              <div className={styles.meta}>G.S.H.S.E.B • 2009</div>
            </li>
            <li>
              <strong>Madhyamik (SSC)</strong>
              <div className={styles.meta}>G.S.H.S.E.B • 2007</div>
            </li>
          </ul>
        </motion.article>

        <motion.article
          className={styles.card}
          variants={itemVariant}
          whileHover={cardHover}
        >
          <h3 className={styles.cardHeading}>Other Qualifications</h3>
          <ul className={styles.list}>
            <li>
              Autocad 2D & 3D, from CAD ACADEMY Bardoli, Surat.
              <li>
                Skilled with all the computer hardware, internet application &amp;
                MS Office
              </li>
              <li>
                Elementary &amp; Intermediate Drawing GE from State Examination
                Board Gujarat in 2004-05.
              </li>
            </li>
          </ul>
        </motion.article>

        <motion.article
          className={styles.cardFull}
          variants={itemVariant}
          whileHover={cardHover}
        >
          <h3 className={styles.cardHeading}>Personal Details</h3>
          <div className={styles.twoCol}>
            <ul className={styles.info}>
              <li>
                <strong>Date of Birth:</strong> 12 April 1988
              </li>
              <li>
                <strong>Gender:</strong> Male
              </li>
              <li>
                <strong>Nationality:</strong> Indian
              </li>
              <li>
                <strong>Marital Status:</strong> Married
              </li>
            </ul>
            <ul className={styles.info}>
              <li>
                <strong>Languages:</strong> English, Hindi, Gujrati
              </li>
            </ul>
          </div>
        </motion.article>
      </motion.section>
    </motion.main>
  );
};

export default About;
