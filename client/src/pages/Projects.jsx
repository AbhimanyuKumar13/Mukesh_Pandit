import React from "react";
import { motion } from "framer-motion";
import styles from "./Projects.module.css";

/* Data from CV */
const workHistory = [
  {
    company: "BVR Infrastructure Project Consultant Pvt. Ltd.",
    period: "Jul 2012 — Dec 2017",
    designation: "Sr. Site Engineer",
    projects: [
      "Common Effluent Treatment Plant (CETP) - Palsana",
      "Anubha Industries Pvt. Ltd. - Palsana",
      "Renovation of Indoor Stadium (PDDUIS) - Surat",
      "Extension of Anubha Industries Pvt. Ltd. - Palsana",
      "Repair & Rehabilitation for Annexe Building (SMC) - Surat",
      "Amcor Flexibles India Pvt. Ltd. - Palej"
    ]
  },
  {
    company: "Shakti Construction",
    period: "Mar 2018 — Sep 2018",
    designation: "Sr. Site Engineer",
    projects: ["BE Mall (Commercial Building) - Bardoli"]
  },
  {
    company: "Rajhans Infracon (I) Pvt. Ltd.",
    period: "Oct 2018 — May 2019",
    designation: "Sr. Site Engineer",
    projects: ["Rajhans Royalton (High rise Building) - Vesu, Surat"]
  },
  {
    company: "Krishnaa Creations (Façade work Company)",
    period: "Jul 2019 — Present",
    designation: "Sr. Site Engineer",
    projects: ["Wadiwala Complex (Commercial Building) - Surat"]
  }
];

const responsibilities = [
  "Site Execution/inspection, checking and ensuring that the construction work is as per the project technical specification and final approved drawing from authorities.",
  "BOQ Preparation of Civil works and BBS for structural elements.",
  "Project management of Materials and workmanship.",
  "Coordinate with subcontractors for smooth flow of work.",
  "Inspection and testing materials prior to their use at site as per sample approved by the consultant and ensuring removal of rejected material out from site.",
  "Monitoring daily progress of site.",
  "Preparing weekly and monthly progress report to be submitted to the Project director.",
  "Ensuring that all work is done without wastage of material.",
  "PEB & Fabrication work Execution/inspection, checking as per approved drawing & specification."
];

/* framer-motion variants */
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, when: "beforeChildren" } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } }
};

function Projects() {
  return (
    <section className={styles.container} aria-labelledby="projects-heading">
      <header className={styles.header}>
        <motion.h1
          id="projects-heading"
          className={styles.title}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34 }}
        >
          Work & Project Experience
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.34, delay: 0.06 }}
        >
          Timeline of roles, companies and exact job responsibilities.
        </motion.p>
      </header>

      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        {/* Timeline / Work history */}
        <motion.main className={styles.timeline} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Work History</h2>

          <ul className={styles.workList}>
            {workHistory.map((workItem, idx) => (
              <motion.li
                className={styles.workItem}
                key={`work-${idx}`}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                tabIndex={0}
                role="article"
                aria-label={`${workItem.designation} at ${workItem.company} (${workItem.period})`}
              >
                <div className={styles.workHeader}>
                  <div>
                    <h3 className={styles.company}>{workItem.company}</h3>
                    <p className={styles.designation}>{workItem.designation}</p>
                  </div>

                  <time className={styles.period}>{workItem.period}</time>
                </div>

                <ul className={styles.projectBullets}>
                  {workItem.projects.map((proj, i) => (
                    <li key={`work-${idx}-proj-${i}`} className={styles.projectBullet}>
                      {proj}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ul>
        </motion.main>

        {/* Details / Responsibilities */}
        <motion.aside className={styles.details} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Key Responsibilities</h2>

          <motion.ul className={styles.respList} variants={containerVariants}>
            {responsibilities.map((resp, i) => (
              <motion.li
                key={`resp-${i}`}
                className={styles.respItem}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                {resp}
              </motion.li>
            ))}
          </motion.ul>

          <div className={styles.quickStats}>
            <motion.div className={styles.stat} variants={itemVariants}>
              <span className={styles.statNum}>14+</span>
              <span className={styles.statLabel}>Years in Civil Construction</span>
            </motion.div>

            <motion.div className={styles.stat} variants={itemVariants}>
              <span className={styles.statNum}>Diploma</span>
              <span className={styles.statLabel}>Civil Engineering (GTU, 2012)</span>
            </motion.div>
          </div> 
        </motion.aside>
      </motion.div>
    </section>
  );
}

export default Projects;
