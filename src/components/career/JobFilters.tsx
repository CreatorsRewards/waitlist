import { useState } from 'react';
import type { JobPosting } from './types';

const DEPARTMENTS = ['All', 'Engineering', 'Design', 'Operations'] as const;
const WORK_TYPES = ['All', 'Remote', 'On-site', 'Hybrid'] as const;
const EXPERIENCE_LEVELS = [
  'All',
  'Intern',
  'Junior',
  'Intermediate',
  'Senior',
] as const;

export type Department = (typeof DEPARTMENTS)[number];
export type WorkType = (typeof WORK_TYPES)[number];
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

interface JobFiltersProps {
  jobs: JobPosting[];
  onFilterChange: (filters: {
    dept: Department;
    workType: WorkType;
    experience: ExperienceLevel;
  }) => void;
}

const filterButtonStyle = (isActive: boolean): React.CSSProperties => ({
  padding: '8px 20px',
  borderRadius: '100px',
  border: `2px solid ${isActive ? 'var(--cr-pink)' : 'var(--border-subtle, #333)'}`,
  background: isActive ? 'var(--cr-pink)' : 'transparent',
  color: isActive ? '#fff' : 'var(--text-secondary)',
  fontFamily: 'var(--font-display)',
  fontSize: '13px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});

const FilterGroup = ({
  label,
  options,
  active,
  onChange,
  showCount,
}: {
  label: string;
  options: readonly string[];
  active: string;
  onChange: (val: any) => void;
  showCount?: (val: string) => number;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
    }}
  >
    <span
      style={{
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        color: 'var(--text-muted)',
      }}
    >
      {label}
    </span>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center',
      }}
    >
      {options.map((option) => {
        const isActive = active === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            style={filterButtonStyle(isActive)}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--cr-pink)';
                e.currentTarget.style.color = 'var(--cr-pink)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor =
                  'var(--border-subtle, #333)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }
            }}
          >
            {option}
            {showCount && option !== 'All' && (
              <span
                style={{ marginLeft: '8px', opacity: 0.6, fontSize: '11px' }}
              >
                {showCount(option)}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

export default function JobFilters({ jobs, onFilterChange }: JobFiltersProps) {
  const [activeDept, setActiveDept] = useState<Department>('All');
  const [activeWorkType, setActiveWorkType] = useState<WorkType>('All');
  const [activeExperience, setActiveExperience] =
    useState<ExperienceLevel>('All');

  const updateFilter = (
    dept: Department = activeDept,
    workType: WorkType = activeWorkType,
    experience: ExperienceLevel = activeExperience
  ) => {
    onFilterChange({ dept, workType, experience });
  };

  const handleDeptChange = (dept: Department) => {
    setActiveDept(dept);
    updateFilter(dept);
  };

  const handleWorkTypeChange = (workType: WorkType) => {
    setActiveWorkType(workType);
    updateFilter(undefined, workType);
  };

  const handleExperienceChange = (experience: ExperienceLevel) => {
    setActiveExperience(experience);
    updateFilter(undefined, undefined, experience);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        marginBottom: '48px',
        animation: 'slideUpSmooth 0.6s cubic-bezier(0.16,1,0.3,1) both 120ms',
      }}
    >
      <FilterGroup
        label="Department"
        options={DEPARTMENTS}
        active={activeDept}
        onChange={handleDeptChange}
        showCount={(dept) => jobs.filter((j) => j.department === dept).length}
      />
      <FilterGroup
        label="Type"
        options={WORK_TYPES}
        active={activeWorkType}
        onChange={handleWorkTypeChange}
      />
      <FilterGroup
        label="Experience"
        options={EXPERIENCE_LEVELS}
        active={activeExperience}
        onChange={handleExperienceChange}
      />
    </div>
  );
}
