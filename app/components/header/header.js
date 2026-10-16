// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import styles from "@/styles/header/header.module.css";

// const links = [
//   { label: "Services", href: "/services" },
//   { label: "Horaires & Contact", href: "/contact" },
// ];

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const closeMenu = () => setMenuOpen(false);

//   return (
//     <header className={styles.header}>
//       <div className={styles.inner}>
//         <Link
//           href="/"
//           className={styles.logo}
//           aria-label="search.studio — accueil"
//           onClick={closeMenu}
//         >
//           <span className={styles.logoMark}>IW</span>
//           <span className={styles.logoText}>
//             Impact<span className={styles.logoDot}>.</span>Words
//           </span>
//         </Link>

//         <nav className={styles.desktopNav} aria-label="Navigation principale">
//           {links.map((link) => (
//             <a key={link.href} href={link.href} className={styles.navLink}>
//               {link.label}
//             </a>
//           ))}
//         </nav>

//         <a href="#contact" className={styles.cta}>
//           Parlons de votre projet
//           {/* <span aria-hidden="true">↗</span> */}
//         </a>

//         <button
//           type="button"
//           className={styles.menuToggle}
//           onClick={() => setMenuOpen((open) => !open)}
//           aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
//           aria-expanded={menuOpen}
//           aria-controls="mobile-navigation"
//         >
//           <span className={menuOpen ? styles.barOpen : ""} />
//           <span className={menuOpen ? styles.barOpen : ""} />
//         </button>
//       </div>

//       <nav
//         id="mobile-navigation"
//         className={`${styles.mobileNav} ${
//           menuOpen ? styles.mobileNavOpen : ""
//         }`}
//         aria-label="Navigation mobile"
//         aria-hidden={!menuOpen}
//         inert={!menuOpen}
//       >
//         {links.map((link) => (
//           <a
//             key={link.href}
//             href={link.href}
//             className={styles.mobileLink}
//             onClick={closeMenu}
//           >
//             {link.label}
//             <span aria-hidden="true">↗</span>
//           </a>
//         ))}

//         <a href="#contact" className={styles.mobileCta} onClick={closeMenu}>
//           Parlons de votre projet
//         </a>
//       </nav>
//     </header>
//   );
// }

"use client";

import { useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import styles from "@/styles/header/header.module.css";

const links = [
  { key: "services", href: "/services" },
  { key: "contact", href: "/contact" },
];

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  function switchLanguage(nextLocale) {
    if (nextLocale === locale) return;

    closeMenu();
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logo}
          aria-label={t("logoAriaLabel")}
          onClick={closeMenu}
        >
          <span className={styles.logoMark}>IW</span>

          <span className={styles.logoText}>
            Impact<span className={styles.logoDot}>.</span>Words
          </span>
        </Link>

        <nav
          className={styles.desktopNav}
          aria-label={t("desktopNavigationLabel")}
        >
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  isActive ? styles.navLinkActive : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {t(`links.${link.key}`)}
              </Link>
            );
          })}

          {/* SÉLECTEUR DE LANGUE */}
          <div
            className={styles.languageSwitcher}
            role="group"
            aria-label={t("languageSwitcherLabel")}
          >
            <button
              type="button"
              className={`${styles.languageOption} ${
                locale === "fr" ? styles.languageActive : ""
              }`}
              aria-label={t("languages.french")}
              aria-pressed={locale === "fr"}
              onClick={() => switchLanguage("fr")}
            >
              FR
            </button>

            <button
              type="button"
              className={`${styles.languageOption} ${
                locale === "en" ? styles.languageActive : ""
              }`}
              aria-label={t("languages.english")}
              aria-pressed={locale === "en"}
              onClick={() => switchLanguage("en")}
            >
              EN
            </button>
          </div>
        </nav>

        <Link href="/contact#contact" className={styles.cta}>
          {t("cta")}
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span className={menuOpen ? styles.barOpen : ""} />
          <span className={menuOpen ? styles.barOpen : ""} />
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`${styles.mobileNav} ${
          menuOpen ? styles.mobileNavOpen : ""
        }`}
        aria-label={t("mobileNavigationLabel")}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${
                isActive ? styles.mobileLinkActive : ""
              }`}
              aria-current={isActive ? "page" : undefined}
              onClick={closeMenu}
            >
              {t(`links.${link.key}`)}
              {/* <span aria-hidden="true">↗</span> */}
            </Link>
          );
        })}

        {/* LANGUE — MOBILE */}
        <div className={styles.mobileLanguage}>
          <span>{t("language")}</span>

          <div
            className={styles.languageSwitcher}
            role="group"
            aria-label={t("languageSwitcherLabel")}
          >
            <button
              type="button"
              className={`${styles.languageOption} ${
                locale === "fr" ? styles.languageActive : ""
              }`}
              aria-label={t("languages.french")}
              aria-pressed={locale === "fr"}
              onClick={() => switchLanguage("fr")}
            >
              FR
            </button>

            <button
              type="button"
              className={`${styles.languageOption} ${
                locale === "en" ? styles.languageActive : ""
              }`}
              aria-label={t("languages.english")}
              aria-pressed={locale === "en"}
              onClick={() => switchLanguage("en")}
            >
              EN
            </button>
          </div>
        </div>

        <Link
          href="/contact#contact-form"
          className={styles.mobileCta}
          onClick={closeMenu}
        >
          {t("cta")}
        </Link>
      </nav>
    </header>
  );
}
