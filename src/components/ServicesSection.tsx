import { motion } from "framer-motion";
import { Compass, Box, Wrench, Printer } from "lucide-react";
import servicesProjects from "@/assets/services-projects.jpg";
import servicesMolds from "@/assets/services-molds.jpg";
import servicesDevices from "@/assets/services-devices.jpg";
import servicesPrototype from "@/assets/services-prototype.jpg";

const services = [
  {
    icon: Compass,
    title: "Projetos",
    description: "Desenvolvimento completo de projetos industriais, do conceito à entrega final.",
    image: servicesProjects,
  },
  {
    icon: Box,
    title: "Modelos de Fundição",
    description:
      "Modelos de fundição em madeira, EPS, resinas, metais ferrosos e alumínio com alta precisão e acabamento superior.",
    image: servicesMolds,
  },
  {
    icon: Wrench,
    title: "Dispositivos Industriais",
    description:
      "Dispositivos e gabaritos customizados para otimizar processos produtivos e garantir repetibilidade.",
    image: servicesDevices,
  },
  {
    icon: Printer,
    title: "Prototipagem 3D",
    description:
      "Prototipagem rápida com impressão 3D para validação de conceitos e redução de tempo de desenvolvimento.",
    image: servicesPrototype,
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="bg-background py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-teal">
            O que fazemos
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Nossos Serviços
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-teal/40 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                    <service.icon className="h-5 w-5 text-teal" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
