import { i as createLucideIcon, b as useGetProfile, r as reactExports, q as UserRole, s as useGetInterviewQuestions, j as jsxRuntimeExports, B as Button, Q as QuestionType, D as Difficulty, P as PageLoader, h as MessageSquare, C as CircleCheck, g as BookOpen } from "./index-D5GFhSas.js";
import { P as PageHeader, B as Badge } from "./PageHeader-D_Twfh17.js";
import { E as EmptyState } from "./EmptyState-66bWb4cm.js";
import { C as ChevronDown } from "./chevron-down-DoNnUFOv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const ROLE_LABELS = {
  [UserRole.FrontendDeveloper]: "Frontend Dev",
  [UserRole.BackendDeveloper]: "Backend Dev",
  [UserRole.FullStack]: "Full Stack",
  [UserRole.DataAnalyst]: "Data Analyst",
  [UserRole.DataScientist]: "Data Scientist",
  [UserRole.ProductManager]: "Product Manager",
  [UserRole.DevOps]: "DevOps"
};
const DIFFICULTY_VARIANTS = {
  [Difficulty.Easy]: "success",
  [Difficulty.Medium]: "warning",
  [Difficulty.Hard]: "destructive"
};
function FilterChip({
  active,
  onClick,
  ocid,
  children,
  accent = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      className: `px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${active ? accent ? "bg-accent/10 border border-accent/30 text-accent" : "bg-primary/10 border border-primary/30 text-primary" : "border border-border text-muted-foreground hover:text-foreground hover:border-border/80"}`,
      "data-ocid": ocid,
      children
    }
  );
}
function RubricGrid({ rubric }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-md bg-emerald-500/5 border border-emerald-500/15", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-emerald-400 mb-1", children: "Excellent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: rubric.excellent })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-md bg-sky-500/5 border border-sky-500/15", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-sky-400 mb-1", children: "Good" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: rubric.good })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-md bg-amber-500/5 border border-amber-500/15", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-400 mb-1", children: "Fair" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: rubric.fair })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-md bg-rose-500/5 border border-rose-500/15", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-rose-400 mb-1", children: "Poor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: rubric.poor })
    ] })
  ] });
}
function QuestionCard({
  question,
  index,
  isOpen,
  isPracticed,
  onToggle,
  onPractice
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `card-data overflow-hidden transition-smooth ${isPracticed ? "border-accent/30" : ""}`,
      "data-ocid": `interview.question.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-start gap-3 p-4 text-left hover:bg-muted/20 transition-smooth",
            onClick: onToggle,
            "data-ocid": `interview.question.toggle.${index}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground pt-0.5 w-6 flex-shrink-0 select-none", children: String(index).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-snug", children: question.question }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2 flex-wrap items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: question.questionType === QuestionType.Technical ? "accent" : "default",
                      children: question.questionType
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: DIFFICULTY_VARIANTS[question.difficulty], children: question.difficulty }),
                  question.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "muted", children: tag }, tag)),
                  isPracticed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-accent font-medium", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 11 }),
                    "Practiced"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-shrink-0 mt-0.5", children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16 }) })
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border bg-muted/10 px-4 pt-4 pb-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label mb-2", children: "Ideal Answer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: question.idealAnswer })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label mb-2", children: "Scoring Rubric" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RubricGrid, { rubric: question.rubric })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: isPracticed ? "outline" : "accent",
              size: "sm",
              onClick: (e) => {
                e.stopPropagation();
                onPractice();
              },
              "data-ocid": `interview.practice_button.${index}`,
              children: isPracticed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 13 }),
                "Mark as Unpracticed"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 13 }),
                "Mark as Practiced"
              ] })
            }
          ) })
        ] })
      ]
    }
  );
}
function InterviewPage() {
  const { data: profile } = useGetProfile();
  const [selectedRole, setSelectedRole] = reactExports.useState(
    (profile == null ? void 0 : profile.role) ?? UserRole.FrontendDeveloper
  );
  const [difficultyFilter, setDifficultyFilter] = reactExports.useState(null);
  const [typeFilter, setTypeFilter] = reactExports.useState(null);
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [practicedIds, setPracticedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const {
    data: questions,
    isLoading,
    refetch
  } = useGetInterviewQuestions(selectedRole, difficultyFilter);
  const filteredQuestions = reactExports.useMemo(() => {
    if (!questions) return [];
    if (!typeFilter) return questions;
    return questions.filter((q) => q.questionType === typeFilter);
  }, [questions, typeFilter]);
  function togglePracticed(id) {
    setPracticedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  const practicedCount = filteredQuestions.filter(
    (q) => practicedIds.has(q.id.toString())
  ).length;
  const activeFilterLabel = [
    ROLE_LABELS[selectedRole],
    typeFilter ?? "All Types",
    difficultyFilter ?? "All Levels"
  ].join(" · ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "interview.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Interview Q&A",
        subtitle: isLoading ? "Loading questions…" : `${filteredQuestions.length} question${filteredQuestions.length !== 1 ? "s" : ""} · ${activeFilterLabel}`,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => refetch(),
            "data-ocid": "interview.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 }),
              "Refresh"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap items-center gap-3 px-6 py-3 border-b border-border bg-card",
        "data-ocid": "interview.filter_bar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-1.5",
              "data-ocid": "interview.role_filter",
              children: Object.values(UserRole).map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterChip,
                {
                  active: selectedRole === role,
                  accent: true,
                  onClick: () => setSelectedRole(role),
                  ocid: `interview.role_filter.${role.toLowerCase()}`,
                  children: ROLE_LABELS[role]
                },
                role
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-border hidden sm:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", "data-ocid": "interview.type_filter", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterChip,
              {
                active: typeFilter === null,
                onClick: () => setTypeFilter(null),
                ocid: "interview.type_filter.all",
                children: "All Types"
              }
            ),
            Object.values(QuestionType).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterChip,
              {
                active: typeFilter === t,
                onClick: () => setTypeFilter(t),
                ocid: `interview.type_filter.${t.toLowerCase()}`,
                children: t
              },
              t
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-border hidden sm:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", "data-ocid": "interview.difficulty_filter", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterChip,
              {
                active: difficultyFilter === null,
                onClick: () => setDifficultyFilter(null),
                ocid: "interview.difficulty_filter.all",
                children: "All Levels"
              }
            ),
            Object.values(Difficulty).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterChip,
              {
                active: difficultyFilter === d,
                onClick: () => setDifficultyFilter(d),
                ocid: `interview.difficulty_filter.${d.toLowerCase()}`,
                children: d
              },
              d
            ))
          ] }),
          practicedCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs font-medium text-accent bg-accent/10 border border-accent/20 rounded-full px-2.5 py-1 flex-shrink-0", children: [
            practicedCount,
            " / ",
            filteredQuestions.length,
            " practiced"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}) : filteredQuestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "interview.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 24 }),
        title: "No questions found",
        description: "Try adjusting the role, type, or difficulty filters.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "accent",
            size: "sm",
            onClick: () => {
              setTypeFilter(null);
              setDifficultyFilter(null);
              refetch();
            },
            "data-ocid": "interview.empty.refresh_button",
            children: "Clear Filters"
          }
        )
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-3xl space-y-3",
        "data-ocid": "interview.questions_list",
        children: filteredQuestions.map((q, i) => {
          const id = q.id.toString();
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuestionCard,
            {
              question: q,
              index: i + 1,
              isOpen: expandedId === id,
              isPracticed: practicedIds.has(id),
              onToggle: () => setExpandedId(expandedId === id ? null : id),
              onPractice: () => togglePracticed(id)
            },
            id
          );
        })
      }
    ) })
  ] });
}
export {
  InterviewPage
};
