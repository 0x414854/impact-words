import * as React from "react";

/* ========================================
   CONFIGURATION
======================================== */

const COLORS = {
  background: "#f7f8f4",
  surface: "#ffffff",
  surfaceSoft: "#eef3ed",
  text: "#192e2b",
  muted: "#687773",
  green: "#237b5a",
  greenDark: "#153d35",
  mint: "#b9e4c9",
  blue: "#d9e9f5",
  blueDark: "#497c9e",
  border: "#dfe6df",
};

const FONT = "Arial, Helvetica, sans-serif";

/* ========================================
   FORMATAGE
======================================== */

function formatDate(sentAt) {
  const date = sentAt ? new Date(sentAt) : new Date();

  if (Number.isNaN(date.getTime())) {
    return "Date indisponible";
  }

  return date.toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "long",
    timeStyle: "short",
  });
}

/* ========================================
   LIGNE D'INFORMATION
======================================== */

function InfoRow({ label, value, last = false, email = false, phone = false }) {
  const borderBottom = last ? "none" : `1px solid ${COLORS.border}`;

  let content = value || "Non renseigné";

  if (email && value) {
    content = (
      <a
        href={`mailto:${value}`}
        style={{
          color: COLORS.blueDark,
          textDecoration: "underline",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </a>
    );
  } else if (phone && value) {
    content = (
      <a
        href={`tel:${value.replace(/[^\d+]/g, "")}`}
        style={{
          color: COLORS.text,
          textDecoration: "none",
        }}
      >
        {value}
      </a>
    );
  }

  return (
    <tr>
      <td
        width="38%"
        valign="top"
        style={{
          width: "38%",
          padding: "12px 8px 12px 14px",
          borderBottom,
          color: COLORS.muted,
          fontSize: "13px",
          lineHeight: 1.6,
        }}
      >
        {label}
      </td>

      <td
        valign="top"
        style={{
          padding: "12px 14px 12px 8px",
          borderBottom,
          color: COLORS.text,
          fontSize: "13px",
          lineHeight: 1.6,
          fontWeight: 600,
          overflowWrap: "anywhere",
          wordBreak: "break-word",
        }}
      >
        {content}
      </td>
    </tr>
  );
}

/* ========================================
   TEMPLATE PRINCIPAL
======================================== */

export default function ContactEmail({
  name,
  firstName,
  email,
  phone = "",
  service = "",
  budget = "",
  message = "",
  privacyAccepted = false,
  sentAt,
}) {
  const fullName = [firstName, name].filter(Boolean).join(" ");
  const createdAt = formatDate(sentAt);

  const details = [
    { label: "Prénom", value: firstName },
    { label: "Nom", value: name },
    { label: "Adresse e-mail", value: email, email: true },
    { label: "Téléphone", value: phone, phone: true },
    { label: "Service souhaité", value: service },
    { label: "Budget estimé", value: budget || "À définir" },
  ];

  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nouvelle demande de contact — Impact Words</title>
      </head>

      <body
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          backgroundColor: COLORS.background,
          color: COLORS.text,
          fontFamily: FONT,
          WebkitTextSizeAdjust: "100%",
        }}
      >
        {/* Fond extérieur */}
        <table
          role="presentation"
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          border="0"
          style={{
            width: "100%",
            backgroundColor: COLORS.background,
          }}
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: "28px 12px" }}>
                {/* Conteneur principal */}
                <table
                  role="presentation"
                  width="600"
                  cellPadding="0"
                  cellSpacing="0"
                  border="0"
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    margin: "0 auto",
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "14px",
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    {/* En-tête */}
                    <tr>
                      <td
                        style={{
                          padding: "30px 24px",
                          backgroundColor: COLORS.greenDark,
                          borderBottom: `4px solid ${COLORS.mint}`,
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 10px",
                            color: COLORS.mint,
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                          }}
                        >
                          IMPACT WORDS
                        </p>

                        <h1
                          style={{
                            margin: 0,
                            color: "#ffffff",
                            fontSize: "24px",
                            lineHeight: 1.4,
                            fontWeight: 700,
                          }}
                        >
                          Nouvelle demande de contact
                        </h1>

                        <p
                          style={{
                            margin: "10px 0 0",
                            color: "#e0eee6",
                            fontSize: "14px",
                            lineHeight: 1.7,
                          }}
                        >
                          Une nouvelle demande a été envoyée depuis votre site.
                        </p>
                      </td>
                    </tr>

                    {/* Introduction */}
                    <tr>
                      <td style={{ padding: "24px 24px 10px" }}>
                        <p
                          style={{
                            margin: "0 0 7px",
                            color: COLORS.muted,
                            fontSize: "12px",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                          }}
                        >
                          Nouveau prospect
                        </p>

                        <h2
                          style={{
                            margin: 0,
                            color: COLORS.greenDark,
                            fontSize: "21px",
                            lineHeight: 1.5,
                          }}
                        >
                          {fullName || "Contact sans nom"}
                        </h2>

                        <p
                          style={{
                            margin: "8px 0 0",
                            color: COLORS.muted,
                            fontSize: "14px",
                            lineHeight: 1.7,
                          }}
                        >
                          Voici le récapitulatif des informations transmises.
                        </p>
                      </td>
                    </tr>

                    {/* Résumé du projet */}
                    <tr>
                      <td style={{ padding: "14px 24px 24px" }}>
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          border="0"
                          style={{
                            width: "100%",
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: "10px",
                            overflow: "hidden",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  padding: "15px 16px",
                                  backgroundColor: COLORS.surfaceSoft,
                                  borderBottom: `1px solid ${COLORS.border}`,
                                }}
                              >
                                <p
                                  style={{
                                    margin: "0 0 6px",
                                    color: COLORS.muted,
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "1px",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Service souhaité
                                </p>

                                <p
                                  style={{
                                    margin: 0,
                                    color: COLORS.greenDark,
                                    fontSize: "16px",
                                    lineHeight: 1.6,
                                    fontWeight: 700,
                                  }}
                                >
                                  {service || "Non renseigné"}
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td style={{ padding: "14px 16px" }}>
                                <p
                                  style={{
                                    margin: "0 0 5px",
                                    color: COLORS.muted,
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "1px",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Budget estimé
                                </p>

                                <p
                                  style={{
                                    margin: 0,
                                    color: COLORS.green,
                                    fontSize: "15px",
                                    fontWeight: 700,
                                    lineHeight: 1.6,
                                  }}
                                >
                                  {budget || "À définir"}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Coordonnées */}
                    <tr>
                      <td style={{ padding: "0 24px 24px" }}>
                        <h2
                          style={{
                            margin: "0 0 12px",
                            color: COLORS.text,
                            fontSize: "16px",
                            lineHeight: 1.5,
                          }}
                        >
                          Informations du contact
                        </h2>

                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          border="0"
                          style={{
                            width: "100%",
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: "9px",
                          }}
                        >
                          <tbody>
                            {details.map((item, index) => (
                              <InfoRow
                                key={item.label}
                                label={item.label}
                                value={item.value}
                                email={item.email}
                                phone={item.phone}
                                last={index === details.length - 1}
                              />
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Message */}
                    <tr>
                      <td style={{ padding: "0 24px 24px" }}>
                        <h2
                          style={{
                            margin: "0 0 12px",
                            color: COLORS.text,
                            fontSize: "16px",
                            lineHeight: 1.5,
                          }}
                        >
                          Message du prospect
                        </h2>

                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          border="0"
                          style={{
                            width: "100%",
                            border: `1px solid ${COLORS.border}`,
                            borderLeft: `4px solid ${COLORS.green}`,
                            borderRadius: "8px",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  padding: "17px 15px",
                                  color: COLORS.text,
                                  fontSize: "14px",
                                  lineHeight: 1.8,
                                  whiteSpace: "pre-wrap",
                                  overflowWrap: "anywhere",
                                  wordBreak: "break-word",
                                }}
                              >
                                {message || "Aucun message renseigné."}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Consentement */}
                    <tr>
                      <td style={{ padding: "0 24px 24px" }}>
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          border="0"
                          style={{
                            width: "100%",
                            backgroundColor: COLORS.blue,
                            borderRadius: "8px",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  padding: "13px 15px",
                                  color: COLORS.greenDark,
                                  fontSize: "12px",
                                  lineHeight: 1.7,
                                }}
                              >
                                <strong>Politique de confidentialité :</strong>{" "}
                                {privacyAccepted
                                  ? "acceptée par le prospect."
                                  : "acceptation non confirmée."}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Date de réception */}
                    <tr>
                      <td style={{ padding: "0 24px 26px" }}>
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          border="0"
                          style={{
                            width: "100%",
                            backgroundColor: "#f8faf7",
                            borderRadius: "8px",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                align="center"
                                style={{
                                  padding: "15px 12px",
                                  color: COLORS.muted,
                                  fontSize: "12px",
                                  lineHeight: 1.8,
                                }}
                              >
                                Demande reçue le
                                <br />
                                <strong
                                  style={{
                                    color: COLORS.text,
                                    fontSize: "14px",
                                  }}
                                >
                                  {createdAt}
                                </strong>
                                <br />
                                Heure de Paris — Europe/Paris
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Pied de page */}
                    <tr>
                      <td
                        align="center"
                        style={{
                          padding: "20px 24px",
                          backgroundColor: COLORS.surfaceSoft,
                          borderTop: `1px solid ${COLORS.border}`,
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 5px",
                            color: COLORS.greenDark,
                            fontSize: "12px",
                            fontWeight: 700,
                            letterSpacing: "1px",
                          }}
                        >
                          IMPACT WORDS
                        </p>

                        <p
                          style={{
                            margin: 0,
                            color: COLORS.muted,
                            fontSize: "11px",
                            lineHeight: 1.7,
                          }}
                        >
                          Notification automatique du formulaire de contact.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p
                  style={{
                    margin: "14px 0 0",
                    color: COLORS.muted,
                    fontSize: "11px",
                    lineHeight: 1.6,
                    textAlign: "center",
                  }}
                >
                  Impact Words — Notification de contact
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
