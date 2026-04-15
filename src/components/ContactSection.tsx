import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, MessageCircle, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_URL = "https://wa.me/5519997391780?text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista%20da%20MovMold.";

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

  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo o que não é dígito
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const formatPhone = (value: string) => {
    let v = value.replace(/\D/g, "");
    if (v.length <= 10) {
      // Formato fixo: (00) 0000-0000
      return v
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    } else {
      // Formato celular: (00) 00000-0000
      return v
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cnpj") {
      formattedValue = formatCNPJ(value);
    } else if (name === "telefone") {
      formattedValue = formatPhone(value);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
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
    <section id="contato" className="py-24 bg-navy text-primary-foreground">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-teal font-medium tracking-[0.15em] uppercase text-sm mb-3">
            Contato
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Vamos conversar?
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">
            Entre em contato diretamente com nossos engenheiros e descubra como
            podemos ajudar o seu projeto.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulário */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm text-primary-foreground/70 mb-1 block">Nome *</label>
              <Input
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome completo"
                maxLength={100}
                className="bg-navy-light/50 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-teal"
              />
            </div>
            <div>
              <label className="text-sm text-primary-foreground/70 mb-1 block">CNPJ</label>
              <Input
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                placeholder="00.000.000/0000-00"
                maxLength={18}
                className="bg-navy-light/50 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-teal"
              />
            </div>
            <div>
              <label className="text-sm text-primary-foreground/70 mb-1 block">Telefone *</label>
              <Input
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                maxLength={15}
                className="bg-navy-light/50 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-teal"
              />
            </div>
            <div>
              <label className="text-sm text-primary-foreground/70 mb-1 block">Assunto *</label>
              <Input
                name="assunto"
                value={formData.assunto}
                onChange={handleChange}
                placeholder="Ex: Orçamento de molde"
                maxLength={150}
                className="bg-navy-light/50 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-teal"
              />
            </div>
            <div>
              <label className="text-sm text-primary-foreground/70 mb-1 block">Mensagem *</label>
              <Textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Descreva seu projeto ou necessidade..."
                rows={4}
                maxLength={2000}
                className="bg-navy-light/50 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-teal"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-teal hover:bg-teal-light text-secondary-foreground font-semibold py-3 text-base transition-all duration-300 hover:shadow-lg hover:shadow-teal/25"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
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
              className="flex items-center gap-4 p-5 rounded-xl bg-navy-light/50 border border-primary-foreground/10 hover:border-teal/40 transition-colors"
            >
              <Mail className="w-6 h-6 text-teal flex-shrink-0" />
              <div>
                <p className="text-sm text-primary-foreground/50">E-mail</p>
                <span className="text-primary-foreground/80">movmold@gmail.com</span>
              </div>
            </a>

            <a
              href="tel:+5519997391780"
              className="flex items-center gap-4 p-5 rounded-xl bg-navy-light/50 border border-primary-foreground/10 hover:border-teal/40 transition-colors"
            >
              <Phone className="w-6 h-6 text-teal flex-shrink-0" />
              <div>
                <p className="text-sm text-primary-foreground/50">Telefone</p>
                <span className="text-primary-foreground/80">(19) 99739-1780</span>
              </div>
            </a>

            <a
              href="https://linkedin.com/company/movmold"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl bg-navy-light/50 border border-primary-foreground/10 hover:border-teal/40 transition-colors"
            >
              <Linkedin className="w-6 h-6 text-teal flex-shrink-0" />
              <div>
                <p className="text-sm text-primary-foreground/50">LinkedIn</p>
                <span className="text-primary-foreground/80">MovMold</span>
              </div>
            </a>

            <a
              href="https://instagram.com/movmold"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl bg-navy-light/50 border border-primary-foreground/10 hover:border-teal/40 transition-colors"
            >
              <Instagram className="w-6 h-6 text-teal flex-shrink-0" />
              <div>
                <p className="text-sm text-primary-foreground/50">Instagram</p>
                <span className="text-primary-foreground/80">@movmold</span>
              </div>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 justify-center bg-teal hover:bg-teal-light text-secondary-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal/25 text-lg mt-4"
            >
              <MessageCircle className="w-5 h-5" />
              Iniciar Conversa no WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 max-w-5xl mt-16 pt-8 border-t border-primary-foreground/10">
        <p className="text-center text-primary-foreground/40 text-sm">
          © {new Date().getFullYear()} MovMold — Engenharia, Modelação e Ferramentaria. Todos os direitos reservados.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;