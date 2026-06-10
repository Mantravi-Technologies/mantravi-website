"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ImageIcon } from "lucide-react";
import {
  servicesHubImages,
  servicesHubIntro,
  servicesHubTrust,
} from "@/lib/content/services-hub-data";
import { trustBadges } from "@/lib/content/site-data";
import type { ServiceImageSlot } from "@/lib/content/services-data";
import { cn } from "@/lib/utils";

function EditorialImage({
  slot,
  className,
  parallaxRef,
  portrait,
}: {
  slot: ServiceImageSlot;
  className?: string;
  parallaxRef: React.RefObject<HTMLElement | null>;
  portrait?: boolean;
}) {
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  if (slot.src) {
    return (
      <motion.figure
        className={cn(
          "services-editorial__figure",
          portrait && "services-editorial__figure--portrait",
          className,
        )}
        style={{ y }}
      >
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          className="services-editorial__photo"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
        <div className="services-editorial__figure-veil" aria-hidden="true" />
      </motion.figure>
    );
  }

  return (
    <figure
      className={cn(
        "services-editorial__figure services-editorial__figure--empty",
        portrait && "services-editorial__figure--portrait",
        className,
      )}
      aria-label={slot.alt}
    >
      <div className="services-editorial__figure-grid" aria-hidden="true" />
      <div className="services-editorial__figure-empty-inner">
        <ImageIcon className="h-7 w-7" strokeWidth={1.25} aria-hidden />
        <p>{slot.hint}</p>
        <code>{slot.path}</code>
      </div>
    </figure>
  );
}

export function ServicesHubIntroBand() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="services-editorial__band services-editorial__band--intro"
      aria-labelledby="services-intro-heading"
    >
      <div className="services-editorial__container">
        <div className="services-editorial__intro-grid">
          <motion.div
            className="services-editorial__copy"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="services-editorial__kicker">Overview</p>
            <h2
              id="services-intro-heading"
              className="services-editorial__title"
            >
              {servicesHubIntro.heading}
            </h2>
            <div className="services-editorial__prose">
              {servicesHubIntro.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className={
                    index === 0 ? "services-editorial__lead" : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="services-editorial__visual services-editorial__visual--right"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{
              duration: 0.8,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="services-editorial__visual-tag" aria-hidden="true">
              Partner
            </span>
            <EditorialImage
              slot={servicesHubImages.intro}
              parallaxRef={sectionRef}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ServicesHubTrustBand() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="services-editorial__band services-editorial__band--trust"
      aria-labelledby="services-trust-heading"
    >
      <div className="services-editorial__container">
        <div className="services-editorial__trust-grid">
          <motion.div
            className="services-editorial__visual services-editorial__visual--left"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="services-editorial__visual-tag" aria-hidden="true">
              Trust
            </span>
            <EditorialImage
              slot={{ ...servicesHubImages.trust, aspect: "portrait" }}
              parallaxRef={sectionRef}
              portrait
            />
          </motion.div>

          <motion.div
            className="services-editorial__copy services-editorial__copy--trust"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{
              duration: 0.7,
              delay: 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="services-editorial__kicker">Why Mantravi</p>
            <h2
              id="services-trust-heading"
              className="services-editorial__title services-editorial__title--section"
            >
              Why teams trust Mantravi
            </h2>
            <p className="services-editorial__deck">
              Accountability, production discipline, and direct communication,
              built into how we scope and deliver every engagement.
            </p>

            <ol className="services-editorial__principles">
              {servicesHubTrust.map((item, index) => (
                <li key={item.title}>
                  <span
                    className="services-editorial__principle-index"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="services-editorial__metrics" role="list">
              {trustBadges.map((badge, index) => (
                <span key={badge} role="listitem">
                  {index > 0 ? (
                    <span
                      className="services-editorial__metrics-dot"
                      aria-hidden="true"
                    >
                      ·
                    </span>
                  ) : null}
                  {badge}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
