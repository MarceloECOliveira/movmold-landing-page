import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-cnc.jpg";
import { WHATSAPP_URL } from "@/lib/constants";
import logo from "@/assets/logo.svg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Usinagem CNC de precisão"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 text-center lg:text-left lg:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-teal font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Engenharia · Modelação · Ferramentaria
          </p>
          <h1 className="mb-8">
  <span className="sr-only">MovMold - Engenharia, Modelação e Ferramentaria em Itapira, interior de São Paulo</span>
  
  <img 
    src={logo} 
    alt="Logo MovMold - Engenharia, Modelação e Ferramentaria em Itapira, interior de São Paulo" 
    className="h-32 md:h-60 w-auto object-contain mx-auto lg:mx-0" 
  />
</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-10 leading-relaxed">
            Excelência em engenharia de precisão. Transformamos conceitos em soluções
            industriais com qualidade, tecnologia e compromisso com o resultado.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-teal hover:bg-teal-light text-secondary-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal/25 text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Fale com um Especialista
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-teal rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
