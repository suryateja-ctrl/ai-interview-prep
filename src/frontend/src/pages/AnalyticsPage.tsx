import { BarChart2, BookOpen, Target, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { UserRole } from "../backend";
import { Badge } from "../components/ui/AipsBadge";
import { EmptyState } from "../components/ui/EmptyState";
import { PageLoader } from "../components/ui/LoadingSpinner";
import { PageHeader } from "../components/ui/PageHeader";
import { ProgressBar } from "../components/ui/ProgressBar";
import {
  useGetProgressReport,
  useGetSkillGapAnalysis,
  useGetUserMockSessions,
} from "../lib/backendQueries";

// Shared Recharts tooltip style
const tooltipStyle = {
  background: "oklch(0.16 0.01 250)",
  border: "1px solid oklch(0.26 0.01 250)",
  borderRadius: "6px",
  color: "oklch(0.94 0.008 250)",
  fontSize: "12px",
};

const axisTickStyle = { fontSize: 10, fill: "oklch(0.56 0.006 250)" };
const gridStroke = "oklch(0.26 0.01 250)";

// Priority label helper
function priorityLabel(p: number): {
  label: string;
  variant: "destructive" | "warning" | "accent" | "muted";
} {
  if (p <= 1) return { label: "Critical", variant: "destructive" };
  if (p === 2) return { label: "High", variant: "warning" };
  if (p === 3) return { label: "Medium", variant: "accent" };
  return { label: "Low", variant: "muted" };
}

// Abbreviate role names for chart labels
function abbrevRole(role: string): string {
  const map: Record<string, string> = {
    FrontendDeveloper: "Frontend",
    BackendDeveloper: "Backend",
    FullStack: "Full Stack",
    DataAnalyst: "Data Analyst",
    DataScientist: "Data Sci.",
    ProductManager: "PM",
    DevOps: "DevOps",
  };
  return map[role] ?? role;
}

export function AnalyticsPage() {
  const { data: progress, isLoading } = useGetProgressReport();
  const { data: skillGap } = useGetSkillGapAnalysis();
  const { data: sessions } = useGetUserMockSessions();

  if (isLoading) return <PageLoader />;

  if (!progress) {
    return (
      <div className="flex flex-col h-full" data-ocid="analytics.page">
        <PageHeader
          title="Analytics"
          subtitle="Track your interview readiness and skill progression"
        />
        <div className="flex-1 flex items-center justify-center">
          <EmptyState
            icon={<BarChart2 size={24} />}
            title="No analytics data yet"
            description="Complete some mock interviews and study topics to see your progress here."
          />
        </div>
      </div>
    );
  }

  const readiness = Number(progress.readinessScore);
  const avgScore = Number(progress.averageScore);
  const sessionsCount = Number(progress.mockSessionsCompleted);
  const topicsCompleted = Number(progress.topicsCompleted);
  const topicsTotal = Number(progress.topicsTotal);

  // Score trend chart data
  const trendData = progress.scoreTrends.slice(-10).map((t, i) => ({
    label: `S${i + 1}`,
    score: Number(t.score),
  }));

  // Radar chart from skill gap weak skills
  const radarData =
    skillGap?.weakSkills.slice(0, 6).map((s) => ({
      skill: s.skill.length > 14 ? `${s.skill.slice(0, 14)}…` : s.skill,
      Current: Number(s.currentLevel),
      Target: Number(s.targetLevel),
    })) ?? [];

  // Bar chart: sessions completed per role
  const roleCountMap: Record<string, number> = {};
  for (const role of Object.values(UserRole)) {
    roleCountMap[abbrevRole(role)] = 0;
  }
  if (sessions) {
    for (const s of sessions) {
      const label = abbrevRole(s.role);
      roleCountMap[label] = (roleCountMap[label] ?? 0) + 1;
    }
  }
  const studyProgressData = Object.entries(roleCountMap)
    .filter(([, count]) => count > 0)
    .map(([role, count]) => ({ role, Sessions: count }));

  // Use static role distribution if no sessions yet (demo friendliness)
  const barData =
    studyProgressData.length > 0
      ? studyProgressData
      : [
          { role: "Frontend", Sessions: 3 },
          { role: "Backend", Sessions: 2 },
          { role: "Full Stack", Sessions: 1 },
        ];

  return (
    <div className="flex flex-col h-full" data-ocid="analytics.page">
      <PageHeader
        title="Analytics"
        subtitle="Track your interview readiness and skill progression"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Overview Stats */}
        <section data-ocid="analytics.overview_section">
          <h2 className="stat-label mb-3">Overview</h2>
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            data-ocid="analytics.stats"
          >
            {/* Readiness Score */}
            <div
              className="card-data p-5 glow-accent"
              data-ocid="analytics.stat.readiness"
            >
              <p className="stat-label mb-2">Readiness Score</p>
              <p className="stat-value text-accent">{readiness}%</p>
              <ProgressBar value={readiness} size="sm" className="mt-3" />
            </div>
            {/* Mock Sessions */}
            <div className="card-data p-5" data-ocid="analytics.stat.sessions">
              <p className="stat-label mb-2">Sessions Completed</p>
              <p className="stat-value">{sessionsCount}</p>
              <p className="text-micro mt-1">Mock interviews done</p>
            </div>
            {/* Average Score */}
            <div className="card-data p-5" data-ocid="analytics.stat.avg_score">
              <p className="stat-label mb-2">Average Score</p>
              <p className="stat-value">{avgScore > 0 ? `${avgScore}` : "—"}</p>
              <p className="text-micro mt-1">Points per session</p>
            </div>
            {/* Topics Completed */}
            <div className="card-data p-5" data-ocid="analytics.stat.topics">
              <p className="stat-label mb-2">Topics Completed</p>
              <p className="stat-value">
                {topicsCompleted}
                {topicsTotal > 0 && (
                  <span className="text-base font-normal text-muted-foreground">
                    /{topicsTotal}
                  </span>
                )}
              </p>
              {topicsTotal > 0 && (
                <ProgressBar
                  value={topicsCompleted}
                  max={topicsTotal}
                  size="sm"
                  className="mt-3"
                />
              )}
            </div>
          </div>
        </section>

        {/* Score Trends + Skill Radar */}
        <section
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
          data-ocid="analytics.charts_section"
        >
          {/* Score Trends LineChart */}
          <div
            className="card-data p-5"
            data-ocid="analytics.chart.score_trend"
          >
            <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
              <TrendingUp size={14} className="text-accent" />
              Score Trends
            </h3>
            {trendData.length === 0 ? (
              <div
                className="h-44 flex items-center justify-center text-muted-foreground text-sm"
                data-ocid="analytics.chart.score_trend.empty_state"
              >
                Complete sessions to see score trends
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={trendData}
                  margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                  <XAxis dataKey="label" tick={axisTickStyle} />
                  <YAxis domain={[0, 100]} tick={axisTickStyle} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend
                    wrapperStyle={{
                      fontSize: "11px",
                      color: "oklch(0.56 0.006 250)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Readiness Score"
                    stroke="oklch(0.72 0.18 185)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.72 0.18 185)", r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Skill Gap RadarChart */}
          <div
            className="card-data p-5"
            data-ocid="analytics.chart.skill_radar"
          >
            <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
              <Target size={14} className="text-accent" />
              Skill Gap Analysis
            </h3>
            {radarData.length === 0 ? (
              <div
                className="h-44 flex items-center justify-center text-muted-foreground text-sm"
                data-ocid="analytics.chart.skill_radar.empty_state"
              >
                Complete mock interviews to see skill breakdown
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart
                  data={radarData}
                  margin={{ top: 4, right: 20, left: 20, bottom: 4 }}
                >
                  <PolarGrid stroke={gridStroke} />
                  <PolarAngleAxis dataKey="skill" tick={axisTickStyle} />
                  <Radar
                    name="Current"
                    dataKey="Current"
                    stroke="oklch(0.72 0.18 185)"
                    fill="oklch(0.72 0.18 185)"
                    fillOpacity={0.25}
                  />
                  <Radar
                    name="Target"
                    dataKey="Target"
                    stroke="oklch(0.52 0.16 250)"
                    fill="oklch(0.52 0.16 250)"
                    fillOpacity={0.12}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend
                    wrapperStyle={{
                      fontSize: "11px",
                      color: "oklch(0.56 0.006 250)",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        {/* Study Progress BarChart */}
        <section data-ocid="analytics.study_progress_section">
          <div
            className="card-data p-5"
            data-ocid="analytics.chart.study_progress"
          >
            <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
              <BookOpen size={14} className="text-accent" />
              Study Progress by Role
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={barData}
                margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="role" tick={axisTickStyle} />
                <YAxis allowDecimals={false} tick={axisTickStyle} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                  wrapperStyle={{
                    fontSize: "11px",
                    color: "oklch(0.56 0.006 250)",
                  }}
                />
                <Bar
                  dataKey="Sessions"
                  name="Sessions Completed"
                  fill="oklch(0.52 0.16 250)"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Skill Gap – Weak Skills List */}
        {skillGap && skillGap.weakSkills.length > 0 && (
          <section data-ocid="analytics.weak_skills_section">
            <div className="card-data p-5" data-ocid="analytics.weak_skills">
              <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
                <Target size={14} className="text-destructive" />
                Skills to Improve
              </h3>
              <div className="space-y-3">
                {skillGap.weakSkills.slice(0, 6).map((entry, i) => {
                  const { label, variant } = priorityLabel(
                    Number(entry.priority),
                  );
                  const pct = Math.min(
                    100,
                    Math.round(
                      (Number(entry.currentLevel) /
                        Math.max(1, Number(entry.targetLevel))) *
                        100,
                    ),
                  );
                  return (
                    <div
                      key={entry.skill}
                      className="flex items-center gap-4 p-3 rounded-md bg-muted/20 border border-border"
                      data-ocid={`analytics.weak_skill.item.${i + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-sm font-medium text-foreground truncate">
                            {entry.skill}
                          </p>
                          <Badge
                            variant={variant}
                            className="ml-2 flex-shrink-0"
                          >
                            {label}
                          </Badge>
                        </div>
                        <ProgressBar value={pct} size="sm" variant="default" />
                        <p className="text-micro mt-1">
                          Level {Number(entry.currentLevel)} →{" "}
                          {Number(entry.targetLevel)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Personalized Study Plan */}
        {skillGap && skillGap.studyPlan.length > 0 && (
          <section data-ocid="analytics.study_plan_section">
            <div className="card-data p-5" data-ocid="analytics.study_plan">
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">
                Personalized Study Plan
              </h3>
              <div className="space-y-3">
                {skillGap.studyPlan.slice(0, 6).map((item, i) => (
                  <div
                    key={item.skill}
                    className="flex items-center gap-4 p-3 rounded-md bg-muted/20 border border-border"
                    data-ocid={`analytics.study_plan.item.${i + 1}`}
                  >
                    <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-accent">
                        {Number(item.priority)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {item.skill}
                      </p>
                      <p className="text-micro">
                        {Number(item.estimatedHours)}h estimated ·{" "}
                        {item.topicIds.length} topic
                        {item.topicIds.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills Acquired */}
        {progress.skillsAcquired.length > 0 && (
          <section data-ocid="analytics.skills_acquired_section">
            <div
              className="card-data p-5"
              data-ocid="analytics.skills_acquired"
            >
              <h3 className="font-display font-semibold text-sm text-foreground mb-3">
                Skills Acquired
              </h3>
              <div className="flex flex-wrap gap-2">
                {progress.skillsAcquired.map((skill) => (
                  <Badge key={skill} variant="success">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
