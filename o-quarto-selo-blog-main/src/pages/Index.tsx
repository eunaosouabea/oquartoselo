import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaleCard from "@/components/TaleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [featuredTales, setFeaturedTales] = useState<any[]>([]);

  useEffect(() => {
    loadFeaturedTales();
  }, []);

  const loadFeaturedTales = async () => {
    try {
      const { data, error } = await supabase
        .from("tales")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setFeaturedTales(data || []);
    } catch (error: any) {
      console.error("Error loading featured tales:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          
          <div className="relative z-10 text-center px-4 animate-fade-in">
            <h1 className="font-display text-6xl md:text-8xl mb-6 text-primary text-shadow-glow">
              O Quarto Selo
            </h1>
            <p className="text-xl md:text-2xl text-sepia italic mb-8 max-w-3xl mx-auto">
              Lendas, ecos e histórias que sobrevivem à passagem do tempo.
            </p>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Um arquivo de memórias esquecidas, narrativas transmitidas em voz baixa pelos moradores mais velhos de Mystic Falls. Cada conto aqui preservado é um fragmento da consciência coletiva de uma cidade que guarda mais segredos do que deveria.
            </p>
            <Link to="/tales">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-primary/30"
              >
                Explorar as Lendas
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Tales */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-4 text-primary">
              Contos Recentes
            </h2>
            <p className="text-muted-foreground italic">
              Vozes que ainda ecoam na escuridão
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTales.length > 0 ? (
              featuredTales.map((tale) => (
                <TaleCard key={tale.id} {...tale} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Carregando histórias...</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-card/30 border-y border-border py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl mb-4 text-primary">
              Os Ecos da Meia-Noite
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Receba novos contos e lendas diretamente em seu email. Histórias que não devem ser esquecidas.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 bg-input border border-border px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                Assinar
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
