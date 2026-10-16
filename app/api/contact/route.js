import { Resend } from "resend";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, maxLength = 1000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      firstName,
      email,
      phone,
      service,
      budget,
      message,
      privacyAccepted,
      website,
    } = body ?? {};

    // Champ piège anti-spam.
    // On renvoie une réponse générique si le champ est rempli.
    if (clean(website, 200)) {
      return Response.json({ success: true });
    }

    // Nettoyage et normalisation des données.
    const data = {
      name: clean(name, 100),
      firstName: clean(firstName, 100),
      email: clean(email, 254),
      phone: clean(phone, 30),
      service: clean(service, 150),
      budget: clean(budget, 100),
      message: clean(message, 5000),
      privacyAccepted,
    };

    // Validation des champs obligatoires côté serveur.
    if (
      !data.name ||
      !data.firstName ||
      !emailPattern.test(data.email) ||
      !data.phone ||
      !data.service ||
      data.message.length < 10 ||
      data.privacyAccepted !== true
    ) {
      return Response.json(
        {
          error:
            "Vérifiez les champs obligatoires et acceptez la politique de confidentialité.",
        },
        { status: 400 },
      );
    }

    // Vérification des valeurs autorisées pour le service.
    const allowedServices = [
      "Audit et stratégie SEO",
      "Contenu et rédaction SEO",
      "Netlinking et SEO local",
      "Landing page et page de vente",
      "Copywriting et e-mail marketing",
      "Accompagnement SEO",
      "Autre demande",
    ];

    if (!allowedServices.includes(data.service)) {
      return Response.json(
        { error: "Le service sélectionné n'est pas valide." },
        { status: 400 },
      );
    }

    // Vérification des budgets autorisés.
    const allowedBudgets = [
      "",
      "Moins de 150 €",
      "150–350 €",
      "350–700 €",
      "700–1500 €",
      "Plus de 1500 €",
    ];

    if (!allowedBudgets.includes(data.budget)) {
      return Response.json(
        { error: "Le budget sélectionné n'est pas valide." },
        { status: 400 },
      );
    }

    // Vérification de la configuration Resend.
    if (
      !process.env.RESEND_API_KEY ||
      !process.env.CONTACT_TO_EMAIL ||
      !process.env.CONTACT_FROM_EMAIL
    ) {
      console.error("Configuration Resend incomplète.");

      return Response.json(
        {
          error: "Le service de contact est momentanément indisponible.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      replyTo: data.email,
      subject: `Nouvelle demande de contact — ${data.service}`,

      text: [
        "Nouvelle demande reçue depuis le site Impact Words",
        "",
        `Nom : ${data.name}`,
        `Prénom : ${data.firstName}`,
        `E-mail : ${data.email}`,
        `Téléphone : ${data.phone}`,
        `Service souhaité : ${data.service}`,
        `Budget estimé : ${data.budget || "À définir"}`,
        "",
        "Politique de confidentialité : acceptée",
        "",
        "Message :",
        data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Erreur Resend :", error);

      return Response.json(
        {
          error: "Impossible d'envoyer votre demande pour le moment.",
        },
        { status: 502 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Erreur API contact :", error);

    return Response.json(
      {
        error: "Une erreur est survenue lors de l'envoi.",
      },
      { status: 500 },
    );
  }
}
