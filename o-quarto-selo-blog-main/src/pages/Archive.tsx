import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Archive = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <PageHeader 
          title="Arquivo da Memória"
          subtitle="Conte o que ouviu, antes que se perca"
        />

        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border p-8 shadow-elegant">
            <p className="text-muted-foreground mb-8 leading-relaxed text-center italic">
              Este espaço é dedicado às vozes que desejam preservar histórias. 
              Se você conhece uma lenda, um conto ou um relato que merece ser lembrado, 
              compartilhe conosco. Cada palavra é um elo com o passado.
            </p>

            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground">Seu Nome</Label>
                <Input 
                  id="name" 
                  placeholder="Como deseja ser identificado?"
                  className="mt-2 bg-input border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="seu@email.com"
                  className="mt-2 bg-input border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="title" className="text-foreground">Título da História</Label>
                <Input 
                  id="title" 
                  placeholder="Como ela é conhecida?"
                  className="mt-2 bg-input border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-foreground">Local de Origem</Label>
                <Input 
                  id="location" 
                  placeholder="Onde esta história aconteceu?"
                  className="mt-2 bg-input border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="interviewee" className="text-foreground">Quem Contou Esta História?</Label>
                <Input 
                  id="interviewee" 
                  placeholder="Nome e idade (se possível)"
                  className="mt-2 bg-input border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="story" className="text-foreground">A História</Label>
                <Textarea 
                  id="story" 
                  placeholder="Conte-nos todos os detalhes que puder recordar..."
                  className="mt-2 min-h-[200px] bg-input border-border text-foreground resize-none"
                />
              </div>

              <div>
                <Label htmlFor="audio" className="text-foreground">Anexar Áudio ou Foto (opcional)</Label>
                <Input 
                  id="audio" 
                  type="file"
                  accept="audio/*,image/*"
                  className="mt-2 bg-input border-border text-foreground file:text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Fotos de locais, documentos ou gravações de áudio são bem-vindas
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-primary/30"
                size="lg"
              >
                Enviar História
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-6 italic">
              Todas as submissões serão analisadas antes da publicação. 
              Respeitamos a privacidade e o anonimato quando solicitado.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Archive;
