import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, MapPin, ArrowLeft, MessageSquare } from "lucide-react";

const TaleDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tale, setTale] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      loadTale();
      loadComments();
    }
  }, [id]);

  const loadTale = async () => {
    try {
      const { data, error } = await supabase
        .from("tales")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setTale(data);
    } catch (error: any) {
      console.error("Error loading tale:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a história.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select(`
          *,
          profiles (username, avatar_url)
        `)
        .eq("tale_id", id)
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error: any) {
      console.error("Error loading comments:", error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("comments").insert({
        tale_id: id,
        user_id: user.id,
        content: newComment,
      });

      if (error) throw error;

      toast({
        title: "Comentário enviado!",
        description: "Seu comentário será revisado antes de ser publicado.",
      });
      setNewComment("");
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível enviar o comentário.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando história...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tale) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <p className="text-muted-foreground mb-4">História não encontrada.</p>
          <Link to="/tales">
            <Button variant="outline">Voltar às Lendas</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <Link to="/tales" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar às Lendas
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Tale Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl mb-6 text-primary text-shadow-glow">
              {tale.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {tale.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {tale.year}
              </span>
            </div>

            <p className="text-muted-foreground italic">
              Relatado por: {tale.interviewee}
            </p>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent my-6" />
          </div>

          {/* Tale Images */}
          {tale.images && tale.images.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {tale.images.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Ilustração ${idx + 1} - ${tale.title}`}
                  className="w-full h-64 object-cover border border-border shadow-elegant"
                />
              ))}
            </div>
          )}

          {/* Tale Content */}
          <div className="prose prose-invert max-w-none mb-12">
            <div className="text-foreground/90 leading-relaxed whitespace-pre-line">
              {tale.content}
            </div>
          </div>

          {/* Author Note */}
          <div className="bg-card/30 border-l-4 border-primary p-6 mb-12 italic">
            <p className="text-muted-foreground text-sm">
              Esta história foi coletada e preservada como parte do arquivo de lendas urbanas de Mystic Falls. 
              Cada relato é uma janela para o passado, um eco da memória coletiva que não deve ser esquecido.
            </p>
          </div>

          {/* Comments Section */}
          <div className="border-t border-border pt-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h2 className="font-display text-3xl text-primary">Comentários</h2>
            </div>

            {/* Comment Form */}
            {user ? (
              <form onSubmit={handleSubmitComment} className="mb-8">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Compartilhe suas impressões sobre esta lenda..."
                  className="mb-4 bg-input border-border resize-none"
                  rows={4}
                />
                <Button
                  type="submit"
                  disabled={submitting || !newComment.trim()}
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                >
                  {submitting ? "Enviando..." : "Enviar Comentário"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Seu comentário será revisado antes de ser publicado.
                </p>
              </form>
            ) : (
              <div className="bg-card/30 border border-border p-6 mb-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Faça login para comentar nesta história.
                </p>
                <Link to="/auth">
                  <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                    Entrar
                  </Button>
                </Link>
              </div>
            )}

            {/* Comments List */}
            {comments.length === 0 ? (
              <p className="text-muted-foreground italic text-center py-8">
                Nenhum comentário ainda. Seja o primeiro a compartilhar suas impressões.
              </p>
            ) : (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-card border border-border p-6">
                    <div className="flex items-start gap-4">
                      {comment.profiles?.avatar_url ? (
                        <img
                          src={comment.profiles.avatar_url}
                          alt={comment.profiles.username}
                          className="w-10 h-10 rounded-full border border-border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">
                            {comment.profiles?.username?.[0]?.toUpperCase() || "?"}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-primary mb-1">
                          @{comment.profiles?.username || "anônimo"}
                        </p>
                        <p className="text-foreground/80 leading-relaxed">{comment.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(comment.created_at).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default TaleDetail;
