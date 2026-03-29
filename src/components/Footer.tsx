import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container max-w-lg mx-auto text-center">
        <p className="font-heading text-base font-semibold text-foreground mb-1">Adriele Leite</p>
        <p className="text-xs text-muted-foreground mb-4">
          Rotina real, dicas e achadinhos · © {new Date().getFullYear()}
        </p>
        <Link
          to="/painel"
          className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/40 hover:text-muted-foreground transition-colors"
          aria-label="Área administrativa"
        >
          <Settings size={10} />
          Administração
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
