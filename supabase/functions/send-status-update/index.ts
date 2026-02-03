
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface StatusUpdateRequest {
  etudiantEmail: string;
  etudiantNom: string;
  poste: string;
  entreprise: string;
  nouveauStatut: string;
  recruteurNom: string;
}

const getStatusMessage = (statut: string) => {
  switch (statut.toLowerCase()) {
    case 'acceptée':
    case 'accepted':
      return {
        title: 'Félicitations ! Votre candidature a été acceptée 🎉',
        message: 'Nous avons le plaisir de vous informer que votre candidature a été retenue.',
        color: '#10b981',
        bgColor: '#ecfdf5'
      };
    case 'refusée':
    case 'rejected':
      return {
        title: 'Mise à jour de votre candidature',
        message: 'Malheureusement, votre candidature n\'a pas été retenue cette fois-ci.',
        color: '#ef4444',
        bgColor: '#fef2f2'
      };
    case 'entretien':
    case 'interview':
      return {
        title: 'Votre candidature progresse ! 📞',
        message: 'Excellente nouvelle ! Vous êtes convoqué(e) pour un entretien.',
        color: '#f59e0b',
        bgColor: '#fffbeb'
      };
    default:
      return {
        title: 'Mise à jour de votre candidature',
        message: 'Le statut de votre candidature a été mis à jour.',
        color: '#6366f1',
        bgColor: '#eef2ff'
      };
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { etudiantEmail, etudiantNom, poste, entreprise, nouveauStatut, recruteurNom }: StatusUpdateRequest = await req.json();

    console.log("Envoi mise à jour statut:", { etudiantEmail, poste, entreprise, nouveauStatut });

    const statusInfo = getStatusMessage(nouveauStatut);

    const emailResponse = await resend.emails.send({
      from: "GetJob <onboarding@resend.dev>",
      to: [etudiantEmail],
      subject: `Mise à jour de votre candidature - ${poste} chez ${entreprise}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">GetJob</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Mise à jour de candidature</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Bonjour ${etudiantNom},</h2>
            
            <div style="background: ${statusInfo.bgColor}; border-left: 4px solid ${statusInfo.color}; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: ${statusInfo.color}; margin-top: 0;">${statusInfo.title}</h3>
              <p style="margin: 10px 0 0 0; color: #555;">${statusInfo.message}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Détails de l'offre :</h3>
              <p style="margin: 5px 0; color: #555;"><strong>Poste :</strong> ${poste}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Entreprise :</strong> ${entreprise}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Nouveau statut :</strong> ${nouveauStatut}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Recruteur :</strong> ${recruteurNom}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '.lovable.app') || 'https://your-app.lovable.app'}/dashboard-etudiant" 
                 style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Voir mes candidatures
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #888; font-size: 14px; text-align: center; margin: 0;">
              Cet email a été envoyé par GetJob - Plateforme de recrutement
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email statut envoyé avec succès:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erreur envoi email statut:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
