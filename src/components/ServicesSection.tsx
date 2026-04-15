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
    description: "Modelos de fundição em diversos materiais com alta precisão dimensional e acabamento superior.",
    image: servicesMolds,
  },
  {
    icon: Wrench,
    title: "Dispositivos Industriais",
    description: "Dispositivos e gabaritos customizados para otimizar processos produtivos e garantir repetibilidade.",
    image: servicesDevices,
  },
  {
    icon: Printer,
    title: "Prototipagem 3D",
    description: "Prototipagem rápida com impressão 3D para validação de conceitos e redução de tempo de desenvolvimento.",
    image: servicesPrototype,
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-teal font-medium tracking-[0.15em] uppercase text-sm mb-3">
            O que fazemos
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Nossos Serviços
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-teal/40 transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-teal" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
