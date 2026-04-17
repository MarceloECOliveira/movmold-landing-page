import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-cnc.jpg";
import { WHATSAPP_URL } from "@/lib/constants";
import logo from "@/assets/logo.svg";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Usinagem CNC de precisão" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 py-32 text-center lg:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-teal">
            Engenharia · Modelação · Ferramentaria
          </p>
          <h1 className="mb-8">
            <span className="sr-only">
              MovMold - Engenharia, Modelação e Ferramentaria em Itapira, interior de São Paulo
            </span>

            <img
              src={logo}
              alt="Logo MovMold - Engenharia, Modelação e Ferramentaria em Itapira, interior de São Paulo"
              className="h-32 w-auto object-contain md:h-60"
            />
          </h1>
          <p className="mb-10 max-w-2xl text-center md:text-left text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
            Excelência em engenharia de precisão. Transformamos conceitos em soluções industriais
            com qualidade, tecnologia e compromisso com o resultado.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-lg bg-teal px-8 py-4 text-lg font-semibold text-secondary-foreground transition-all duration-300 hover:bg-teal-light hover:shadow-lg hover:shadow-teal/25"
          >
            <MessageCircle className="h-5 w-5" />
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
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-primary-foreground/30 pt-2">
          <div className="h-1.5 w-1.5 rounded-full bg-teal" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
