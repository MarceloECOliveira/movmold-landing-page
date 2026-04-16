import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, MessageCircle, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_URL } from "@/lib/constants";
import { IMaskInput } from "react-imask";
import logo from "@/assets/logo.svg";

interface ContactFormData {
  nome: string;
  cnpj: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    nome: "",
    cnpj: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.telefone || !formData.assunto || !formData.mensagem) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const telefoneNumeros = formData.telefone.replace(/\D/g, "");
    const cnpjNumeros = formData.cnpj.replace(/\D/g, "");

    if (telefoneNumeros.length < 10) {
      toast({
        title: "Telefone incompleto",
        description: "Por favor, insira o número de telefone completo com DDD.",
        variant: "destructive",
      });
      return;
    }
    if (cnpjNumeros.length > 0 && cnpjNumeros.length < 14) {
      toast({
        title: "CNPJ incompleto",
        description: "Por favor, preencha todos os dígitos do CNPJ.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          nome: formData.nome,
          cnpj: formData.cnpj,
          telefone: formData.telefone,
          assunto: formData.assunto,
          mensagem: formData.mensagem,
        },
      });

      if (error) throw error;

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      setFormData({ nome: "", cnpj: "", telefone: "", assunto: "", mensagem: "" });
    } catch {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="bg-navy py-24 text-primary-foreground">
      <div className="container mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-teal">Contato</p>
          <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">Vamos conversar?</h2>
          <p className="mx-auto max-w-lg text-primary-foreground/70">
            Entre em contato diretamente com nossos engenheiros e descubra como podemos ajudar o seu
            projeto.
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Formulário */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div>
              <label className="mb-1 block text-sm text-primary-foreground/70">Nome *</label>
              <Input
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome completo"
                maxLength={100}
                className="border-primary-foreground/10 bg-navy-light/50 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-teal"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-primary-foreground/70">CNPJ</label>
              <IMaskInput
                mask="00.000.000/0000-00"
                name="cnpj"
                value={formData.cnpj}
                unmask={false}
                onAccept={(value) => setFormData((prev) => ({ ...prev, cnpj: value as string }))}
                placeholder="00.000.000/0000-00"
                className="flex h-10 w-full rounded-md border border-primary-foreground/10 bg-navy-light/50 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-primary-foreground/70">Telefone *</label>
              <IMaskInput
                mask={[{ mask: "(00) 0000-0000" }, { mask: "(00) 00000-0000" }]}
                name="telefone"
                value={formData.telefone}
                unmask={false}
                onAccept={(value) =>
                  setFormData((prev) => ({ ...prev, telefone: value as string }))
                }
                placeholder="(00) 00000-0000"
                className="flex h-10 w-full rounded-md border border-primary-foreground/10 bg-navy-light/50 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-primary-foreground/70">Assunto *</label>
              <Input
                name="assunto"
                value={formData.assunto}
                onChange={handleChange}
                placeholder="Ex: Orçamento de molde"
                maxLength={150}
                className="border-primary-foreground/10 bg-navy-light/50 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-teal"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-primary-foreground/70">Mensagem *</label>
              <Textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Descreva seu projeto ou necessidade..."
                rows={4}
                maxLength={2000}
                className="border-primary-foreground/10 bg-navy-light/50 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-teal"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-teal py-3 text-base font-semibold text-secondary-foreground transition-all duration-300 hover:bg-teal-light hover:shadow-lg hover:shadow-teal/25"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </motion.form>

          {/* Info de contato */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <a
              href="mailto:movmold@gmail.com"
              className="flex items-center gap-4 rounded-xl border border-primary-foreground/10 bg-navy-light/50 p-5 transition-colors hover:border-teal/40"
            >
              <Mail className="h-6 w-6 flex-shrink-0 text-teal" />
              <div>
                <p className="text-sm text-primary-foreground/50">E-mail</p>
                <span className="text-primary-foreground/80">movmold@gmail.com</span>
              </div>
            </a>

            <a
              href="tel:+5519997391780"
              className="flex items-center gap-4 rounded-xl border border-primary-foreground/10 bg-navy-light/50 p-5 transition-colors hover:border-teal/40"
            >
              <Phone className="h-6 w-6 flex-shrink-0 text-teal" />
              <div>
                <p className="text-sm text-primary-foreground/50">Telefone</p>
                <span className="text-primary-foreground/80">(19) 99739-1780</span>
              </div>
            </a>

            <a
              href="https://linkedin.com/company/movmold"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-primary-foreground/10 bg-navy-light/50 p-5 transition-colors hover:border-teal/40"
            >
              <Linkedin className="h-6 w-6 flex-shrink-0 text-teal" />
              <div>
                <p className="text-sm text-primary-foreground/50">LinkedIn</p>
                <span className="text-primary-foreground/80">MovMold</span>
              </div>
            </a>

            <a
              href="https://instagram.com/movmold"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-primary-foreground/10 bg-navy-light/50 p-5 transition-colors hover:border-teal/40"
            >
              <Instagram className="h-6 w-6 flex-shrink-0 text-teal" />
              <div>
                <p className="text-sm text-primary-foreground/50">Instagram</p>
                <span className="text-primary-foreground/80">@movmold</span>
              </div>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-3 rounded-lg bg-teal px-8 py-4 text-lg font-semibold text-secondary-foreground transition-all duration-300 hover:bg-teal-light hover:shadow-lg hover:shadow-teal/25"
            >
              <MessageCircle className="h-5 w-5" />
              Iniciar Conversa no WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      {/* Footer */}
      <footer className="container mx-auto mt-16 flex max-w-5xl flex-col items-center gap-3 border-t border-primary-foreground/10 px-6 pt-8">
        <img
          src={logo}
          alt="Logo MovMold"
          className="h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        />

        <p className="text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} MovMold — Engenharia, Modelação e Ferramentaria. Todos os
          direitos reservados.
        </p>
      </footer>
    </section>
  );
};

export default ContactSection;
