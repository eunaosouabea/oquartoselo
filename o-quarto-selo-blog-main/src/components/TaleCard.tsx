import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";

interface TaleCardProps {
  id: string;
  title: string;
  excerpt: string;
  location: string;
  year: number;
  interviewee: string;
}

const TaleCard = ({ id, title, excerpt, location, year, interviewee }: TaleCardProps) => {
  return (
    <article className="group bg-card border border-border hover:border-primary/50 transition-all duration-300 p-6 shadow-elegant hover:shadow-glow">
      <Link to={`/tale/${id}`}>
        <h3 className="font-display text-2xl mb-3 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {year}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 italic">
          Relatado por: {interviewee}
        </p>
        
        <p className="text-foreground/80 leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        
        <div className="mt-4 text-primary text-sm group-hover:text-gold transition-colors">
          Ler mais →
        </div>
      </Link>
    </article>
  );
};

export default TaleCard;
