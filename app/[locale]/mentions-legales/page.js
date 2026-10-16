import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "@/styles/page/mention-legales.module.css";

const entreprise = {
  nomCommercial: "Impact Words",
  nomResponsable: "Marina SALGADO",
  statut: "Entrepreneur individuel (micro-entreprise)",
  adresse: "47 rue Vivienne, 75002 Paris",
  siren: "102430980",
  siret: "10243098000015",
  tva: null,
  email: "[Adresse e-mail professionnelle]",
  telephone: "0677502428",
  directeurPublication: "Marina SALGADO",
  dateMiseAJour: "10 Octobre 2026",
};

const hebergeur = {
  nom: "Vercel Inc.",
  adresse: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
  site: "https://vercel.com",
  email: "privacy@vercel.com",
  telephone: "Non fournis",
};

export async function generateMetadata() {
  const t = await getTranslations("LegalNotices");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function MentionsLegalesPage() {
  const t = await getTranslations("LegalNotices");

  const sections = [
    {
      id: "editeur",
      numero: "01",
      titre: t("sections.publisher.title"),
      contenu: (
        <>
          <p>
            {t("sections.publisher.intro", {
              company: entreprise.nomCommercial,
            })}
          </p>

          <dl className={styles.details}>
            <div>
              <dt>{t("fields.fullName")}</dt>
              <dd>{entreprise.nomResponsable}</dd>
            </div>
            <div>
              <dt>{t("fields.tradeName")}</dt>
              <dd>{entreprise.nomCommercial}</dd>
            </div>
            <div>
              <dt>{t("fields.legalStatus")}</dt>
              <dd>{entreprise.statut}</dd>
            </div>
            <div>
              <dt>{t("fields.businessAddress")}</dt>
              <dd>{entreprise.adresse}</dd>
            </div>
            <div>
              <dt>{t("fields.siren")}</dt>
              <dd>{entreprise.siren}</dd>
            </div>
            <div>
              <dt>{t("fields.siret")}</dt>
              <dd>{entreprise.siret}</dd>
            </div>
            {entreprise.tva && (
              <div>
                <dt>{t("fields.vatNumber")}</dt>
                <dd>{entreprise.tva}</dd>
              </div>
            )}
            <div>
              <dt>{t("fields.email")}</dt>
              <dd>
                <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>
              </dd>
            </div>
            <div>
              <dt>{t("fields.phone")}</dt>
              <dd>{entreprise.telephone}</dd>
            </div>
            <div>
              <dt>{t("fields.publicationDirector")}</dt>
              <dd>{entreprise.directeurPublication}</dd>
            </div>
          </dl>
        </>
      ),
    },
    {
      id: "hebergement",
      numero: "02",
      titre: t("sections.hosting.title"),
      contenu: (
        <>
          <p>{t("sections.hosting.intro")}</p>
          <dl className={styles.details}>
            <div>
              <dt>{t("fields.host")}</dt>
              <dd>{hebergeur.nom}</dd>
            </div>
            <div>
              <dt>{t("fields.address")}</dt>
              <dd>{hebergeur.adresse}</dd>
            </div>
            <div>
              <dt>{t("fields.website")}</dt>
              <dd>
                <a
                  href={hebergeur.site}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hebergeur.site}
                </a>
              </dd>
            </div>
            <div>
              <dt>{t("fields.contact")}</dt>
              <dd>
                <a href={`mailto:${hebergeur.email}`}>{hebergeur.email}</a>
              </dd>
            </div>
            <div>
              <dt>{t("fields.phone")}</dt>
              <dd>{hebergeur.telephone}</dd>
            </div>
          </dl>
        </>
      ),
    },
    {
      id: "objet",
      numero: "03",
      titre: t("sections.purpose.title"),
      contenu: <p>{t("sections.purpose.content")}</p>,
    },
    {
      id: "propriete",
      numero: "04",
      titre: t("sections.intellectualProperty.title"),
      contenu: (
        <>
          <p>{t("sections.intellectualProperty.paragraph1")}</p>
          <p>{t("sections.intellectualProperty.paragraph2")}</p>
        </>
      ),
    },
    {
      id: "responsabilite",
      numero: "05",
      titre: t("sections.liability.title"),
      contenu: <p>{t("sections.liability.content")}</p>,
    },
    {
      id: "liens",
      numero: "06",
      titre: t("sections.externalLinks.title"),
      contenu: <p>{t("sections.externalLinks.content")}</p>,
    },
    {
      id: "donnees",
      numero: "07",
      titre: t("sections.personalData.title"),
      contenu: (
        <>
          <p>{t("sections.personalData.paragraph1")}</p>
          <p>{t("sections.personalData.paragraph2")}</p>
          <p>
            <Link
              href="/politique-de-confidentialite"
              className={styles.inlineLink}
            >
              {t("sections.personalData.privacyLink")}
            </Link>
          </p>
          <p>
            {t("sections.personalData.contactIntro")}{" "}
            <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      numero: "08",
      titre: t("sections.cookies.title"),
      contenu: <p>{t("sections.cookies.content")}</p>,
    },
    {
      id: "droit",
      numero: "09",
      titre: t("sections.applicableLaw.title"),
      contenu: <p>{t("sections.applicableLaw.content")}</p>,
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <span className={styles.eyebrow}>{t("hero.eyebrow")}</span>

          <h1>
            {t("hero.title")} <span>{t("hero.titleAccent")}</span>
          </h1>

          <p className={styles.intro}>
            {t("hero.intro", {
              company: entreprise.nomCommercial,
            })}
          </p>

          <p className={styles.updated}>
            {t("hero.updated", {
              date: entreprise.dateMiseAJour,
            })}
          </p>
        </header>

        <nav className={styles.toc} aria-label={t("navigation.tocAriaLabel")}>
          <p className={styles.tocTitle}>{t("navigation.tocTitle")}</p>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span>{section.numero}</span>
                  {section.titre}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sections}>
          {sections.map((section) => (
            <section
              className={styles.card}
              id={section.id}
              key={section.id}
              aria-labelledby={`${section.id}-title`}
            >
              <div className={styles.cardNumber} aria-hidden="true">
                {section.numero}
              </div>

              <div className={styles.cardContent}>
                <h2 id={`${section.id}-title`}>{section.titre}</h2>
                <div className={styles.prose}>{section.contenu}</div>
              </div>
            </section>
          ))}
        </div>

        <footer className={styles.footer}>
          <p>{t("footer.question")}</p>
          <Link href="/contact#contact" className={styles.contactLink}>
            {t("footer.contactLink", {
              company: entreprise.nomCommercial,
            })}
          </Link>
        </footer>
      </div>
    </main>
  );
}
