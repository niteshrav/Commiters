import type { FounderSkillBar } from "../lib/siteTrustContent";

type Props = { skills: readonly FounderSkillBar[] };

export default function FounderSkillBars({ skills }: Props) {
  return (
    <div className="founder-skill-bars" data-testid="founder-skill-bars">
      {skills.map((skill) => (
        <div key={skill.label} className="founder-skill-bar-row">
          <div className="founder-skill-bar-label">
            <span>{skill.label}</span>
            <span className="founder-skill-bar-pct">{skill.level}%</span>
          </div>
          <div className="founder-skill-bar-track" role="presentation">
            <div className="founder-skill-bar-fill" style={{ width: `${skill.level}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
