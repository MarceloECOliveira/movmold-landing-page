import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nome, cnpj, telefone, assunto, mensagem, token } = await req.json();

    if (!nome || !telefone || !assunto || !mensagem) {
      return new Response(JSON.stringify({ error: "Campos obrigatórios não preenchidos" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!token) {
      return new Response(JSON.stringify({ error: "Token de segurança ausente" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // CAPTCHA Validation (Turnstile)
    const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");

    if (TURNSTILE_SECRET_KEY) {
      const formData = new FormData();
      formData.append("secret", TURNSTILE_SECRET_KEY);
      formData.append("response", token);

      const verificationResult = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          body: formData,
          method: "POST",
        }
      );

      const outcome = await verificationResult.json();
      if (!outcome.success) {
        return new Response(
          JSON.stringify({ error: "Falha na verificação de segurança (Bot detectado)" }),
          {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    } else {
      console.warn("Aviso: TURNSTILE_SECRET_KEY não configurada no Supabase.");
    }

    // Sanitize inputs
    const sanitize = (s: string) => s.replace(/[<>]/g, "").trim().slice(0, 1000);

    const body = `
Nova mensagem de contato - MovMold

Nome: ${sanitize(nome)}
CNPJ: ${sanitize(cnpj || "Não informado")}
Telefone: ${sanitize(telefone)}
Assunto: ${sanitize(assunto)}

Mensagem:
${sanitize(mensagem)}
    `.trim();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Serviço de e-mail não configurado" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MovMold Site <onboarding@resend.dev>",
        to: ["movmold@gmail.com"],
        subject: `[Site] ${sanitize(assunto)}`,
        text: body,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      throw new Error("Falha ao enviar e-mail");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao enviar mensagem" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
