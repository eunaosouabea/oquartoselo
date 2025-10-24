import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Mail, Linkedin } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <PageHeader 
          title="Sobre o Autor"
          subtitle="O guardião das histórias esquecidas"
        />

        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border p-8 md:p-12 shadow-elegant">
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground leading-relaxed mb-6">
                Meu nome é <span className="text-primary font-semibold">Viktor Wilhelm Kronstadt</span>. 
                Nascido e criado em Mystic Falls. Tenho 23 anos e atuo como jornalista no jornal local.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                Formei-me em Jornalismo pela Columbia University, em Nova York, onde aprendi que 
                a verdade pode ser tão fascinante quanto perigosa. Foi lá que compreendi a arte de 
                ouvir histórias em cada esquina e de identificar quando uma mentira se disfarça com perfeição.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                Atualmente, mantenho o blog <span className="italic text-primary">O Quarto Selo</span>, 
                dedicado a contos e relatos de lendas urbanas. Cada história que compartilho é um 
                esforço para preservar memórias antigas, transmitidas por moradores mais velhos, 
                antes que desapareçam da consciência coletiva da cidade.
              </p>

              <div className="border-t border-border mt-8 pt-8">
                <p className="text-muted-foreground italic mb-4">
                  "Há histórias que não devem ser esquecidas, mesmo quando nos assustam. 
                  São elas que nos lembram quem somos — e do que somos capazes."
                </p>
              </div>

              <div className="mt-8">
                <h3 className="font-display text-2xl text-primary mb-4">Contato Profissional</h3>
                <div className="flex gap-4">
                  <a
                    href="mailto:viktor@oquartoselo.com"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>viktor@oquartoselo.com</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground italic">
              Se você tem uma história para contar, visite o{" "}
              <a href="/archive" className="text-primary hover:text-gold transition-colors">
                Arquivo da Memória
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
