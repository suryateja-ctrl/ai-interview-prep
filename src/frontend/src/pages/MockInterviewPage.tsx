import { useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock,
  RotateCcw,
  Send,
  Star,
  Trophy,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Difficulty, UserRole } from "../backend";
import type {
  AnswerSubmitResult,
  MockSession,
  SessionStartResult,
} from "../backend";
import { Badge } from "../components/ui/AipsBadge";
import { Button } from "../components/ui/AipsButton";
import { PageLoader } from "../components/ui/LoadingSpinner";
import { PageHeader } from "../components/ui/PageHeader";
import { ProgressBar } from "../components/ui/ProgressBar";
import {
  useGetProfile,
  useGetUserMockSessions,
  useStartMockSession,
  useSubmitAnswer,
} from "../lib/backendQueries";

const ROLE_OPTIONS: { value: UserRole; label: string; icon: string }[] = [
  { value: UserRole.FrontendDeveloper, label: "Frontend Developer", icon: "⚛️" },
  { value: UserRole.BackendDeveloper, label: "Backend Developer", icon: "🖥️" },
  { value: UserRole.FullStack, label: "Full Stack", icon: "🔀" },
  { value: UserRole.DataAnalyst, label: "Data Analyst", icon: "📊" },
  { value: UserRole.DataScientist, label: "Data Scientist", icon: "🧬" },
  { value: UserRole.ProductManager, label: "Product Manager", icon: "🗂️" },
  { value: UserRole.DevOps, label: "DevOps Engineer", icon: "⚙️" },
];

const DIFFICULTY_OPTIONS: {
  value: Difficulty;
  label: string;
  desc: string;
  color: string;
}[] = [
  {
    value: Difficulty.Easy,
    label: "Easy",
    desc: "Beginner-friendly",
    color: "text-emerald-400",
  },
  {
    value: Difficulty.Medium,
    label: "Medium",
    desc: "Standard difficulty",
    color: "text-amber-400",
  },
  {
    value: Difficulty.Hard,
    label: "Hard",
    desc: "Senior-level",
    color: "text-destructive",
  },
];

const TOTAL_QUESTIONS = 5;

type Phase = "setup" | "active" | "complete";

interface TurnState {
  question: string;
  answer: string;
  feedback: string;
  score: number;
  questionIndex: number;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts / BigInt(1_000_000))).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ScoreRing({ score }: { score: number }) {
  const color =
    score >= 80
      ? "text-emerald-400"
      : score >= 60
        ? "text-amber-400"
        : "text-destructive";
  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg
        className="w-full h-full -rotate-90"
        viewBox="0 0 36 36"
        aria-label={`Score: ${score} out of 100`}
        role="img"
      >
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          className="stroke-muted"
          strokeWidth="2.5"
        />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          className={
            score >= 80
              ? "stroke-emerald-400"
              : score >= 60
                ? "stroke-amber-400"
                : "stroke-destructive"
          }
          strokeWidth="2.5"
          strokeDasharray={`${score} 100`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-display font-bold ${color}`}>
          {score}
        </span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

function PastSessionCard({ session }: { session: MockSession }) {
  const score = Number(session.totalScore);
  const turns = session.turns.length;
  const roleLabel =
    ROLE_OPTIONS.find((r) => r.value === session.role)?.label ?? session.role;
  const diffColor =
    session.difficulty === Difficulty.Easy
      ? "success"
      : session.difficulty === Difficulty.Hard
        ? "destructive"
        : "warning";

  return (
    <div className="card-data p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
        <Bot size={18} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {roleLabel}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <Clock size={11} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {formatDate(session.startedAt)}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">
            {turns} questions
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Badge variant={diffColor as "success" | "warning" | "destructive"}>
          {session.difficulty}
        </Badge>
        <span
          className={`text-sm font-bold font-display ${score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-destructive"}`}
        >
          {score}
        </span>
      </div>
    </div>
  );
}

export function MockInterviewPage() {
  const navigate = useNavigate();
  const { data: profile } = useGetProfile();
  const { data: pastSessions, isLoading: sessionsLoading } =
    useGetUserMockSessions();
  const startSession = useStartMockSession();
  const submitAnswer = useSubmitAnswer();

  const [phase, setPhase] = useState<Phase>("setup");
  const [role, setRole] = useState<UserRole>(
    profile?.role ?? UserRole.FrontendDeveloper,
  );
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [sessionResult, setSessionResult] = useState<SessionStartResult | null>(
    null,
  );
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [answer, setAnswer] = useState("");
  const [turns, setTurns] = useState<TurnState[]>([]);
  const [, setLastResult] = useState<AnswerSubmitResult | null>(null);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [pendingFeedback, setPendingFeedback] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (phase === "active") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [phase]);

  useEffect(() => {
    if (profile?.role) setRole(profile.role);
  }, [profile?.role]);

  async function handleStart() {
    try {
      const result = await startSession.mutateAsync({ role, difficulty });
      setSessionResult(result);
      setCurrentQuestion(result.firstQuestion.question);
      setQuestionIndex(0);
      setPhase("active");
      setTimeout(() => textareaRef.current?.focus(), 100);
    } catch {
      // error surfaced via isPending/isError
    }
  }

  async function handleSubmit() {
    if (!sessionResult || !answer.trim() || submitAnswer.isPending) return;
    const submittedAnswer = answer;
    const submittedQuestion = currentQuestion;
    const submittedIndex = questionIndex;
    setAnswer("");
    setPendingFeedback(true);
    try {
      const result = await submitAnswer.mutateAsync({
        sessionId: sessionResult.sessionId,
        answer: submittedAnswer,
      });
      setTurns((prev) => [
        ...prev,
        {
          question: submittedQuestion,
          answer: submittedAnswer,
          feedback: result.feedback,
          score: Number(result.score),
          questionIndex: submittedIndex,
        },
      ]);
      setLastResult(result);
      setPendingFeedback(false);
      if (result.sessionComplete) {
        setFinalScore(result.finalScore ? Number(result.finalScore) : null);
        setPhase("complete");
      } else if (result.nextQuestion) {
        setCurrentQuestion(result.nextQuestion.question);
        setQuestionIndex((i) => i + 1);
        setTimeout(() => textareaRef.current?.focus(), 100);
      }
    } catch {
      setPendingFeedback(false);
    }
  }

  function handleReset() {
    setPhase("setup");
    setSessionResult(null);
    setCurrentQuestion("");
    setAnswer("");
    setTurns([]);
    setLastResult(null);
    setFinalScore(null);
    setQuestionIndex(0);
    setPendingFeedback(false);
  }

  if (sessionsLoading && phase === "setup") {
    return <PageLoader />;
  }

  const completedSessions = pastSessions?.filter((s) => s.isComplete) ?? [];
  const totalQ = TOTAL_QUESTIONS;
  const answeredCount = turns.length;
  const progressPct = Math.round((answeredCount / totalQ) * 100);

  // Performance breakdown for complete phase
  const avgScore =
    turns.length > 0
      ? Math.round(turns.reduce((s, t) => s + t.score, 0) / turns.length)
      : 0;
  const strongTurns = turns.filter((t) => t.score >= 80);
  const weakTurns = turns.filter((t) => t.score < 60);

  return (
    <div className="flex flex-col h-full" data-ocid="mock_interview.page">
      <PageHeader
        title="Mock Interview"
        subtitle="Simulate a real interview — AI asks questions and evaluates your responses"
        actions={
          phase !== "setup" ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              data-ocid="mock_interview.reset_button"
            >
              <RotateCcw size={14} />
              New Session
            </Button>
          ) : undefined
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        {/* ── Setup Phase ── */}
        {phase === "setup" && (
          <div
            className="max-w-2xl space-y-5"
            data-ocid="mock_interview.setup.panel"
          >
            {/* Role Selector */}
            <div className="card-data p-5">
              <h3 className="font-display font-semibold text-sm text-foreground mb-3">
                Select Your Role
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {ROLE_OPTIONS.map(({ value, label, icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className={`px-3 py-2.5 rounded-md border text-sm font-medium text-left transition-smooth flex items-center gap-2 ${
                      role === value
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-border/60"
                    }`}
                    data-ocid={`mock_interview.role.${value.toLowerCase()}`}
                  >
                    <span className="text-base leading-none">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="card-data p-5">
              <h3 className="font-display font-semibold text-sm text-foreground mb-3">
                Difficulty Level
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {DIFFICULTY_OPTIONS.map(({ value, label, desc, color }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setDifficulty(value)}
                    className={`px-3 py-3.5 rounded-md border text-left transition-smooth ${
                      difficulty === value
                        ? "border-accent bg-accent/10"
                        : "border-border bg-background hover:border-border/60"
                    }`}
                    data-ocid={`mock_interview.difficulty.${value.toLowerCase()}`}
                  >
                    <p
                      className={`text-sm font-semibold ${difficulty === value ? "text-accent" : color}`}
                    >
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Session Summary */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-muted/30 border border-border text-sm text-muted-foreground">
              <Bot size={16} className="text-accent flex-shrink-0" />
              <span>
                You&apos;ll be asked{" "}
                <strong className="text-foreground">{totalQ} questions</strong>{" "}
                and receive AI feedback after each answer.
              </span>
            </div>

            <Button
              variant="accent"
              className="w-full h-11"
              onClick={handleStart}
              disabled={startSession.isPending}
              data-ocid="mock_interview.start_button"
            >
              {startSession.isPending ? (
                "Preparing your interview..."
              ) : (
                <>
                  Start Interview
                  <ChevronRight size={16} />
                </>
              )}
            </Button>

            {/* Past Sessions */}
            {completedSessions.length > 0 && (
              <div data-ocid="mock_interview.past_sessions.section">
                <h3 className="font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                  <Clock size={14} className="text-muted-foreground" />
                  Past Sessions
                </h3>
                <div className="space-y-2">
                  {completedSessions.slice(0, 5).map((s, i) => (
                    <div
                      key={s.id.toString()}
                      data-ocid={`mock_interview.past_session.${i + 1}`}
                    >
                      <PastSessionCard session={s} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {completedSessions.length === 0 && pastSessions !== undefined && (
              <div
                className="text-center py-8 text-muted-foreground text-sm"
                data-ocid="mock_interview.past_sessions.empty_state"
              >
                <Bot size={28} className="mx-auto mb-2 opacity-30" />
                No sessions yet — start your first mock interview above.
              </div>
            )}
          </div>
        )}

        {/* ── Active Interview Phase ── */}
        {phase === "active" && (
          <div
            className="max-w-3xl flex flex-col gap-4"
            data-ocid="mock_interview.active.panel"
          >
            {/* Progress Bar */}
            <div className="card-data px-4 py-3 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">
                    Question{" "}
                    <strong className="text-foreground">
                      {answeredCount + 1}
                    </strong>{" "}
                    of {totalQ}
                  </span>
                  <Badge variant="accent">{difficulty}</Badge>
                </div>
                <ProgressBar value={progressPct} />
              </div>
            </div>

            {/* Conversation Turns */}
            {turns.map((turn, i) => (
              <div
                key={`turn-q${turn.questionIndex}`}
                className="space-y-2"
                data-ocid={`mock_interview.turn.${i + 1}`}
              >
                {/* AI Question */}
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={15} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1 font-medium">
                      Q{turn.questionIndex + 1} · AI Interviewer
                    </p>
                    <div className="card-data p-3 border-primary/20 bg-card">
                      <p className="text-sm text-foreground leading-relaxed">
                        {turn.question}
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Answer */}
                <div className="flex gap-3 items-start justify-end pl-10">
                  <div className="flex-1 min-w-0 max-w-lg">
                    <p className="text-xs text-muted-foreground mb-1 font-medium text-right">
                      Your Answer
                    </p>
                    <div className="rounded-lg bg-accent/10 border border-accent/20 p-3">
                      <p className="text-sm text-foreground leading-relaxed">
                        {turn.answer}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <User size={15} className="text-accent" />
                  </div>
                </div>

                {/* AI Feedback */}
                <div className="ml-11 rounded-md bg-muted/40 border border-border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      AI Feedback
                    </span>
                    <Badge
                      variant={
                        turn.score >= 80
                          ? "success"
                          : turn.score >= 60
                            ? "warning"
                            : "destructive"
                      }
                    >
                      Score: {turn.score}/100
                    </Badge>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed">
                    {turn.feedback}
                  </p>
                </div>
              </div>
            ))}

            {/* Pending Feedback Indicator */}
            {pendingFeedback && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot size={15} className="text-primary" />
                </div>
                <div className="card-data p-3 border-primary/20">
                  <div className="flex gap-1 items-center">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Current Question */}
            {!pendingFeedback && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot size={15} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">
                    Q{questionIndex + 1} · AI Interviewer
                  </p>
                  <div className="card-data p-4 border-primary/30 bg-card">
                    <p className="text-sm text-foreground leading-relaxed font-medium">
                      {currentQuestion}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Answer Input */}
            {!pendingFeedback && (
              <div className="pl-11" data-ocid="mock_interview.answer.section">
                <textarea
                  ref={textareaRef}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here... (Ctrl+Enter to submit)"
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-md border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-smooth"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) handleSubmit();
                  }}
                  data-ocid="mock_interview.answer_textarea"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-micro">
                    {answer.length} characters · Ctrl+Enter to submit
                  </p>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={handleSubmit}
                    disabled={!answer.trim() || submitAnswer.isPending}
                    data-ocid="mock_interview.submit_answer_button"
                  >
                    Submit Answer
                    <Send size={13} />
                  </Button>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}

        {/* ── Complete Phase ── */}
        {phase === "complete" && (
          <div
            className="max-w-2xl space-y-5"
            data-ocid="mock_interview.complete.panel"
          >
            {/* Score Hero Card */}
            <div className="card-data p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                <Trophy size={22} className="text-accent" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                Interview Complete!
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {ROLE_OPTIONS.find((r) => r.value === role)?.label} ·{" "}
                {difficulty}
              </p>

              {finalScore !== null && (
                <>
                  <ScoreRing score={finalScore} />
                  <p className="text-sm text-muted-foreground mt-3">
                    {finalScore >= 80
                      ? "Outstanding performance! You're interview-ready."
                      : finalScore >= 60
                        ? "Good effort! Review weak areas before your interview."
                        : "Keep practicing — focus on the feedback below."}
                  </p>
                </>
              )}

              <div className="flex gap-3 justify-center mt-6">
                <Button
                  variant="accent"
                  onClick={handleReset}
                  data-ocid="mock_interview.complete.try_again_button"
                >
                  <RotateCcw size={15} />
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate({ to: "/analytics" })}
                  data-ocid="mock_interview.complete.analytics_button"
                >
                  <BarChart2 size={15} />
                  Go to Analytics
                </Button>
              </div>
            </div>

            {/* Performance Breakdown */}
            <div
              className="card-data p-5"
              data-ocid="mock_interview.complete.breakdown.card"
            >
              <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
                <Star size={14} className="text-accent" />
                Performance Breakdown
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="stat-value">{avgScore}</p>
                  <p className="stat-label">Avg Score</p>
                </div>
                <div className="text-center">
                  <p className="stat-value text-emerald-400">
                    {strongTurns.length}
                  </p>
                  <p className="stat-label">Strong</p>
                </div>
                <div className="text-center">
                  <p className="stat-value text-destructive">
                    {weakTurns.length}
                  </p>
                  <p className="stat-label">Needs Work</p>
                </div>
              </div>
              <div className="space-y-2">
                {turns.map((turn, i) => (
                  <div
                    key={`breakdown-q${turn.questionIndex}`}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xs text-muted-foreground w-5 text-right flex-shrink-0">
                      Q{i + 1}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-smooth ${
                          turn.score >= 80
                            ? "bg-emerald-400"
                            : turn.score >= 60
                              ? "bg-amber-400"
                              : "bg-destructive"
                        }`}
                        style={{ width: `${turn.score}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium w-8 flex-shrink-0 ${
                        turn.score >= 80
                          ? "text-emerald-400"
                          : turn.score >= 60
                            ? "text-amber-400"
                            : "text-destructive"
                      }`}
                    >
                      {turn.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Summary */}
            <div data-ocid="mock_interview.complete.feedback.section">
              <h3 className="font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-accent" />
                Detailed Feedback
              </h3>
              <div className="space-y-3">
                {turns.map((turn, i) => (
                  <div
                    key={`review-q${turn.questionIndex}`}
                    className="card-data p-4 space-y-2"
                    data-ocid={`mock_interview.review.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <span className="text-xs font-semibold text-muted-foreground mt-0.5 flex-shrink-0">
                          Q{i + 1}
                        </span>
                        <p className="text-sm font-medium text-foreground leading-snug truncate">
                          {turn.question}
                        </p>
                      </div>
                      <Badge
                        className="flex-shrink-0"
                        variant={
                          turn.score >= 80
                            ? "success"
                            : turn.score >= 60
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {turn.score}/100
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {turn.feedback}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
