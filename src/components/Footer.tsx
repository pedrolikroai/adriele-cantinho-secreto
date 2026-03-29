const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container text-center">
        <p className="font-heading text-lg font-semibold text-foreground mb-1">Adriele Leite</p>
        <p className="text-xs text-muted-foreground">
          Rotina real, dicas e achadinhos · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
