import { Link, useLocation } from "react-router-dom";
import { Flame, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const links = [
    { path: "/", label: "Início" },
    { path: "/tales", label: "Lendas & Contos" },
    { path: "/archive", label: "Arquivo da Memória" },
    { path: "/about", label: "Sobre o Autor" },
  ];

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Flame className="w-6 h-6 text-primary group-hover:text-gold transition-colors" />
            <span className="font-display text-xl text-primary group-hover:text-gold transition-colors">
              O Quarto Selo
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <ul className="flex gap-6">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors hover:text-primary ${
                      location.pathname === link.path
                        ? "text-primary border-b border-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {user ? (
              <Link to="/profile">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10"
                >
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button 
                  size="sm"
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                >
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
