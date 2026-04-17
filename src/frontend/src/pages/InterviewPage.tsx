import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Difficulty, QuestionType, UserRole } from "../backend";
import type { InterviewQuestion } from "../backend";
import { Badge } from "../components/ui/AipsBadge";
import { Button } from "../components/ui/AipsButton";
import { EmptyState } from "../components/ui/EmptyState";
import { PageLoader } from "../components/ui/LoadingSpinner";
import { PageHeader } from "../components/ui/PageHeader";
import { useGetInterviewQuestions, useGetProfile } from "../lib/backendQueries";

const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.FrontendDeveloper]: "Frontend Dev",
  [UserRole.BackendDeveloper]: "Backend Dev",
  [UserRole.FullStack]: "Full Stack",
  [UserRole.DataAnalyst]: "Data Analyst",
  [UserRole.DataScientist]: "Data Scientist",
  [UserRole.ProductManager]: "Product Manager",
  [UserRole.DevOps]: "DevOps",
};

const DIFFICULTY_VARIANTS: Record<
  Difficulty,
  "success" | "warning" | "destructive"
> = {
  [Difficulty.Easy]: "success",
  [Difficulty.Medium]: "warning",
  [Difficulty.Hard]: "destructive",
};

type DifficultyFilter = Difficulty | null;
type TypeFilter = QuestionType | null;

function FilterChip({
  active,
  onClick,
  ocid,
  children,
  accent = false,
}: {
  active: boolean;
  onClick: () => void;
  ocid: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${
        active
          ? accent
            ? "bg-accent/10 border border-accent/30 text-accent"
            : "bg-primary/10 border border-primary/30 text-primary"
          : "border border-border text-muted-foreground hover:text-foreground hover:border-border/80"
      }`}
      data-ocid={ocid}
    >
      {children}
    </button>
  );
}

function RubricGrid({ rubric }: { rubric: InterviewQuestion["rubric"] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="p-3 rounded-md bg-emerald-500/5 border border-emerald-500/15">
        <p className="text-xs font-semibold text-emerald-400 mb-1">Excellent</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {rubric.excellent}
        </p>
      </div>
      <div className="p-3 rounded-md bg-sky-500/5 border border-sky-500/15">
        <p className="text-xs font-semibold text-sky-400 mb-1">Good</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {rubric.good}
        </p>
      </div>
      <div className="p-3 rounded-md bg-amber-500/5 border border-amber-500/15">
        <p className="text-xs font-semibold text-amber-400 mb-1">Fair</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {rubric.fair}
        </p>
      </div>
      <div className="p-3 rounded-md bg-rose-500/5 border border-rose-500/15">
        <p className="text-xs font-semibold text-rose-400 mb-1">Poor</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {rubric.poor}
        </p>
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  index,
  isOpen,
  isPracticed,
  onToggle,
  onPractice,
}: {
  question: InterviewQuestion;
  index: number;
  isOpen: boolean;
  isPracticed: boolean;
  onToggle: () => void;
  onPractice: () => void;
}) {
  return (
    <div
      className={`card-data overflow-hidden transition-smooth ${isPracticed ? "border-accent/30" : ""}`}
      data-ocid={`interview.question.${index}`}
    >
      {/* Question header row */}
      <button
        type="button"
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-muted/20 transition-smooth"
        onClick={onToggle}
        data-ocid={`interview.question.toggle.${index}`}
      >
        <span className="text-xs font-mono text-muted-foreground pt-0.5 w-6 flex-shrink-0 select-none">
          {String(index).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground leading-snug">
            {question.question}
          </p>
          <div className="flex gap-2 mt-2 flex-wrap items-center">
            <Badge
              variant={
                question.questionType === QuestionType.Technical
                  ? "accent"
                  : "default"
              }
            >
              {question.questionType}
            </Badge>
            <Badge variant={DIFFICULTY_VARIANTS[question.difficulty]}>
              {question.difficulty}
            </Badge>
            {question.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="muted">
                {tag}
              </Badge>
            ))}
            {isPracticed && (
              <span className="inline-flex items-center gap-1 text-xs text-accent font-medium">
                <CheckCircle2 size={11} />
                Practiced
              </span>
            )}
          </div>
        </div>

        <span className="text-muted-foreground flex-shrink-0 mt-0.5">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {/* Expanded body */}
      {isOpen && (
        <div className="border-t border-border bg-muted/10 px-4 pt-4 pb-4 space-y-4">
          {/* Ideal answer */}
          <div>
            <p className="stat-label mb-2">Ideal Answer</p>
            <p className="text-sm text-foreground leading-relaxed">
              {question.idealAnswer}
            </p>
          </div>

          {/* Scoring rubric */}
          <div>
            <p className="stat-label mb-2">Scoring Rubric</p>
            <RubricGrid rubric={question.rubric} />
          </div>

          {/* Practice button */}
          <div className="flex justify-end pt-1">
            <Button
              variant={isPracticed ? "outline" : "accent"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onPractice();
              }}
              data-ocid={`interview.practice_button.${index}`}
            >
              {isPracticed ? (
                <>
                  <CheckCircle2 size={13} />
                  Mark as Unpracticed
                </>
              ) : (
                <>
                  <BookOpen size={13} />
                  Mark as Practiced
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function InterviewPage() {
  const { data: profile } = useGetProfile();

  const [selectedRole, setSelectedRole] = useState<UserRole>(
    profile?.role ?? UserRole.FrontendDeveloper,
  );
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>(null);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [practicedIds, setPracticedIds] = useState<Set<string>>(new Set());

  const {
    data: questions,
    isLoading,
    refetch,
  } = useGetInterviewQuestions(selectedRole, difficultyFilter);

  // Client-side question type filter (backend filters by difficulty, type is local)
  const filteredQuestions = useMemo(() => {
    if (!questions) return [];
    if (!typeFilter) return questions;
    return questions.filter((q) => q.questionType === typeFilter);
  }, [questions, typeFilter]);

  function togglePracticed(id: string) {
    setPracticedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const practicedCount = filteredQuestions.filter((q) =>
    practicedIds.has(q.id.toString()),
  ).length;

  const activeFilterLabel = [
    ROLE_LABELS[selectedRole],
    typeFilter ?? "All Types",
    difficultyFilter ?? "All Levels",
  ].join(" · ");

  return (
    <div className="flex flex-col h-full" data-ocid="interview.page">
      <PageHeader
        title="Interview Q&A"
        subtitle={
          isLoading
            ? "Loading questions…"
            : `${filteredQuestions.length} question${filteredQuestions.length !== 1 ? "s" : ""} · ${activeFilterLabel}`
        }
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            data-ocid="interview.refresh_button"
          >
            <RefreshCw size={14} />
            Refresh
          </Button>
        }
      />

      {/* Filter bar */}
      <div
        className="flex flex-wrap items-center gap-3 px-6 py-3 border-b border-border bg-card"
        data-ocid="interview.filter_bar"
      >
        {/* Role selector */}
        <div
          className="flex flex-wrap gap-1.5"
          data-ocid="interview.role_filter"
        >
          {(Object.values(UserRole) as UserRole[]).map((role) => (
            <FilterChip
              key={role}
              active={selectedRole === role}
              accent
              onClick={() => setSelectedRole(role)}
              ocid={`interview.role_filter.${role.toLowerCase()}`}
            >
              {ROLE_LABELS[role]}
            </FilterChip>
          ))}
        </div>

        <div className="h-4 w-px bg-border hidden sm:block" />

        {/* Question type filter */}
        <div className="flex gap-1.5" data-ocid="interview.type_filter">
          <FilterChip
            active={typeFilter === null}
            onClick={() => setTypeFilter(null)}
            ocid="interview.type_filter.all"
          >
            All Types
          </FilterChip>
          {(Object.values(QuestionType) as QuestionType[]).map((t) => (
            <FilterChip
              key={t}
              active={typeFilter === t}
              onClick={() => setTypeFilter(t)}
              ocid={`interview.type_filter.${t.toLowerCase()}`}
            >
              {t}
            </FilterChip>
          ))}
        </div>

        <div className="h-4 w-px bg-border hidden sm:block" />

        {/* Difficulty filter */}
        <div className="flex gap-1.5" data-ocid="interview.difficulty_filter">
          <FilterChip
            active={difficultyFilter === null}
            onClick={() => setDifficultyFilter(null)}
            ocid="interview.difficulty_filter.all"
          >
            All Levels
          </FilterChip>
          {(Object.values(Difficulty) as Difficulty[]).map((d) => (
            <FilterChip
              key={d}
              active={difficultyFilter === d}
              onClick={() => setDifficultyFilter(d)}
              ocid={`interview.difficulty_filter.${d.toLowerCase()}`}
            >
              {d}
            </FilterChip>
          ))}
        </div>

        {/* Practiced count pill */}
        {practicedCount > 0 && (
          <span className="ml-auto text-xs font-medium text-accent bg-accent/10 border border-accent/20 rounded-full px-2.5 py-1 flex-shrink-0">
            {practicedCount} / {filteredQuestions.length} practiced
          </span>
        )}
      </div>

      {/* Questions list */}
      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <PageLoader />
        ) : filteredQuestions.length === 0 ? (
          <div data-ocid="interview.empty_state">
            <EmptyState
              icon={<MessageSquare size={24} />}
              title="No questions found"
              description="Try adjusting the role, type, or difficulty filters."
              action={
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => {
                    setTypeFilter(null);
                    setDifficultyFilter(null);
                    refetch();
                  }}
                  data-ocid="interview.empty.refresh_button"
                >
                  Clear Filters
                </Button>
              }
            />
          </div>
        ) : (
          <div
            className="max-w-3xl space-y-3"
            data-ocid="interview.questions_list"
          >
            {filteredQuestions.map((q, i) => {
              const id = q.id.toString();
              return (
                <QuestionCard
                  key={id}
                  question={q}
                  index={i + 1}
                  isOpen={expandedId === id}
                  isPracticed={practicedIds.has(id)}
                  onToggle={() => setExpandedId(expandedId === id ? null : id)}
                  onPractice={() => togglePracticed(id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
