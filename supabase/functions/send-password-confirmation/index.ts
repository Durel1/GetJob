
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PasswordConfirmationRequest {
  email: string;
  nom: string;
  confirmationToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, nom, confirmationToken }: PasswordConfirmationRequest = await req.json();

    console.log("Envoi email confirmation mot de passe:", { email, nom });

    // Utiliser l'URL de l'application Lovable directement
    const confirmationUrl = `https://ilbhewyiqqgliivqyvjp.lovable.app/confirm-password-reset?token=${confirmationToken}`;

    const emailResponse = await resend.emails.send({
      from: "GetJob <onboarding@resend.dev>",
      to: [email],
      subject: "Confirmez la réinitialisation de votre mot de passe - GetJob",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">GetJob</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Confirmation de réinitialisation</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Bonjour ${nom},</h2>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              Vous avez demandé la réinitialisation de votre mot de passe pour votre compte GetJob.
            </p>
            
            <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #1565c0;">
                <strong>🔒 Sécurité :</strong> Cliquez sur le bouton ci-dessous pour confirmer et activer votre nouveau mot de passe.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" 
                 style="background: #4caf50; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
                Confirmer la réinitialisation
              </a>
            </div>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #856404;">
                <strong>⏰ Important :</strong> Ce lien expire dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
              </p>
            </div>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              Une fois confirmé, vous pourrez vous connecter avec votre nouveau mot de passe.
            </p>
            
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                <strong>Lien de secours :</strong><br>
                Si le bouton ne fonctionne pas, copiez-collez ce lien :<br>
                <code style="word-break: break-all;">${confirmationUrl}</code>
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #888; font-size: 14px; text-align: center; margin: 0;">
              Cet email a été envoyé par GetJob - Plateforme de recrutement
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email confirmation envoyé avec succès:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erreur envoi email confirmation:", error);
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
