"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "@/styles/page/services.module.css";

const categories = [
  {
    id: "strategie-seo",
    number: "01",
    icon: "⌕",
    services: [
      { slug: "audit-seo-basique", pageAvailable: false },
      { slug: "audit-seo-complet", pageAvailable: false },
      { slug: "recherche-mots-cles-page", pageAvailable: false },
      { slug: "recherche-mots-cles-site", pageAvailable: false },
    ],
  },
  {
    id: "contenu-seo",
    number: "02",
    icon: "✳",
    services: [
      { slug: "optimisation-seo-on-page", pageAvailable: false },
      { slug: "redaction-article-seo-800", pageAvailable: false },
      { slug: "redaction-article-seo-1000", pageAvailable: false },
      { slug: "calendrier-editorial-seo", pageAvailable: false },
    ],
  },
  {
    id: "netlinking-local",
    number: "03",
    icon: "◎",
    services: [
      { slug: "campagne-netlinking", pageAvailable: false },
      {
        slug: "optimisation-google-business-profile",
        pageAvailable: false,
      },
    ],
  },
  {
    id: "pages-de-vente",
    number: "04",
    icon: "↗",
    services: [
      { slug: "page-de-vente-longue", pageAvailable: false },
      { slug: "landing-page", pageAvailable: false },
    ],
  },
  {
    id: "copywriting-email",
    number: "05",
    icon: "✉",
    services: [
      { slug: "sequence-email-lancement", pageAvailable: false },
      { slug: "email-promotionnel-storytelling", pageAvailable: false },
      { slug: "script-publicitaire", pageAvailable: false },
    ],
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={styles.arrow}
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServicesPage() {
  const t = useTranslations("Services");

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add(styles.isVisible));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add(styles.isVisible));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero} aria-labelledby="services-title">
        <div className={styles.heroOrb} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroInner}>
          <div className={styles.heroCopy} data-reveal>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              {t("hero.eyebrow")}
            </div>

            <h1 id="services-title" className={styles.heroTitle}>
              {t("hero.title.line1")}
              <br />
              <span>{t("hero.title.line2")}</span>
              <br />
              {t("hero.title.line3")}
            </h1>

            <p className={styles.heroDescription}>{t("hero.description")}</p>

            <div className={styles.heroActions}>
              <a href="#catalogue" className={styles.primaryButton}>
                {t("hero.actions.explore")}
                {/* <span>↓</span> */}
              </a>

              <Link href="/#contact" className={styles.secondaryButton}>
                {t("hero.actions.contact")}
                <ArrowIcon />
              </Link>
            </div>

            <div className={styles.heroMeta}>
              <span>{t("hero.meta.categories")}</span>
              <span className={styles.metaDivider} />
              <span>{t("hero.meta.services")}</span>
              <span className={styles.metaDivider} />
              <span>{t("hero.meta.offers")}</span>
            </div>
          </div>

          <div className={styles.heroVisual} data-reveal>
            <div className={styles.visualTopline}>
              <span>{t("hero.visual.eyebrow")}</span>
              <span className={styles.liveDot} />
            </div>

            <div className={styles.visualCore}>
              <div className={`${styles.visualRing} ${styles.ringOne}`} />
              <div className={`${styles.visualRing} ${styles.ringTwo}`} />

              <div className={styles.coreCard}>
                <span className={styles.coreMark}>IW.</span>
                <span className={styles.coreLabel}>
                  {t("hero.visual.brand")}
                </span>
                <strong>{t("hero.visual.coreTitle")}</strong>
                <strong className={styles.coreAccent}>
                  {t("hero.visual.coreAccent")}
                </strong>
                <span className={styles.coreCaption}>
                  {t("hero.visual.caption")}
                </span>
              </div>

              <div className={`${styles.floatingLabel} ${styles.labelTop}`}>
                <span>01</span>
                {t("hero.visual.labels.audit")}
              </div>

              <div className={`${styles.floatingLabel} ${styles.labelRight}`}>
                <span>02</span>
                {t("hero.visual.labels.content")}
              </div>

              <div className={`${styles.floatingLabel} ${styles.labelBottom}`}>
                <span>03</span>
                {t("hero.visual.labels.conversion")}
              </div>

              <div className={`${styles.floatingLabel} ${styles.labelLeft}`}>
                <span>04</span>
                {t("hero.visual.labels.visibility")}
              </div>
            </div>

            <div className={styles.visualBottomline}>
              <span>{t("hero.visual.steps.analyze")}</span>
              <span>{t("hero.visual.steps.optimize")}</span>
              <span>{t("hero.visual.steps.convert")}</span>
            </div>
          </div>
        </div>

        <a href="#catalogue" className={styles.scrollCue}>
          <span className={styles.scrollLine} />
          {t("hero.scroll")}
        </a>
      </section>

      {/* INTRODUCTION */}
      <section className={styles.intro} data-reveal>
        <span className={styles.sectionLabel}>{t("intro.eyebrow")}</span>

        <div className={styles.introContent}>
          <h2>
            {t("intro.title.line1")}
            <br />
            {t("intro.title.line2")} <span>{t("intro.title.highlight")}</span>
          </h2>

          <p>{t("intro.description")}</p>
        </div>
      </section>

      {/* NAVIGATION PAR CATÉGORIE */}
      <nav
        className={styles.categoryNav}
        aria-label={t("navigation.ariaLabel")}
      >
        {categories.map((category) => (
          <a key={category.id} href={`#${category.id}`}>
            <span>{category.number}</span>
            {t(`categories.${category.id}.title`)}
            <ArrowIcon />
          </a>
        ))}
      </nav>

      {/* CATALOGUE */}
      <section
        id="catalogue"
        className={styles.catalogue}
        aria-label={t("catalogue.ariaLabel")}
      >
        {categories.map((category, categoryIndex) => (
          <section
            id={category.id}
            className={`${styles.category} ${
              categoryIndex % 2 === 1 ? styles.categoryAlt : ""
            }`}
            key={category.id}
            aria-labelledby={`${category.id}-title`}
          >
            <div className={styles.categoryInner}>
              <div className={styles.categoryIntro} data-reveal>
                <div className={styles.categoryMarker}>
                  <span className={styles.categoryNumber}>
                    {category.number}
                  </span>
                  <span className={styles.categoryIcon}>{category.icon}</span>
                </div>

                <span className={styles.sectionLabel}>
                  {t(`categories.${category.id}.index`)}
                </span>

                <h2 id={`${category.id}-title`}>
                  {t(`categories.${category.id}.title`)}
                  <span className={styles.titleDot}>.</span>
                </h2>

                <p>{t(`categories.${category.id}.description`)}</p>

                <span className={styles.serviceCount}>
                  {t("catalogue.serviceCount", {
                    count: category.services.length,
                  })}
                </span>
              </div>

              <div className={styles.serviceList}>
                {category.services.map((service, serviceIndex) => {
                  const serviceKey = `items.${service.slug}`;
                  const serviceLabel = t(`${serviceKey}.title`);
                  const serviceNumber = `${category.number}.${String(
                    serviceIndex + 1,
                  ).padStart(2, "0")}`;

                  const serviceContent = (
                    <>
                      <span className={styles.serviceIndex}>
                        {serviceNumber}
                      </span>

                      <div className={styles.serviceContent}>
                        <div className={styles.serviceTitleRow}>
                          <h3>{serviceLabel}</h3>
                          <span className={styles.serviceArrow}>
                            <ArrowIcon />
                          </span>
                        </div>

                        <p>{t(`${serviceKey}.description`)}</p>

                        <div className={styles.serviceMeta}>
                          <span>{t(`${serviceKey}.detail`)}</span>
                          <span className={styles.metaDot} />
                          <span>{t("catalogue.indicativePrice")}</span>
                        </div>
                      </div>

                      <div className={styles.servicePrice}>
                        <span>{t("catalogue.startingAt")}</span>
                        <strong>{t(`${serviceKey}.price`)}</strong>

                        {/* {!service.pageAvailable && (
                          <small className={styles.serviceAvailability}>
                            {t("catalogue.comingSoon")}
                          </small>
                        )} */}
                      </div>
                    </>
                  );

                  return (
                    <article
                      className={styles.serviceItem}
                      key={service.slug}
                      data-reveal
                      style={{ "--reveal-delay": `${serviceIndex * 75}ms` }}
                    >
                      {service.pageAvailable ? (
                        <Link
                          href={`/services/${service.slug}`}
                          className={styles.serviceLink}
                          aria-label={t("catalogue.discoverService", {
                            service: serviceLabel,
                          })}
                        >
                          {serviceContent}
                        </Link>
                      ) : (
                        <div
                          className={`${styles.serviceLink} ${styles.serviceLinkDisabled}`}
                          aria-label={t("catalogue.unavailableService", {
                            service: serviceLabel,
                          })}
                        >
                          {serviceContent}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </section>

      {/* NOTE TARIFAIRE */}
      <section className={styles.pricingNote} data-reveal>
        <span className={styles.noteMark}>i</span>

        <div>
          <h2>{t("pricingNote.title")}</h2>
          <p>{t("pricingNote.description")}</p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.finalCta} data-reveal>
        <div className={styles.ctaOrb} aria-hidden="true" />

        <div className={styles.ctaCopy}>
          <span className={styles.sectionLabel}>{t("finalCta.eyebrow")}</span>

          <h2>
            {t("finalCta.title.line1")}
            <br />
            {t("finalCta.title.line2")}
          </h2>

          <p>{t("finalCta.description")}</p>
        </div>

        <Link href="/contact#contact" className={styles.ctaButton}>
          {t("finalCta.button")}
          {/* <ArrowIcon /> */}
        </Link>
      </section>
    </main>
  );
}
