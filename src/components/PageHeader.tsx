interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div>
      <div className="flex items-center">
        <h1 className="inline-block text-lg font-bold tracking-tight sm:text-xl text-primary">
          {title}
        </h1>
      </div>
      {description && (
        <p className="mb-0 text-sm text-primary/90">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
