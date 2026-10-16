import { Resend } from "resend";
import { createElement } from "react";
import ContactEmail from "@/app/components/mail/contact";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_SERVICES = new Set([
  "Audit et stratégie SEO",
  "Contenu et rédaction SEO",
  "Netlinking et SEO local",
  "Landing page et page de vente",
  "Copywriting et e-mail marketing",
  "Accompagnement SEO",
  "Autre demande",
]);

const ALLOWED_BUDGETS = new Set([
  "",
  "Moins de 150 €",
  "150–350 €",
  "350–700 €",
  "700–1500 €",
  "Plus de 1500 €",
]);

function clean(value, maxLength = 1000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function jsonError(error, status) {
  return Response.json({ error }, { status });
}

function validateBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Les données du formulaire sont invalides." };
  }

  // Honeypot : réponse neutre pour les robots.
  if (clean(body.website, 200)) {
    return { spam: true };
  }

  const data = {
    name: clean(body.name, 100),
    firstName: clean(body.firstName, 100),
    email: clean(body.email, 254).toLowerCase(),
    phone: clean(body.phone, 30),
    service: clean(body.service, 150),
    budget: clean(body.budget, 100),
    message: clean(body.message, 5000),
    privacyAccepted: body.privacyAccepted,
  };

  if (
    !data.name ||
    !data.firstName ||
    !emailPattern.test(data.email) ||
    !data.phone ||
    !data.service ||
    data.message.length < 10 ||
    data.privacyAccepted !== true
  ) {
    return {
      error:
        "Vérifiez les champs obligatoires et acceptez la politique de confidentialité.",
    };
  }

  if (/[\r\n]/.test(data.email) || /[\r\n]/.test(data.phone)) {
    return { error: "Certaines informations saisies sont invalides." };
  }

  if (!ALLOWED_SERVICES.has(data.service)) {
    return { error: "Le service sélectionné n'est pas valide." };
  }

  if (!ALLOWED_BUDGETS.has(data.budget)) {
    return { error: "Le budget sélectionné n'est pas valide." };
  }

  return { data };
}

export async function POST(request) {
  try {
    // Limite simple contre les corps de requête trop volumineux.
    const contentLength = Number(request.headers.get("content-length") || 0);

    if (contentLength > 20_000) {
      return jsonError("La demande est trop volumineuse.", 413);
    }

    if (!request.headers.get("content-type")?.includes("application/json")) {
      return jsonError("Format de requête non pris en charge.", 415);
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return jsonError("Le contenu envoyé est invalide.", 400);
    }

    const validation = validateBody(body);

    if (validation.spam) {
      return Response.json({ success: true });
    }

    if (validation.error) {
      return jsonError(validation.error, 400);
    }

    const { data } = validation;

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error("Configuration Resend incomplète.");
      return jsonError(
        "Le service de contact est momentanément indisponible.",
        500,
      );
    }

    const resend = new Resend(apiKey);
    const sentAt = new Date().toISOString();

    const { data: result, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email,
      subject: `Nouvelle demande de contact — ${data.service}`,
      react: createElement(ContactEmail, {
        ...data,
        sentAt,
      }),
      text: [
        "IMPACT WORDS — Nouvelle demande de contact",
        "",
        `Nom : ${data.name}`,
        `Prénom : ${data.firstName}`,
        `E-mail : ${data.email}`,
        `Téléphone : ${data.phone}`,
        `Service souhaité : ${data.service}`,
        `Budget estimé : ${data.budget || "À définir"}`,
        `Politique de confidentialité : Acceptée`,
        `Date de réception : ${sentAt}`,
        "",
        "Message :",
        data.message,
      ].join("\n"),
    });

    if (error) {
      // Ne pas exposer les détails du fournisseur au navigateur.
      console.error("Erreur Resend :", error);
      return jsonError(
        "Impossible d'envoyer votre demande pour le moment.",
        502,
      );
    }

    return Response.json({
      success: true,
      id: result?.id,
    });
  } catch (error) {
    console.error("Erreur inattendue API contact :", error);
    return jsonError("Une erreur est survenue lors de l'envoi.", 500);
  }
}
