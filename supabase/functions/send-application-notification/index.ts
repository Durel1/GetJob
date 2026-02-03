
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  candidatureId: string;
  etudiantNom: string;
  etudiantEmail: string;
  poste: string;
  entreprise: string;
  recruteurEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { candidatureId, etudiantNom, etudiantEmail, poste, entreprise, recruteurEmail }: NotificationRequest = await req.json();

    console.log("Envoi notification candidature:", { candidatureId, etudiantNom, poste, entreprise });

    const emailResponse = await resend.emails.send({
      from: "GetJob <onboarding@resend.dev>",
      to: [recruteurEmail],
      subject: `Nouvelle candidature pour ${poste} chez ${entreprise}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">GetJob</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Nouvelle candidature reçue</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Bonjour,</h2>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              Vous avez reçu une nouvelle candidature pour le poste de <strong>${poste}</strong> chez <strong>${entreprise}</strong>.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Détails du candidat :</h3>
              <p style="margin: 5px 0; color: #555;"><strong>Nom :</strong> ${etudiantNom}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Email :</strong> ${etudiantEmail}</p>
            </div>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 30px;">
              Connectez-vous à votre tableau de bord pour consulter le profil complet du candidat et gérer cette candidature.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '.lovable.app') || 'https://your-app.lovable.app'}/dashboard-recruteur" 
                 style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Voir la candidature
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

    console.log("Email envoyé avec succès:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erreur envoi email notification candidature:", error);
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
