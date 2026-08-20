import type { JobDetail } from "../../lib/jobs";

type Fact = {
  label: string;
  value: string;
};

function buildRoleFacts(job: JobDetail): Fact[] {
  const facts: Fact[] = [];

  if (job.experience?.trim()) facts.push({ label: "Experience", value: job.experience });
  if (job.duration?.trim()) facts.push({ label: "Duration", value: job.duration });
  if (job.numberOfOpenings > 0) {
    facts.push({
      label: "Openings",
      value: job.numberOfOpenings === 1 ? "1 position" : `${job.numberOfOpenings} positions`,
    });
  }

  return facts;
}

export default function JobRoleFacts({ job }: { job: JobDetail }) {
  const facts = buildRoleFacts(job);
  if (facts.length === 0) return null;

  return (
    <section className="open-positions-role-facts" data-testid="job-role-facts" aria-label="Role details">
      <dl className="open-positions-role-facts-grid">
        {facts.map((fact) => (
          <div key={fact.label} className="open-positions-role-fact">
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
