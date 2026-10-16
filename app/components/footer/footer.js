"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "@/styles/footer/footer.module.css";

const FOOTER = {
  email: "ms.impactwords@gmail.com",
  phone: "+33 6 77 50 24 28",

  hours: [
    { key: "weekdays", timeKey: "weekdays" },
    { key: "weekend", timeKey: "weekend" },
  ],

  services: [
    { key: "seoStrategy", href: "/services#strategie-seo" },
    { key: "seoContent", href: "/services#contenu-seo" },
    { key: "netlinking", href: "/services#netlinking-local" },
    { key: "landingPages", href: "/services#pages-de-vente" },
    { key: "copywriting", href: "/services#copywriting-email" },
  ],
};

export default function Footer() {
  const t = useTranslations("Footer");
  const phoneHref = FOOTER.phone.replace(/[^\d+]/g, "");

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        {/* Zone d'informations */}
        <div className={styles.information}>
          <div className={styles.brandBlock}>
            <Link
              href="/"
              className={styles.wordmark}
              aria-label={t("brand.homeAriaLabel")}
            >
              Impact<span>.</span>Words
            </Link>

            <p className={styles.brandDescription}>{t("brand.description")}</p>

            <a className={styles.emailLink} href={`mailto:${FOOTER.email}`}>
              {FOOTER.email}
            </a>
          </div>

          <div className={styles.infoColumn}>
            <h3 className={styles.columnTitle}>
              <span>01</span> {t("sections.explore")}
            </h3>

            <nav
              className={styles.footerLinks}
              aria-label={t("navigation.servicesAriaLabel")}
            >
              {FOOTER.services.map((service) => (
                <a key={service.key} href={service.href}>
                  {t(`services.${service.key}`)}
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.infoColumn}>
            <h3 className={styles.columnTitle}>
              <span>02</span> {t("sections.contact")}
            </h3>

            <div className={styles.contactList}>
              <a href={`mailto:${FOOTER.email}`}>
                <span className={styles.contactLabel}>
                  {t("contact.email")}
                </span>
                <span className={styles.contactValue}>{FOOTER.email}</span>
              </a>

              <a href={`tel:${phoneHref}`}>
                <span className={styles.contactLabel}>
                  {t("contact.phone")}
                </span>
                <span className={styles.contactValue}>{FOOTER.phone}</span>
              </a>
            </div>
          </div>

          <div className={styles.infoColumn}>
            <h3 className={styles.columnTitle}>
              <span>03</span> {t("sections.availability")}
            </h3>

            <div className={styles.hours}>
              {FOOTER.hours.map((item) => (
                <div className={styles.hoursRow} key={item.key}>
                  <span>{t(`hours.${item.key}.days`)}</span>
                  <span>{t(`hours.${item.timeKey}.time`)}</span>
                </div>
              ))}
            </div>

            <p className={styles.hoursNote}>{t("hours.note")}</p>
          </div>
        </div>

        {/* Signature de marque */}
        <div className={styles.signature} aria-hidden="true">
          Impact<span>.</span>Words
        </div>

        {/* Barre légale */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {t("copyright")}
          </p>

          <nav
            className={styles.legalLinks}
            aria-label={t("navigation.legalAriaLabel")}
          >
            <Link href="/mentions-legales">{t("legal.legalNotice")}</Link>
            <Link href="/politique-de-confidentialite">
              {t("legal.privacy")}
            </Link>
          </nav>

          <a className={styles.backToTop} href="#top">
            {t("backToTop")} <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
