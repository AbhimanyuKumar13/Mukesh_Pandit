import React from "react";
import { motion } from "framer-motion";
import styles from "./OurServices.module.css";

// --- static imports: point these to files in src/images/ ---
import Industrial from "../assets/images/Industrial.jpg";
import warehouse from "../assets/images/warehouse.webp";
import rowhouse from "../assets/images/rowhouse.webp"; 
import HouseDesign2 from "../assets/images/HouseDesign2.jpg"; 

const defaultServices = [
  {
    id: 1,
    title: "Residency / Residential Property",
    subtitle: "Homes, townhouses",
    description:
      "Residential real estate is property used for living — providing shelter, safety, and comfort for individuals, families, or groups.",
    bullets: [
      "Examples: Single-family homes, apartments, condominiums, townhouses.",
      "Purpose: Primary occupancy or rental income as a dwelling.",
      "Features: Bedrooms, bathrooms, kitchens, living areas.",
    ],
    imageUrl: HouseDesign2,
    imageAlt: "Residential building",
  },
  {
    id: 2,
    title: "Row House (Townhouse)",
    subtitle: "Shared-wall residential units",
    description:
      "A row house is an architectural style sharing walls with adjacent properties, maximizing land use and often part of planned developments.",
    bullets: [
      "Designed for uniform look and efficient land use.",
      "Ownership normally includes structure and land.",
      "May include private gardens, terraces, or shared amenities.",
    ],
    imageUrl: rowhouse,
    imageAlt: "Row houses",
  },
  {
    id: 3,
    title: "Industrial Project / Property",
    subtitle: "Factories, R&D, manufacturing, distribution",
    description:
      "Industrial real estate refers to land and buildings used for industrial activities and business operations — built for functionality and efficiency.",
    bullets: [
      "Examples: Factories, manufacturing facilities, research centres, distribution centers.",
      "Purpose: Production, storage, logistics, transportation.",
      "Features: High ceilings, robust construction, large column spacing.",
    ],
    imageUrl: Industrial,
    imageAlt: "Industrial warehouse",
  },
  {
    id: 4,
    title: "Warehouse",
    subtitle: "Storage & logistics facilities",
    description:
      "A warehouse is a type of industrial property used primarily for the storage of goods and as part of logistics and distribution networks.",
    bullets: [
      "Designed for storage efficiency: open spaces, loading docks.",
      "Often located near transport routes (highways, rail, ports).",
      "Key for supply chain and distribution operations.",
    ],
    imageUrl: warehouse,
    imageAlt: "Warehouse interior",
  },
];

// animation variants
const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const imgVariant = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.04, y: -6, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function OurServices({ services = defaultServices }) {
  return (
    <section className={styles.servicesSection} aria-labelledby="services-heading">
      <div className={styles.container}>
        <h2 id="services-heading" className={styles.heading}>
          Our Services
        </h2>
        <p className={styles.lead}>
          We provide expertise across residential and industrial property types — from homes and townhouses to
          warehouses and industrial projects.
        </p>

        <motion.div
          className={styles.grid}
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {services.map((s) => (
            <motion.article
              key={s.id}
              className={styles.card}
              variants={cardVariant}
              whileHover={{ y: -6, boxShadow: "0px 12px 30px rgba(15,23,42,0.12)" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              aria-labelledby={`svc-${s.id}-title`}
            >
              <div className={styles.cardContent}>
                <h3 id={`svc-${s.id}-title`} className={styles.cardTitle}>
                  {s.title}
                </h3>
                {s.subtitle && <p className={styles.cardSubtitle}>{s.subtitle}</p>}
                <p className={styles.cardDescription}>{s.description}</p>

                {s.bullets && s.bullets.length > 0 && (
                  <ul className={styles.bulletList}>
                    {s.bullets.map((b, i) => (
                      <li key={i} className={styles.bulletItem}>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles.note}>
                  <strong>Use case:</strong> Residential = living; Industrial = commercial & logistics.
                </div>
              </div>

              <div className={styles.imageWrap}>
                {s.imageUrl ? (
                  <motion.img
                    src={s.imageUrl}
                    alt={s.imageAlt || s.title}
                    className={styles.serviceImage}
                    loading="lazy"
                    variants={imgVariant}
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.99 }}
                    draggable={false}
                  />
                ) : (
                  <div className={styles.imagePlaceholder} aria-hidden="true">
                    <span className={styles.imageLabel}>Image space</span>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
