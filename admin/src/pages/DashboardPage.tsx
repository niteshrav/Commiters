import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon";
import { api } from "../lib/api";

type DashboardData = {
  totalServices: number;
  totalProjects: number;
  totalTeamMembers: number;
  totalBlogs: number;
  totalTestimonials: number;
  totalContactQueries: number;
  unreadContactQueries: number;
  totalFaqs: number;
  openJobs: number;
  activity: Array<{
    id: string;
    type: "inquiry" | "blog" | "draft";
    title: string;
    subtitle: string;
    tag: string;
  }>;
  talentPipeline: Array<{
    id: string;
    title: string;
    applicantsLabel: string;
    fillPercent: number;
  }>;
};

const TRAFFIC_BARS = [40, 60, 55, 80, 75, 90, 85, 95, 100, 70, 65, 50];

function activityIcon(type: DashboardData["activity"][number]["type"]) {
  if (type === "blog") return { icon: "article", tone: "secondary" as const };
  if (type === "draft") return { icon: "drafts", tone: "muted" as const };
  return { icon: "mail", tone: "primary" as const };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    api<DashboardData>("/api/admin/dashboard")
      .then((stats) => {
        setData(stats);
        if (stats.unreadContactQueries > 0) {
          window.setTimeout(() => setToastVisible(true), 1200);
          window.setTimeout(() => setToastVisible(false), 6200);
        }
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load dashboard."));
  }, []);

  if (error) {
    return (
      <div className="admin-page">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="admin-page">
        <p className="muted">Loading dashboard…</p>
      </div>
    );
  }

  const statCards = [
    {
      icon: "forum",
      badge: data.unreadContactQueries > 0 ? `+${data.unreadContactQueries} new` : "Live",
      badgeTone: data.unreadContactQueries > 0 ? "primary" : "muted",
      label: "Total Inquiries",
      value: data.totalContactQueries.toLocaleString(),
    },
    {
      icon: "rocket_launch",
      badge: "Active",
      badgeTone: "muted",
      label: "Active Projects",
      value: data.totalProjects.toLocaleString(),
    },
    {
      icon: "group_add",
      badge: data.openJobs > 0 ? `${data.openJobs} open` : "None",
      badgeTone: data.openJobs > 0 ? "primary" : "muted",
      label: "Open Positions",
      value: data.openJobs.toLocaleString(),
    },
    {
      icon: "visibility",
      badge: `${data.totalBlogs} posts`,
      badgeTone: "primary",
      label: "Blog Entries",
      value: data.totalBlogs.toLocaleString(),
    },
  ] as const;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Committer&apos;s Dashboard</h2>
          <p>Overview of your software studio operations, client engagement, and recruitment pipeline.</p>
        </div>
        <Link className="admin-btn admin-btn--outline" to="/contact-queries">
          Export Inquiries
        </Link>
      </div>

      <div className="admin-stat-grid">
        {statCards.map((card) => (
          <article className="admin-stat-card" key={card.label}>
            <div className="admin-stat-card-top">
              <MaterialIcon name={card.icon} className="admin-stat-icon" />
              <span className={`admin-stat-badge admin-stat-badge--${card.badgeTone}`}>{card.badge}</span>
            </div>
            <p className="admin-stat-label">{card.label}</p>
            <h3>{card.value}</h3>
          </article>
        ))}
      </div>

      <div className="admin-bento-grid">
        <section className="admin-panel admin-panel--activity">
          <div className="admin-panel-header">
            <h4>Recent Activity</h4>
            <Link to="/contact-queries">View All</Link>
          </div>
          <div className="admin-activity-list">
            {data.activity.length ? (
              data.activity.map((item) => {
                const meta = activityIcon(item.type);
                return (
                  <div className="admin-activity-item" key={item.id}>
                    <div className={`admin-activity-icon admin-activity-icon--${meta.tone}`}>
                      <MaterialIcon name={meta.icon} filled />
                    </div>
                    <div className="admin-activity-copy">
                      <p>{item.title}</p>
                      <span>{item.subtitle}</span>
                    </div>
                    <span className="admin-activity-tag">{item.tag}</span>
                  </div>
                );
              })
            ) : (
              <p className="muted admin-panel-empty">No recent activity yet.</p>
            )}
          </div>
        </section>

        <div className="admin-bento-side">
          <section className="admin-panel admin-panel--quick">
            <h4>Quick Actions</h4>
            <Link className="admin-quick-action" to="/projects">
              <span>
                <MaterialIcon name="add_circle" />
                Add New Project
              </span>
              <MaterialIcon name="arrow_forward" />
            </Link>
            <Link className="admin-quick-action" to="/blogs">
              <span>
                <MaterialIcon name="edit_note" />
                Post Blog Entry
              </span>
              <MaterialIcon name="arrow_forward" />
            </Link>
          </section>

          <section className="admin-panel admin-panel--pipeline">
            <h4>Talent Pipeline</h4>
            <div className="admin-pipeline-list">
              {data.talentPipeline.length ? (
                data.talentPipeline.map((job) => (
                  <div className="admin-pipeline-item" key={job.id}>
                    <div className="admin-pipeline-row">
                      <span>{job.title}</span>
                      <strong>{job.applicantsLabel}</strong>
                    </div>
                    <div className="admin-pipeline-track">
                      <div className="admin-pipeline-fill" style={{ width: `${job.fillPercent}%` }} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="muted admin-panel-empty">No open positions configured.</p>
              )}
            </div>
            <Link className="admin-btn admin-btn--ghost admin-btn--full" to="/jobs">
              Manage Careers
            </Link>
          </section>
        </div>

        <section className="admin-panel admin-panel--chart">
          <div className="admin-panel-header">
            <div>
              <h4>Traffic &amp; Retention Insights</h4>
              <p>Studio content performance snapshot across your digital properties.</p>
            </div>
            <div className="admin-chart-legend">
              <span>
                <i className="admin-legend-dot admin-legend-dot--primary" /> CMS Content
              </span>
              <span>
                <i className="admin-legend-dot admin-legend-dot--secondary" /> Site Pages
              </span>
            </div>
          </div>
          <div className="admin-chart-bars">
            {TRAFFIC_BARS.map((height, index) => (
              <div
                key={index}
                className="admin-chart-bar"
                style={{ height: `${height}%`, opacity: 0.25 + height / 130 }}
              />
            ))}
            <div className="admin-chart-tooltip">Peak: {Math.max(...TRAFFIC_BARS)}% engagement</div>
          </div>
          <div className="admin-chart-axis">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </section>
      </div>

      <div className={`admin-toast${toastVisible ? " admin-toast--visible" : ""}`} role="status" aria-live="polite">
        <MaterialIcon name="info" className="admin-toast-icon" />
        <p>
          {data.unreadContactQueries} unread inquir{data.unreadContactQueries === 1 ? "y" : "ies"} waiting in Contact
          Queries.
        </p>
        <button type="button" aria-label="Dismiss notification" onClick={() => setToastVisible(false)}>
          <MaterialIcon name="close" />
        </button>
      </div>
    </div>
  );
}
