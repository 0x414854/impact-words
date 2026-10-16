"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "@/styles/page/page.module.css";

const services = [
  { number: "01", icon: "↗" },
  { number: "02", icon: "◎" },
  { number: "03", icon: "⌕" },
  { number: "04", icon: "✳" },
];

const steps = [
  { number: "01" },
  { number: "02" },
  { number: "03" },
  { number: "04" },
];

const projects = [
  {
    number: "01",
    theme: "projectGreen",
    url: "https://www.cdo-multiservices.ch",
  },
  { number: "02", theme: "projectSand", url: "https://www.arthurbarraud.me" },
  {
    number: "03",
    theme: "projectBlue",
    url: "https://www.haumana-bien-etre.com",
  },
];

const benefits = [{ icon: "✳" }, { icon: "↗" }, { icon: "◉" }, { icon: "⌘" }];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={styles.arrowIcon}
      viewBox="0 0 24 24"
      fill="none"
    >
      {diagonal ? (
        <path
          d="M7 17 17 7M8 7h9v9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4 12h15m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function GrowthIllustration() {
  const t = useTranslations("Home.hero.visual");

  return (
    <div className={styles.visualStage} role="img" aria-label={t("ariaLabel")}>
      <div className={styles.visualGlow} />

      <div className={`${styles.orbit} ${styles.orbitOne} `} />
      <div className={`${styles.orbit} ${styles.orbitTwo} `} />

      <div className={styles.dashboard}>
        <div className={styles.dashboardTop}>
          <div className={styles.dashboardBrand}>
            <span className={styles.brandMark}>S</span>
            <span>{t("brand")}</span>
          </div>
          <span className={styles.dashboardMenu}>•••</span>
        </div>

        <div className={styles.dashboardSearch}>
          <span className={styles.searchIcon}>⌕</span>
          <span>{t("search")}</span>
          <span className={styles.searchStatus} />
        </div>

        <div className={styles.dashboardContent}>
          <div className={styles.dashboardHeading}>
            <div>
              <span className={styles.miniLabel}>{t("organicTraffic")}</span>
              <div className={styles.trafficNumber}>{t("trafficStatus")}</div>
            </div>
            <span className={styles.trendBadge}>{t("seoBadge")}</span>
          </div>

          <div className={styles.chart}>
            <div className={styles.chartLines}>
              <span />
              <span />
              <span />
              <span />
            </div>

            <svg
              className={styles.chartSvg}
              viewBox="0 0 320 125"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4abf91" stopOpacity=".32" />
                  <stop offset="100%" stopColor="#4abf91" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d="M0 108 C25 103 28 83 52 91 S86 95 106 69 S140 83 163 56 S194 66 215 40 S255 52 276 22 S303 25 320 8 L320 125 L0 125 Z"
                fill="url(#chartFill)"
              />

              <path
                d="M0 108 C25 103 28 83 52 91 S86 95 106 69 S140 83 163 56 S194 66 215 40 S255 52 276 22 S303 25 320 8"
                fill="none"
                stroke="#279d73"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <circle cx="276" cy="22" r="5" fill="#279d73" />
              <circle cx="276" cy="22" r="9" fill="#279d73" fillOpacity=".15" />
            </svg>
          </div>

          <div className={styles.chartFooter}>
            <span>{t("chartLabels.strategy")}</span>
            <span>{t("chartLabels.content")}</span>
            <span>{t("chartLabels.optimization")}</span>
            <span>{t("chartLabels.tracking")}</span>
          </div>
        </div>
      </div>

      <div className={`${styles.floatCard} ${styles.trafficCard}`}>
        <span className={styles.floatIcon}>↗</span>
        <div>
          <span className={styles.floatLabel}>{t("trafficGoal.label")}</span>
          <strong>{t("trafficGoal.value")}</strong>
        </div>
      </div>

      <div className={`${styles.floatCard} ${styles.positionCard}`}>
        <span className={styles.positionIcon}>◎</span>
        <div>
          <span className={styles.floatLabel}>{t("visibility.label")}</span>
          <strong>{t("visibility.value")}</strong>
        </div>
      </div>

      <div className={styles.decorativeOrb} />
    </div>
  );
}

export default function SeoHomePage() {
  const t = useTranslations("Home");

  return (
    <main className={styles.home}>
      {/* HERO */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {t("hero.eyebrow")}
          </div>

          <h1 id="hero-title" className={styles.heroTitle}>
            {t("hero.title.line1")}
            <br />
            <span className={styles.gradientText}>{t("hero.title.line2")}</span>
            <br />
            {t("hero.title.line3")}
          </h1>

          <p className={styles.heroDescription}>{t("hero.description")}</p>

          <div className={styles.heroActions}>
            <Link href="/services" className={styles.primaryButton}>
              {t("hero.actions.services")}
              {/* <ArrowIcon diagonal /> */}
            </Link>

            <Link href="#portfolio" className={styles.secondaryButton}>
              {t("hero.actions.portfolio")}
              <ArrowIcon horizontal />
            </Link>
          </div>

          <div className={styles.heroTrust}>
            <div className={styles.trustSymbol} aria-hidden="true">
              <span>↗</span>
            </div>

            <div>
              <p className={styles.trustTitle}>{t("hero.trust.title")}</p>
              <p className={styles.trustDescription}>
                {t("hero.trust.description")}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <GrowthIllustration />

          <span className={styles.visualCaption}>
            {t("hero.visual.caption")}
          </span>
        </div>

        <a
          href="#services"
          className={styles.scrollHint}
          aria-label={t("hero.scroll.ariaLabel")}
        >
          <span />
          {t("hero.scroll.label")}
        </a>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className={styles.section}
        aria-labelledby="services-title"
      >
        <div className={styles.sectionIntro}>
          <div>
            <span className={styles.sectionEyebrow}>
              {t("services.eyebrow")}
            </span>

            <h2 id="services-title" className={styles.sectionTitle}>
              {t("services.title.line1")}
              <br />
              {t("services.title.line2")}{" "}
              <span className={styles.greenText}>
                {t("services.title.highlight")}
              </span>
            </h2>
          </div>

          <div className={styles.sectionIntroAside}>
            <p>{t("services.intro")}</p>

            <Link href="/contact#contact" className={styles.textLink}>
              {t("services.contactLink")} <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <article className={styles.serviceCard} key={service.number}>
              <div className={styles.serviceCardTop}>
                <span className={styles.serviceNumber}>{service.number}</span>

                <span className={styles.serviceIcon}>{service.icon}</span>
              </div>

              <h3>{t(`services.items.${service.number}.title`)}</h3>

              <p>{t(`services.items.${service.number}.description`)}</p>

              <div className={styles.tagList}>
                {[0, 1, 2].map((index) => (
                  <span key={index}>
                    {t(`services.items.${service.number}.tags.${index}`)}
                  </span>
                ))}
              </div>

              <Link
                href="#contact"
                className={styles.cardLink}
                aria-label={t(`services.items.${service.number}.ariaLabel`)}
              >
                +{/* <ArrowIcon diagonal /> */}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* APPROCHE */}
      <section className={styles.approach} aria-label={t("approach.ariaLabel")}>
        <div className={styles.approachIntro}>
          <span className={styles.sectionEyebrow}>{t("approach.eyebrow")}</span>

          <h2>
            {t("approach.title.line1")}
            <br />
            {t("approach.title.line2")}
            <br />
            <span className={styles.gradientText}>
              {t("approach.title.highlight")}
            </span>
          </h2>

          <p>{t("approach.description")}</p>
        </div>

        <div className={styles.approachFacts}>
          {["01", "02", "03"].map((number) => (
            <div className={styles.factItem} key={number}>
              <span className={styles.factNumber}>{number}</span>

              <div>
                <strong>{t(`approach.facts.${number}.title`)}</strong>

                <p>{t(`approach.facts.${number}.description`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MÉTHODE */}
      <section className={styles.section} aria-labelledby="method-title">
        <div className={styles.methodHeading}>
          <span className={styles.sectionEyebrow}>{t("method.eyebrow")}</span>

          <h2 id="method-title" className={styles.sectionTitle}>
            {t("method.title.line1")}
            <br />
            <span className={styles.greenText}>{t("method.title.line2")}</span>
          </h2>

          <p>{t("method.description")}</p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <article className={styles.step} key={step.number}>
              <div className={styles.stepTop}>
                <span className={styles.stepNumber}>{step.number}</span>

                {index < steps.length - 1 && (
                  <span className={styles.stepConnector} aria-hidden="true">
                    →
                  </span>
                )}
              </div>

              <h3>{t(`method.steps.${step.number}.title`)}</h3>

              <p>{t(`method.steps.${step.number}.description`)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section
        id="portfolio"
        className={styles.section}
        aria-labelledby="portfolio-title"
      >
        <div className={styles.sectionIntro}>
          <div>
            <span className={styles.sectionEyebrow}>
              {t("portfolio.eyebrow")}
            </span>

            <h2 id="portfolio-title" className={styles.sectionTitle}>
              {t("portfolio.title.line1")}
              <br />
              <span className={styles.greenText}>
                {t("portfolio.title.line2")}
              </span>
            </h2>
          </div>

          <p className={styles.portfolioIntroText}>
            {t("portfolio.description")}
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <a
              className={styles.projectCard}
              key={project.number}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t(`portfolio.projects.${project.number}.name`)} — ouvrir le site`}
            >
              <div
                className={`${styles.projectPreview} ${styles[project.theme]}`}
                aria-hidden="true"
              >
                <div className={styles.previewBrowser}>
                  <div className={styles.browserBar}>
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className={styles.previewContent}>
                    <span className={styles.previewLogo}>
                      {t(`portfolio.projects.${project.number}.initials`)}
                    </span>

                    <span className={styles.previewLine} />
                    <span className={styles.previewLineShort} />
                    <span className={styles.previewButton} />
                  </div>

                  <div className={styles.previewShape} />
                </div>

                <span className={styles.projectIndex}>{project.number}</span>
              </div>

              <div className={styles.projectInfo}>
                <div>
                  <span className={styles.projectCategory}>
                    {t(`portfolio.projects.${project.number}.category`)}
                  </span>

                  <h3>{t(`portfolio.projects.${project.number}.name`)}</h3>

                  <p>{t(`portfolio.projects.${project.number}.description`)}</p>
                </div>

                <span className={styles.projectArrow}>
                  <ArrowIcon diagonal />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className={styles.contactBanner}
        aria-labelledby="contact-title"
      >
        <div className={styles.contactContent}>
          <span className={styles.contactEyebrow}>{t("contact.eyebrow")}</span>

          <h2 id="contact-title">
            {t("contact.title.line1")}
            <br />
            {t("contact.title.line2")}
          </h2>

          <p>{t("contact.description")}</p>

          <a className={styles.contactButton} href="/contact#contact">
            {t("contact.button")}
            {/* <ArrowIcon /> */}
          </a>
        </div>

        <div className={styles.contactArtwork} aria-hidden="true">
          <div
            className={`${styles.contactCircle} ${styles.contactCircleOne}`}
          />

          <div
            className={`${styles.contactCircle} ${styles.contactCircleTwo}`}
          />

          <div className={styles.contactArrow}>
            <svg viewBox="0 0 240 240" fill="none">
              <path
                d="M36 174 93 117l35 35 75-82"
                stroke="currentColor"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M155 70h48v48"
                stroke="currentColor"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className={styles.contactArtworkLabel}>
            {t("contact.artwork.label")}
          </span>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className={styles.section} aria-labelledby="benefits-title">
        <div className={styles.benefitsLayout}>
          <div className={styles.benefitsIntro}>
            <span className={styles.sectionEyebrow}>
              {t("benefits.eyebrow")}
            </span>

            <h2 id="benefits-title" className={styles.sectionTitle}>
              {t("benefits.title.line1")}
              <br />
              {t("benefits.title.line2")}
              <br />
              {t("benefits.title.line3")}{" "}
              <span className={styles.greenText}>
                {t("benefits.title.highlight")}
              </span>
            </h2>

            <p>{t("benefits.description")}</p>

            <Link href="/contact#contact" className={styles.primaryButton}>
              {t("benefits.button")}
            </Link>
          </div>

          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => {
              const number = `0${index + 1}`;

              return (
                <article className={styles.benefitCard} key={number}>
                  <div className={styles.benefitTop}>
                    <span className={styles.benefitIcon}>{benefit.icon}</span>

                    <span className={styles.benefitNumber}>{number}</span>
                  </div>

                  <h3>{t(`benefits.items.${number}.title`)}</h3>

                  <p>{t(`benefits.items.${number}.description`)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaText}>
          <span className={styles.sectionEyebrow}>{t("finalCta.eyebrow")}</span>

          <h2>
            {t("finalCta.title.line1")}
            <br />
            {t("finalCta.title.line2")}
          </h2>
        </div>

        <Link href="#contact" className={styles.primaryButton}>
          {t("finalCta.button")} <ArrowIcon />
        </Link>
      </section>
    </main>
  );
}
