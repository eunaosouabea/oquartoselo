interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <h1 className="font-display text-5xl md:text-6xl mb-4 text-primary text-shadow-glow">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground text-lg italic max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
    </div>
  );
};

export default PageHeader;
