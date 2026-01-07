interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div>
      <div className="flex items-center">
        <h1 className="inline-block text-xl sm:text-2xl font-bold text-primary tracking-tight">
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
