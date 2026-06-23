type Props = { skills: readonly string[] };

export default function SkillChips({ skills }: Props) {
  return (
    <ul className="skill-chips" data-testid="skill-chips">
      {skills.map((skill) => (
        <li key={skill} className="skill-chip">
          {skill}
        </li>
      ))}
    </ul>
  );
}
