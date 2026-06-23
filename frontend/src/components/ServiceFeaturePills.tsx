type Props = { features: string[] };

export default function ServiceFeaturePills({ features }: Props) {
  return (
    <ul className="feature-pills" data-testid="feature-pills">
      {features.map((feature) => (
        <li key={feature} className="feature-pill">
          {feature}
        </li>
      ))}
    </ul>
  );
}
