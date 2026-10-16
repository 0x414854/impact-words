"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import styles from "@/styles/page/contact.module.css";

const initialForm = {
  name: "",
  firstName: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
  privacyAccepted: false,
  website: "",
};

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (status !== "success" && status !== "error") {
      return;
    }

    const timer = setTimeout(() => {
      setStatus("idle");
    }, 5000);

    return () => clearTimeout(timer);
  }, [status]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.privacyAccepted) {
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t("form.errors.generic"));
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      console.error(t("form.errors.console"), error);
      setStatus("error");
    }
  }

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{t("hero.eyebrow")}</p>

          <h1>
            {t("hero.title")} <span>{t("hero.highlight")}</span>
          </h1>

          <p className={styles.heroText}>{t("hero.description")}</p>

          <a href="#contact-form" className={styles.primaryButton}>
            {t("hero.button")}
            {/* <span aria-hidden="true">↗</span> */}
          </a>

          <p className={styles.heroNote}>{t("hero.note")}</p>
        </div>

        <div className={styles.heroDecoration} aria-hidden="true">
          <span>SEO</span>
          <span>+</span>
          <span>STRATÉGIE</span>
        </div>
      </section>

      {/* FORMULAIRE ET COORDONNÉES */}
      <section className={styles.contactSection} id="contact">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>{t("intro.eyebrow")}</p>

          <h2>{t("intro.title")}</h2>

          <p>{t("intro.description")}</p>
        </div>

        <div className={styles.contactGrid}>
          {/* COORDONNÉES */}
          <aside className={styles.infoColumn}>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon} aria-hidden="true">
                @
              </span>

              <h3>{t("contactInfo.email.title")}</h3>

              <a href="mailto:ms.impactwords@gmail.com">
                ms.impactwords@gmail.com
              </a>

              <p>{t("contactInfo.email.description")}</p>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon} aria-hidden="true">
                ☎
              </span>

              <h3>{t("contactInfo.phone.title")}</h3>

              <a href="tel:+33677502428">+33 (0)6 77 50 24 28</a>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon} aria-hidden="true">
                ◷
              </span>

              <h3>{t("contactInfo.hours.title")}</h3>

              <ul className={styles.hours}>
                <li>
                  <span>{t("contactInfo.hours.weekdays")}</span>
                  <span>{t("contactInfo.hours.weekdaysTime")}</span>
                </li>

                <li>
                  <span>{t("contactInfo.hours.weekend")}</span>
                  <span>{t("contactInfo.hours.weekendTime")}</span>
                </li>
              </ul>

              <p>{t("contactInfo.hours.note")}</p>
            </div>

            {/* RÉSEAUX SOCIAUX */}
            <div className={styles.socialCard}>
              <p className={styles.socialEyebrow}>{t("social.eyebrow")}</p>
              <h3>{t("social.title")}</h3>
              <p className={styles.socialDescription}>
                {t("social.description")}
              </p>
              <div className={styles.socialLinks}>
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/marina-salgado-73820418b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("social.linkedin.ariaLabel")}
                  title="LinkedIn"
                  className={styles.socialLink}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="25"
                    height="25"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.45H4.97V9h2.96v9.45ZM6.45 7.71a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12 10.74h-2.95v-4.6c0-1.1-.02-2.51-1.53-2.51-1.53 0-1.77 1.2-1.77 2.43v4.68H9.25V9h2.83v1.29h.04c.39-.74 1.36-1.53 2.8-1.53 2.99 0 3.54 1.97 3.54 4.53v5.16Z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/33677502428"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("social.whatsapp.ariaLabel")}
                  title="WhatsApp"
                  className={styles.socialLink}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="25"
                    height="25"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.45 0 .08 5.36.08 11.96c0 2.11.55 4.17 1.6 5.98L0 24l6.22-1.63a11.94 11.94 0 0 0 5.82 1.48h.01c6.6 0 11.97-5.37 11.97-11.97a11.9 11.9 0 0 0-3.5-8.4ZM12.05 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.69.97.99-3.6-.24-.37a9.85 9.85 0 0 1-1.52-5.25c0-5.45 4.44-9.89 9.9-9.89a9.82 9.82 0 0 1 7 2.9 9.82 9.82 0 0 1 2.9 7c0 5.46-4.44 9.9-9.9 9.9Zm5.43-7.41c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.48 1.69.61.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                  </svg>
                </a>

                {/* Facebook */}
                {/* <a
                  href="https://www.facebook.com/votre-profil"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("social.facebook.ariaLabel")}
                  title="Facebook"
                  className={styles.socialLink}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="25"
                    height="25"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M24 12a12 12 0 1 0-13.875 11.85v-8.39H7.08V12h3.045V9.36c0-3.005 1.79-4.665 4.53-4.665 1.31 0 2.68.235 2.68.235v2.94h-1.51c-1.49 0-1.955.925-1.955 1.875V12h3.325l-.532 3.46h-2.793v8.39A12 12 0 0 0 24 12Z" />
                  </svg>
                </a> */}
              </div>
            </div>

            {/* CARTE DE CONFIANCE */}
            <div className={styles.trustCard}>
              <span className={styles.trustDot} aria-hidden="true" />

              <div>
                <strong>{t("trust.title")}</strong>

                <p>{t("trust.description")}</p>
              </div>
            </div>
          </aside>

          {/* FORMULAIRE */}
          <div className={styles.formCard} id="contact-form">
            <div className={styles.formHeader}>
              <p className={styles.eyebrow}>{t("form.eyebrow")}</p>

              <h2>{t("form.title")}</h2>

              <p>{t("form.requiredNote")}</p>
            </div>

            {status === "success" && (
              <div className={styles.successMessage} role="status">
                <strong>{t("form.success.title")}</strong>

                <p>{t("form.success.description")}</p>
              </div>
            )}

            {status === "error" && (
              <div className={styles.errorMessage} role="alert">
                {t("form.errorMessage")}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* NOM ET PRÉNOM */}
              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span>{t("form.fields.name.label")}</span>

                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="family-name"
                    required
                    maxLength={100}
                    placeholder={t("form.fields.name.placeholder")}
                  />
                </label>

                <label className={styles.field}>
                  <span>{t("form.fields.firstName.label")}</span>

                  <input
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    required
                    maxLength={100}
                    placeholder={t("form.fields.firstName.placeholder")}
                  />
                </label>
              </div>

              {/* E-MAIL ET TÉLÉPHONE */}
              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span>{t("form.fields.email.label")}</span>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder={t("form.fields.email.placeholder")}
                  />
                </label>

                <label className={styles.field}>
                  <span>{t("form.fields.phone.label")}</span>

                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                    maxLength={30}
                    placeholder={t("form.fields.phone.placeholder")}
                  />
                </label>
              </div>

              {/* SERVICE ET BUDGET */}
              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span>{t("form.fields.service.label")}</span>

                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      {t("form.fields.service.placeholder")}
                    </option>

                    <option value="Audit et stratégie SEO">
                      {t("form.fields.service.options.audit")}
                    </option>

                    <option value="Contenu et rédaction SEO">
                      {t("form.fields.service.options.content")}
                    </option>

                    <option value="Netlinking et SEO local">
                      {t("form.fields.service.options.netlinking")}
                    </option>

                    <option value="Landing page et page de vente">
                      {t("form.fields.service.options.landingPage")}
                    </option>

                    <option value="Copywriting et e-mail marketing">
                      {t("form.fields.service.options.copywriting")}
                    </option>

                    <option value="Accompagnement SEO">
                      {t("form.fields.service.options.support")}
                    </option>

                    <option value="Autre demande">
                      {t("form.fields.service.options.other")}
                    </option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>{t("form.fields.budget.label")}</span>

                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">
                      {t("form.fields.budget.options.undefined")}
                    </option>

                    <option value="Moins de 150 €">
                      {t("form.fields.budget.options.under150")}
                    </option>

                    <option value="150–350 €">
                      {t("form.fields.budget.options.150to350")}
                    </option>

                    <option value="350–700 €">
                      {t("form.fields.budget.options.350to700")}
                    </option>

                    <option value="700–1500 €">
                      {t("form.fields.budget.options.700to1500")}
                    </option>

                    <option value="Plus de 1500 €">
                      {t("form.fields.budget.options.over1500")}
                    </option>
                  </select>
                </label>
              </div>

              {/* MESSAGE */}
              <label className={styles.field}>
                <span>{t("form.fields.message.label")}</span>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={6}
                  placeholder={t("form.fields.message.placeholder")}
                />
              </label>

              {/* CHAMP ANTI-SPAM */}
              <div className={styles.honeypot} aria-hidden="true">
                <label>
                  {t("form.fields.website.label")}
                  <input
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={handleChange}
                  />
                </label>
              </div>

              {/* POLITIQUE DE CONFIDENTIALITÉ */}
              <div className={styles.privacyConsent}>
                <input
                  id="privacyAccepted"
                  name="privacyAccepted"
                  type="checkbox"
                  checked={form.privacyAccepted}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      privacyAccepted: event.target.checked,
                    }))
                  }
                  required
                />

                <label htmlFor="privacyAccepted">
                  {t("form.privacyConsent.beforeLink")}{" "}
                  <a
                    href="/politique-de-confidentialite"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("form.privacyConsent.link")}
                  </a>
                  . *
                </label>
              </div>

              {/* BOUTON D'ENVOI */}
              <button
                className={styles.submitButton}
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? t("form.submit.loading")
                  : t("form.submit.label")}

                {/* <span aria-hidden="true">↗</span> */}
              </button>

              <p className={styles.privacyNote}>{t("form.privacyNote")}</p>
            </form>
          </div>
        </div>
      </section>

      {/* CARTE + CTA FINAL */}
      <div className={styles.mapCtaGrid}>
        {/* CARTE GOOGLE MAPS */}
        <section className={styles.mapSection}>
          <div className={styles.mapHeader}>
            <div>
              <p className={styles.eyebrow}>{t("map.eyebrow")}</p>
              <h2>{t("map.title")}</h2>
            </div>

            <p>{t("map.description")}</p>
          </div>

          <div className={styles.mapFrame}>
            <iframe
              title={t("map.iframeTitle")}
              src="https://www.google.com/maps?q=Gex%2001170%2C%20France&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        {/* CTA FINAL */}
        <section className={styles.bottomCta}>
          <div className={styles.ctaGlow} aria-hidden="true" />

          <p className={styles.eyebrow}>{t("finalCta.eyebrow")}</p>

          <h2>{t("finalCta.title")}</h2>

          <p>{t("finalCta.description")}</p>

          <a href="#contact-form" className={styles.primaryButton}>
            {t("finalCta.button")}
          </a>
        </section>
      </div>
    </main>
  );
}
