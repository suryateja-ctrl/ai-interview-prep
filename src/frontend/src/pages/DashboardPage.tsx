import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  FileText,
  MessageSquare,
  Mic,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  Cell,
  Line,
  LineChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../components/ui/AipsBadge";
import { Button } from "../components/ui/AipsButton";
import { PageLoader } from "../components/ui/LoadingSpinner";
import { PageHeader } from "../components/ui/PageHeader";
import { ProgressBar } from "../components/ui/ProgressBar";
import {
  useGetProfile,
  useGetProgressReport,
  useGetSkillGapAnalysis,
  useGetUserMockSessions,
} from "../lib/backendQueries";

const QUICK_ACTIONS = [
  {
    to: "/resume",
    icon: FileText,
    label: "Build Resume",
    description: "Generate ATS-optimized resume",
    color: "text-chart-1",
    bg: "bg-chart-1/10 border-chart-1/20",
    hoverBg: "group-hover:bg-chart-1/20",
  },
  {
    to: "/interview",
    icon: MessageSquare,
    label: "Practice Q&A",
    description: "Role-specific questions",
    color: "text-chart-2",
    bg: "bg-chart-2/10 border-chart-2/20",
    hoverBg: "group-hover:bg-chart-2/20",
  },
  {
    to: "/mock-interview",
    icon: Mic,
    label: "Mock Interview",
    description: "Simulate real session",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
    hoverBg: "group-hover:bg-accent/20",
  },
  {
    to: "/study",
    icon: BookOpen,
    label: "Study Topics",
    description: "Curated learning paths",
    color: "text-chart-3",
    bg: "bg-chart-3/10 border-chart-3/20",
    hoverBg: "group-hover:bg-chart-3/20",
  },
];

const PRIORITY_LABELS: Record<string, string> = {
  "1": "Critical",
  "2": "High",
  "3": "Medium",
};

const PRIORITY_VARIANTS: Record<
  string,
  "destructive" | "warning" | "secondary"
> = {
  "1": "destructive",
  "2": "warning",
  "3": "secondary",
};

function ReadinessGauge({ score }: { score: number }) {
  const data = [{ name: "score", value: score, fill: "var(--color-accent)" }];
  return (
    <div className="relative flex flex-col items-center justify-center">
      <ResponsiveContainer width={180} height={100}>
        <RadialBarChart
          cx="50%"
          cy="100%"
          innerRadius={70}
          outerRadius={95}
          startAngle={180}
          endAngle={0}
          data={data}
        >
          {/* Background track */}
          <RadialBar
            dataKey="value"
            cornerRadius={8}
            background={{ fill: "oklch(var(--muted))" }}
          >
            <Cell fill="oklch(var(--accent))" />
          </RadialBar>
        </RadialBarChart>
      </ResponsiveContainer>
      {/* Center label */}
      <div className="absolute bottom-0 flex flex-col items-center gap-0.5">
        <span className="text-3xl font-bold font-display text-foreground leading-none">
          {score}
        </span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

function ScoreTrendChart({
  trends,
}: {
  trends: Array<{ score: bigint; completedAt: bigint; sessionId: bigint }>;
}) {
  if (trends.length < 2) return null;

  const data = trends.slice(-8).map((t, i) => ({
    name: `S${i + 1}`,
    score: Number(t.score),
  }));

  return (
    <ResponsiveContainer width="100%" height={80}>
      <LineChart
        data={data}
        margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
      >
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: "oklch(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: "oklch(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "oklch(var(--card))",
            border: "1px solid oklch(var(--border))",
            borderRadius: "6px",
            fontSize: 12,
            color: "oklch(var(--foreground))",
          }}
          cursor={{ stroke: "oklch(var(--border))" }}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="oklch(var(--accent))"
          strokeWidth={2}
          dot={{ r: 3, fill: "oklch(var(--accent))", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DashboardPage() {
  const { isAuthenticated, login } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: progress, isLoading: progressLoading } = useGetProgressReport();
  const { data: sessions } = useGetUserMockSessions();
  const { data: skillGap, isLoading: skillGapLoading } =
    useGetSkillGapAnalysis();

  if (!isAuthenticated) {
    return (
      <div
        className="flex-1 flex items-center justify-center min-h-[60vh] flex-col gap-4"
        data-ocid="dashboard.page"
      >
        <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-2">
          <Zap size={24} className="text-accent" />
        </div>
        <p className="text-foreground font-semibold text-lg">
          Your Interview Command Center
        </p>
        <p className="text-muted-foreground text-sm max-w-xs text-center">
          Sign in to track your readiness, practice interviews, and close skill
          gaps.
        </p>
        <Button
          variant="accent"
          onClick={login}
          data-ocid="dashboard.login_button"
          className="mt-2"
        >
          Sign In with Internet Identity
          <ArrowRight size={14} />
        </Button>
      </div>
    );
  }

  if (profileLoading || progressLoading) return <PageLoader />;

  const readinessScore = progress ? Number(progress.readinessScore) : 0;
  const completedSessions = progress
    ? Number(progress.mockSessionsCompleted)
    : 0;
  const avgScore = progress ? Number(progress.averageScore) : 0;
  const topicsCompleted = progress ? Number(progress.topicsCompleted) : 0;
  const topicsTotal = progress ? Number(progress.topicsTotal) : 0;
  const skillsAcquired = progress?.skillsAcquired ?? [];
  const scoreTrends = progress?.scoreTrends ?? [];

  const weakSkills = skillGap?.weakSkills ?? [];
  const studyPlan = skillGap?.studyPlan ?? [];

  const greeting = profile?.name
    ? `Welcome back, ${profile.name}`
    : "Welcome to AIPS";
  const subtext = profile?.targetJobTitle
    ? `Preparing for: ${profile.targetJobTitle} · ${profile.role}`
    : "Let's start preparing for your next interview.";

  const readinessLabel =
    readinessScore >= 80
      ? "Interview Ready"
      : readinessScore >= 60
        ? "Good Progress"
        : readinessScore >= 30
          ? "Building Skills"
          : "Just Starting";

  return (
    <div className="flex flex-col h-full" data-ocid="dashboard.page">
      <PageHeader
        title={greeting}
        subtitle={subtext}
        actions={
          <Button
            variant="accent"
            size="sm"
            onClick={() => navigate({ to: "/mock-interview" })}
            data-ocid="dashboard.start_mock_button"
          >
            Start Mock Interview
            <ArrowRight size={14} />
          </Button>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Onboarding Prompt */}
        {profile && !profile.onboardingComplete && (
          <div
            className="card-data p-4 border-accent/30 bg-accent/5 flex items-start gap-4"
            data-ocid="dashboard.onboarding_prompt"
          >
            <div className="w-9 h-9 rounded-md bg-accent/15 flex items-center justify-center flex-shrink-0">
              <Target size={16} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground mb-0.5">
                Complete your profile
              </p>
              <p className="text-micro">
                Set your target role to unlock personalized recommendations.
              </p>
            </div>
            <Button
              variant="accent"
              size="sm"
              onClick={() => navigate({ to: "/profile" })}
              data-ocid="dashboard.complete_profile_button"
            >
              Complete
            </Button>
          </div>
        )}

        {/* Top row: Readiness gauge + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Readiness Gauge */}
          <div
            className="card-data p-5 flex flex-col items-center justify-center gap-3"
            data-ocid="dashboard.stat.readiness"
          >
            <p className="stat-label">Readiness Score</p>
            <ReadinessGauge score={readinessScore} />
            <div className="text-center mt-1">
              <Badge
                variant={
                  readinessScore >= 80
                    ? "success"
                    : readinessScore >= 60
                      ? "default"
                      : "warning"
                }
              >
                {readinessLabel}
              </Badge>
            </div>
          </div>

          {/* Score Trend */}
          <div
            className="card-data p-5 flex flex-col gap-2"
            data-ocid="dashboard.stat.trend"
          >
            <div className="flex items-center justify-between">
              <p className="stat-label">Score Trend</p>
              <TrendingUp size={14} className="text-muted-foreground" />
            </div>
            {scoreTrends.length >= 2 ? (
              <ScoreTrendChart trends={scoreTrends} />
            ) : (
              <div className="flex-1 flex items-center justify-center py-6">
                <p className="text-micro text-center">
                  Complete more sessions to see your trend
                </p>
              </div>
            )}
          </div>

          {/* Stats summary */}
          <div className="grid grid-rows-3 gap-3">
            <div
              className="card-data p-4 flex items-center gap-3"
              data-ocid="dashboard.stat.sessions"
            >
              <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Mic size={14} className="text-accent" />
              </div>
              <div>
                <p className="text-xl font-bold font-display text-foreground leading-none">
                  {completedSessions}
                </p>
                <p className="text-micro mt-0.5">Mock sessions done</p>
              </div>
            </div>
            <div
              className="card-data p-4 flex items-center gap-3"
              data-ocid="dashboard.stat.score"
            >
              <div className="w-8 h-8 rounded-md bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                <Target size={14} className="text-chart-2" />
              </div>
              <div>
                <p className="text-xl font-bold font-display text-foreground leading-none">
                  {avgScore > 0 ? avgScore : "—"}
                </p>
                <p className="text-micro mt-0.5">Average score</p>
              </div>
            </div>
            <div
              className="card-data p-4 flex items-center gap-3"
              data-ocid="dashboard.stat.topics"
            >
              <div className="w-8 h-8 rounded-md bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                <BookOpen size={14} className="text-chart-3" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xl font-bold font-display text-foreground leading-none">
                  {topicsCompleted}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{topicsTotal || "—"}
                  </span>
                </p>
                <p className="text-micro mt-0.5">Topics completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div data-ocid="dashboard.quick_actions">
          <h2 className="font-display font-semibold text-sm text-foreground mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {QUICK_ACTIONS.map(
              (
                { to, icon: Icon, label, description, color, bg, hoverBg },
                i,
              ) => (
                <Link
                  key={to}
                  to={to}
                  className="card-data p-4 flex flex-col gap-2 hover:border-accent/40 group cursor-pointer"
                  data-ocid={`dashboard.quick_action.${i + 1}`}
                >
                  <div
                    className={`w-9 h-9 rounded-md border flex items-center justify-center transition-smooth ${bg} ${hoverBg}`}
                  >
                    <Icon size={16} className={color} />
                  </div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-micro">{description}</p>
                </Link>
              ),
            )}
          </div>
        </div>

        {/* Bottom row: Skill Gap + Recent Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Skill Gap Analysis */}
          <div data-ocid="dashboard.skill_gap">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-semibold text-sm text-foreground">
                Skill Gap Analysis
              </h2>
              <Link
                to="/analytics"
                className="text-xs text-accent hover:underline"
                data-ocid="dashboard.view_full_analysis_link"
              >
                Full report
              </Link>
            </div>

            {skillGapLoading ? (
              <div
                className="card-data p-5 space-y-3"
                data-ocid="dashboard.skill_gap.loading_state"
              >
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="animate-pulse flex items-center gap-3"
                  >
                    <div className="h-3 bg-muted rounded w-24" />
                    <div className="flex-1 h-2 bg-muted rounded" />
                    <div className="h-5 bg-muted rounded w-14" />
                  </div>
                ))}
              </div>
            ) : weakSkills.length === 0 ? (
              <div
                className="card-data p-6 flex flex-col items-center text-center"
                data-ocid="dashboard.skill_gap.empty_state"
              >
                <div className="w-10 h-10 rounded-full bg-chart-3/10 flex items-center justify-center mb-3">
                  <Target size={16} className="text-chart-3" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  No gaps detected
                </p>
                <p className="text-micro">
                  Complete mock interviews to unlock skill analysis.
                </p>
              </div>
            ) : (
              <div className="card-data divide-y divide-border overflow-hidden">
                {weakSkills.slice(0, 5).map((skill, i) => {
                  const current = Number(skill.currentLevel);
                  const target = Number(skill.targetLevel);
                  const pct =
                    target > 0 ? Math.round((current / target) * 100) : 0;
                  const priorityStr = skill.priority.toString();
                  return (
                    <div
                      key={`${skill.skill}-${i}`}
                      className="p-3 flex items-center gap-3"
                      data-ocid={`dashboard.skill_gap.item.${i + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <p className="text-sm font-medium text-foreground truncate">
                            {skill.skill}
                          </p>
                          <Badge
                            variant={
                              PRIORITY_VARIANTS[priorityStr] ?? "secondary"
                            }
                            className="flex-shrink-0"
                          >
                            {PRIORITY_LABELS[priorityStr] ?? "Low"}
                          </Badge>
                        </div>
                        <ProgressBar
                          value={current}
                          max={target}
                          size="sm"
                          variant={pct < 40 ? "warning" : "accent"}
                        />
                        <p className="text-micro mt-1">
                          Level {current} / {target}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Skills Acquired */}
            {skillsAcquired.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {skillsAcquired.slice(0, 6).map((skill) => (
                  <span key={skill} className="badge-accent">
                    {skill}
                  </span>
                ))}
                {skillsAcquired.length > 6 && (
                  <span className="badge-accent">
                    +{skillsAcquired.length - 6} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Recent Sessions */}
          <div data-ocid="dashboard.recent_sessions">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-semibold text-sm text-foreground">
                Recent Sessions
              </h2>
              <Link
                to="/mock-interview"
                className="text-xs text-accent hover:underline"
                data-ocid="dashboard.view_all_sessions_link"
              >
                View all
              </Link>
            </div>

            {!sessions || sessions.length === 0 ? (
              <div
                className="card-data p-6 flex flex-col items-center text-center"
                data-ocid="dashboard.sessions.empty_state"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Mic size={16} className="text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  No sessions yet
                </p>
                <p className="text-micro mb-4">
                  Start your first mock interview to track your progress.
                </p>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => navigate({ to: "/mock-interview" })}
                  data-ocid="dashboard.sessions.start_button"
                >
                  Start a Session
                </Button>
              </div>
            ) : (
              <div className="card-data divide-y divide-border overflow-hidden">
                {sessions.slice(0, 5).map((s, i) => (
                  <div
                    key={s.id.toString()}
                    className="p-3 flex items-center justify-between gap-4"
                    data-ocid={`dashboard.sessions.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                        <Mic size={14} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {s.role} Interview
                        </p>
                        <p className="text-micro">{s.difficulty} difficulty</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {s.isComplete ? (
                        <Badge variant="success">
                          {Number(s.totalScore)} pts
                        </Badge>
                      ) : (
                        <Badge variant="warning">In Progress</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Study Plan from Skill Gap */}
        {studyPlan.length > 0 && (
          <div data-ocid="dashboard.study_plan">
            <h2 className="font-display font-semibold text-sm text-foreground mb-3">
              Personalized Study Plan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {studyPlan.slice(0, 3).map((item, i) => (
                <div
                  key={`${item.skill}-${i}`}
                  className="card-data p-4"
                  data-ocid={`dashboard.study_plan.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-semibold text-foreground">
                      {item.skill}
                    </p>
                    <span className="badge-primary flex-shrink-0">
                      #{Number(item.priority)}
                    </span>
                  </div>
                  <p className="text-micro">
                    Est. {Number(item.estimatedHours)}h to complete
                  </p>
                  <Link
                    to="/study"
                    className="mt-3 flex items-center gap-1 text-xs text-accent hover:underline"
                    data-ocid={`dashboard.study_plan.go.${i + 1}`}
                  >
                    Start studying <ArrowRight size={11} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
