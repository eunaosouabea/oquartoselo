import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import TaleCard from "@/components/TaleCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Tales = () => {
  const [tales, setTales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTales();
  }, []);

  const loadTales = async () => {
    try {
      const { data, error } = await supabase
        .from("tales")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTales(data || []);
    } catch (error: any) {
      console.error("Error loading tales:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <PageHeader 
          title="Lendas & Contos"
          subtitle="Narrativas transmitidas em voz baixa, preservadas antes que o tempo as apague"
        />

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando histórias...</p>
          </div>
        ) : tales.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma história encontrada ainda.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tales.map((tale) => (
              <TaleCard key={tale.id} {...tale} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Tales;
