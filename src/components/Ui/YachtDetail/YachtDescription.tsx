const YachtDescription = ({
  name,
  description,
}: {
  name: string;
  description: string[];
}) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
      About {name}
    </h2>
    <div className="mt-5 space-y-4">
      {description.map((paragraph, i) => (
        <p key={i} className="text-brand-900/70 leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  </div>
);

export default YachtDescription;
