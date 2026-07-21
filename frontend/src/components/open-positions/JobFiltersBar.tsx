import type { JobQuery } from "../../lib/jobs/types";

type Props = {
  search: string;
  department: string;
  workMode: string;
  employmentType: string;
  departments: string[];
  workModes: string[];
  employmentTypes: string[];
  onChange: (next: Partial<JobQuery>) => void;
};

export default function JobFiltersBar({
  search,
  department,
  workMode,
  employmentType,
  departments,
  workModes,
  employmentTypes,
  onChange,
}: Props) {
  return (
    <div className="open-positions-filters" data-testid="open-positions-filters">
      <label className="open-positions-filter">
        <span>Search</span>
        <input
          value={search}
          placeholder="Search by title, department, location"
          onChange={(e) => onChange({ search: e.target.value, page: 1 })}
        />
      </label>
      <label className="open-positions-filter">
        <span>Department</span>
        <select value={department} onChange={(e) => onChange({ department: e.target.value, page: 1 })}>
          <option value="">All departments</option>
          {departments.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="open-positions-filter">
        <span>Work mode</span>
        <select value={workMode} onChange={(e) => onChange({ workMode: e.target.value, page: 1 })}>
          <option value="">All modes</option>
          {workModes.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="open-positions-filter">
        <span>Employment type</span>
        <select value={employmentType} onChange={(e) => onChange({ employmentType: e.target.value, page: 1 })}>
          <option value="">All types</option>
          {employmentTypes.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export function JobListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="open-positions-grid" data-testid="open-positions-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="open-positions-card open-positions-card--skeleton" aria-hidden />
      ))}
    </div>
  );
}
