import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  ExternalLink,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { UserRole } from "../backend";
import type { StudyTopic, UserTopicProgress } from "../backend";
import { Badge } from "../components/ui/AipsBadge";
import { Button } from "../components/ui/AipsButton";
import { PageHeader } from "../components/ui/PageHeader";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Skeleton } from "../components/ui/skeleton";
import {
  useGetStudyTopics,
  useGetUserTopicProgress,
  useMarkTopicComplete,
} from "../lib/backendQueries";
import { useProfileStore } from "../store/profileStore";

// ── constants ───────────────────────────────────────────────────────────────

const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.FrontendDeveloper]: "Frontend Dev",
  [UserRole.BackendDeveloper]: "Backend Dev",
  [UserRole.FullStack]: "Full Stack",
  [UserRole.DataAnalyst]: "Data Analyst",
  [UserRole.DataScientist]: "Data Scientist",
  [UserRole.DevOps]: "DevOps",
  [UserRole.ProductManager]: "Product Manager",
};

type PriorityVariant = "destructive" | "warning" | "muted";

const PRIORITY_MAP: Record<
  number,
  { label: string; variant: PriorityVariant }
> = {
  1: { label: "High Priority", variant: "destructive" },
  2: { label: "Medium Priority", variant: "warning" },
  3: { label: "Low Priority", variant: "muted" },
};

function getPriorityBadge(priority: bigint): {
  label: string;
  variant: PriorityVariant;
} {
  return PRIORITY_MAP[Number(priority)] ?? PRIORITY_MAP[3];
}

function isCompleted(topicId: bigint, progress: UserTopicProgress[]): boolean {
  return progress.some((p) => p.topicId === topicId && p.completed);
}

// ── TopicCard ───────────────────────────────────────────────────────────────

interface TopicCardProps {
  topic: StudyTopic;
  index: number;
  complete: boolean;
  mutating: boolean;
  onComplete: (id: bigint) => void;
}

function TopicCard({
  topic,
  index,
  complete,
  mutating,
  onComplete,
}: TopicCardProps) {
  const [open, setOpen] = useState(false);
  const badge = getPriorityBadge(topic.priority);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.055 }}
      className={`rounded-lg border bg-card overflow-hidden transition-smooth ${
        complete
          ? "border-emerald-500/25 opacity-75"
          : "border-border hover:border-accent/35 hover:shadow-sm"
      }`}
      data-ocid={`study.topic_card.${index + 1}`}
    >
      {/* header row */}
      <div className="flex items-start gap-3 p-4">
        {/* completion toggle */}
        <button
          type="button"
          disabled={complete || mutating}
          onClick={() => onComplete(topic.id)}
          aria-label={complete ? "Completed" : "Mark complete"}
          className="mt-0.5 flex-shrink-0 transition-smooth hover:scale-110 disabled:cursor-default"
          data-ocid={`study.complete_toggle.${index + 1}`}
        >
          {complete ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground hover:text-accent" />
          )}
        </button>

        {/* content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className={`font-display font-semibold text-sm leading-snug ${
                complete
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {topic.name}
            </h3>
            <Badge variant={badge.variant}>{badge.label}</Badge>
            {complete && <Badge variant="success">Completed</Badge>}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {topic.description}
          </p>
          <div className="flex items-center gap-1 mt-2">
            <BookOpen className="w-3 h-3 text-muted-foreground" />
            <span className="text-micro">
              {topic.subtopics.length} subtopic
              {topic.subtopics.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* actions */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-1">
          {!complete && (
            <Button
              size="sm"
              variant="outline"
              disabled={mutating}
              onClick={() => onComplete(topic.id)}
              aria-label="Mark topic complete"
              data-ocid={`study.mark_complete_button.${index + 1}`}
            >
              {mutating ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <CheckCircle2 className="w-3 h-3" />
              )}
              <span className="hidden sm:inline">Mark Complete</span>
            </Button>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Collapse subtopics" : "Expand subtopics"}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            data-ocid={`study.expand_toggle.${index + 1}`}
          >
            {open ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* subtopics panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="subtopics"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 bg-muted/20 px-4 py-3 space-y-3">
              {topic.subtopics.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No subtopics available.
                </p>
              ) : (
                topic.subtopics.map((sub, si) => (
                  <div
                    key={sub.name}
                    className="rounded-md border border-border/50 bg-card p-3"
                    data-ocid={`study.subtopic.${index + 1}.${si + 1}`}
                  >
                    <p className="text-xs font-semibold text-foreground mb-0.5">
                      {sub.name}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {sub.description}
                    </p>
                    {sub.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {sub.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-accent hover:underline transition-smooth"
                            data-ocid={`study.subtopic_link.${index + 1}.${si + 1}`}
                          >
                            <ExternalLink className="w-3 h-3" />
                            {link.title}
                            {link.resourceType && (
                              <span className="text-muted-foreground ml-0.5">
                                ({link.resourceType})
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── skeletons ───────────────────────────────────────────────────────────────

function CardSkeleton({ i }: { i: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-2.5">
      <div className="flex items-center gap-3">
        <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-5 w-28 rounded-sm ml-auto" />
      </div>
      <div className="pl-8 space-y-1.5">
        <Skeleton className={`h-3 ${i % 2 === 0 ? "w-full" : "w-5/6"}`} />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

// ── page ────────────────────────────────────────────────────────────────────

export function StudyPage() {
  const profileRole = useProfileStore((s) => s.role);
  const [selectedRole, setSelectedRole] = useState<UserRole>(
    profileRole ?? UserRole.FrontendDeveloper,
  );

  const { data: topics = [], isLoading: loadingTopics } =
    useGetStudyTopics(selectedRole);
  const { data: progressList = [], isLoading: loadingProgress } =
    useGetUserTopicProgress();
  const markComplete = useMarkTopicComplete();

  const completedCount = topics.filter((t) =>
    isCompleted(t.id, progressList),
  ).length;
  const total = topics.length;
  const allRoles = Object.values(UserRole) as UserRole[];

  function handleMarkComplete(topicId: bigint) {
    markComplete.mutate(topicId, {
      onSuccess: () => toast.success("Topic marked as complete!"),
      onError: () => toast.error("Failed to mark topic. Please try again."),
    });
  }

  return (
    <div className="flex flex-col h-full" data-ocid="study.page">
      {/* Page header with role selector */}
      <PageHeader
        title="Study Topics"
        subtitle="Browse curated learning paths and track your progress by role"
        actions={
          <div className="flex items-center gap-2">
            <label
              htmlFor="role-select"
              className="text-xs text-muted-foreground whitespace-nowrap"
            >
              Role:
            </label>
            <select
              id="role-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="text-xs rounded-md border border-border bg-background text-foreground px-2 py-1.5 focus:ring-2 focus:ring-ring focus:outline-none cursor-pointer transition-smooth"
              data-ocid="study.role_select"
            >
              {allRoles.map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
            </select>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        {/* Overall progress panel */}
        <div
          className="rounded-lg border border-border bg-card p-4"
          data-ocid="study.progress_panel"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-accent" />
              <span className="font-display font-semibold text-sm text-foreground">
                {ROLE_LABELS[selectedRole]} — Overall Progress
              </span>
            </div>
            {loadingTopics || loadingProgress ? (
              <Skeleton className="h-4 w-20" />
            ) : (
              <span className="text-xs font-medium text-muted-foreground">
                {completedCount} / {total} topics
              </span>
            )}
          </div>
          {loadingTopics || loadingProgress ? (
            <Skeleton className="h-2.5 w-full rounded-full" />
          ) : (
            <ProgressBar
              value={completedCount}
              max={total || 1}
              size="md"
              variant={
                completedCount > 0 && completedCount === total
                  ? "success"
                  : "accent"
              }
              showValue
            />
          )}
        </div>

        {/* Role filter tabs */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter topics by role"
        >
          {allRoles.map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={selectedRole === r}
              onClick={() => setSelectedRole(r)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-smooth ${
                selectedRole === r
                  ? "bg-accent/10 text-accent border border-accent/30"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
              }`}
              data-ocid={`study.role_tab.${r.toLowerCase()}`}
            >
              {ROLE_LABELS[r]}
            </button>
          ))}
        </div>

        {/* Topic list */}
        {loadingTopics ? (
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} i={i} />
            ))}
          </div>
        ) : topics.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="study.empty_state"
          >
            <BookOpen className="w-10 h-10 text-muted-foreground mb-3" />
            <h3 className="font-display font-semibold text-foreground mb-1">
              No topics available
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Study topics for {ROLE_LABELS[selectedRole]} haven&apos;t been
              added yet. Try selecting a different role.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3 max-w-3xl" data-ocid="study.topic_list">
            {(topics as StudyTopic[]).map((topic, i) => (
              <TopicCard
                key={topic.id.toString()}
                topic={topic}
                index={i}
                complete={isCompleted(topic.id, progressList)}
                mutating={markComplete.isPending}
                onComplete={handleMarkComplete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
