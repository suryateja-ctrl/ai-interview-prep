import { i as createLucideIcon, j as jsxRuntimeExports, y as cn, z as useProfileStore, r as reactExports, q as UserRole, E as useGetStudyTopics, G as useGetUserTopicProgress, H as useMarkTopicComplete, I as motion, g as BookOpen, C as CircleCheck, B as Button, w as ChevronRight, J as AnimatePresence } from "./index-D5GFhSas.js";
import { u as ue } from "./index-CqdtLjej.js";
import { P as PageHeader, B as Badge } from "./PageHeader-D_Twfh17.js";
import { P as ProgressBar } from "./ProgressBar-CWJg1SdH.js";
import { L as LoaderCircle } from "./loader-circle-CwU1MzoK.js";
import { C as ChevronDown } from "./chevron-down-DoNnUFOv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
const GraduationCap = createLucideIcon("graduation-cap", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
const ROLE_LABELS = {
  [UserRole.FrontendDeveloper]: "Frontend Dev",
  [UserRole.BackendDeveloper]: "Backend Dev",
  [UserRole.FullStack]: "Full Stack",
  [UserRole.DataAnalyst]: "Data Analyst",
  [UserRole.DataScientist]: "Data Scientist",
  [UserRole.DevOps]: "DevOps",
  [UserRole.ProductManager]: "Product Manager"
};
const PRIORITY_MAP = {
  1: { label: "High Priority", variant: "destructive" },
  2: { label: "Medium Priority", variant: "warning" },
  3: { label: "Low Priority", variant: "muted" }
};
function getPriorityBadge(priority) {
  return PRIORITY_MAP[Number(priority)] ?? PRIORITY_MAP[3];
}
function isCompleted(topicId, progress) {
  return progress.some((p) => p.topicId === topicId && p.completed);
}
function TopicCard({
  topic,
  index,
  complete,
  mutating,
  onComplete
}) {
  const [open, setOpen] = reactExports.useState(false);
  const badge = getPriorityBadge(topic.priority);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.28, delay: index * 0.055 },
      className: `rounded-lg border bg-card overflow-hidden transition-smooth ${complete ? "border-emerald-500/25 opacity-75" : "border-border hover:border-accent/35 hover:shadow-sm"}`,
      "data-ocid": `study.topic_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              disabled: complete || mutating,
              onClick: () => onComplete(topic.id),
              "aria-label": complete ? "Completed" : "Mark complete",
              className: "mt-0.5 flex-shrink-0 transition-smooth hover:scale-110 disabled:cursor-default",
              "data-ocid": `study.complete_toggle.${index + 1}`,
              children: complete ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-5 h-5 text-muted-foreground hover:text-accent" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: `font-display font-semibold text-sm leading-snug ${complete ? "line-through text-muted-foreground" : "text-foreground"}`,
                  children: topic.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: badge.variant, children: badge.label }),
              complete && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "Completed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: topic.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-micro", children: [
                topic.subtopics.length,
                " subtopic",
                topic.subtopics.length !== 1 ? "s" : ""
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0 ml-1", children: [
            !complete && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                disabled: mutating,
                onClick: () => onComplete(topic.id),
                "aria-label": "Mark topic complete",
                "data-ocid": `study.mark_complete_button.${index + 1}`,
                children: [
                  mutating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Mark Complete" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setOpen((v) => !v),
                "aria-label": open ? "Collapse subtopics" : "Expand subtopics",
                className: "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
                "data-ocid": `study.expand_toggle.${index + 1}`,
                children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.22, ease: "easeInOut" },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/50 bg-muted/20 px-4 py-3 space-y-3", children: topic.subtopics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No subtopics available." }) : topic.subtopics.map((sub, si) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-md border border-border/50 bg-card p-3",
                "data-ocid": `study.subtopic.${index + 1}.${si + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-0.5", children: sub.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: sub.description }),
                  sub.links.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: sub.links.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: link.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex items-center gap-1 text-xs text-accent hover:underline transition-smooth",
                      "data-ocid": `study.subtopic_link.${index + 1}.${si + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                        link.title,
                        link.resourceType && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-0.5", children: [
                          "(",
                          link.resourceType,
                          ")"
                        ] })
                      ]
                    },
                    link.url
                  )) })
                ]
              },
              sub.name
            )) })
          },
          "subtopics"
        ) })
      ]
    }
  );
}
function CardSkeleton({ i }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-4 space-y-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-5 h-5 rounded-full flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-44" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28 rounded-sm ml-auto" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-8 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: `h-3 ${i % 2 === 0 ? "w-full" : "w-5/6"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4" })
    ] })
  ] });
}
function StudyPage() {
  const profileRole = useProfileStore((s) => s.role);
  const [selectedRole, setSelectedRole] = reactExports.useState(
    profileRole ?? UserRole.FrontendDeveloper
  );
  const { data: topics = [], isLoading: loadingTopics } = useGetStudyTopics(selectedRole);
  const { data: progressList = [], isLoading: loadingProgress } = useGetUserTopicProgress();
  const markComplete = useMarkTopicComplete();
  const completedCount = topics.filter(
    (t) => isCompleted(t.id, progressList)
  ).length;
  const total = topics.length;
  const allRoles = Object.values(UserRole);
  function handleMarkComplete(topicId) {
    markComplete.mutate(topicId, {
      onSuccess: () => ue.success("Topic marked as complete!"),
      onError: () => ue.error("Failed to mark topic. Please try again.")
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "study.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Study Topics",
        subtitle: "Browse curated learning paths and track your progress by role",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "role-select",
              className: "text-xs text-muted-foreground whitespace-nowrap",
              children: "Role:"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "role-select",
              value: selectedRole,
              onChange: (e) => setSelectedRole(e.target.value),
              className: "text-xs rounded-md border border-border bg-background text-foreground px-2 py-1.5 focus:ring-2 focus:ring-ring focus:outline-none cursor-pointer transition-smooth",
              "data-ocid": "study.role_select",
              children: allRoles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: ROLE_LABELS[r] }, r))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-6 py-5 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg border border-border bg-card p-4",
          "data-ocid": "study.progress_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-4 h-4 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-sm text-foreground", children: [
                  ROLE_LABELS[selectedRole],
                  " — Overall Progress"
                ] })
              ] }),
              loadingTopics || loadingProgress ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
                completedCount,
                " / ",
                total,
                " topics"
              ] })
            ] }),
            loadingTopics || loadingProgress ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-full rounded-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProgressBar,
              {
                value: completedCount,
                max: total || 1,
                size: "md",
                variant: completedCount > 0 && completedCount === total ? "success" : "accent",
                showValue: true
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-wrap gap-2",
          role: "tablist",
          "aria-label": "Filter topics by role",
          children: allRoles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": selectedRole === r,
              onClick: () => setSelectedRole(r),
              className: `text-xs px-3 py-1.5 rounded-md font-medium transition-smooth ${selectedRole === r ? "bg-accent/10 text-accent border border-accent/30" : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"}`,
              "data-ocid": `study.role_tab.${r.toLowerCase()}`,
              children: ROLE_LABELS[r]
            },
            r
          ))
        }
      ),
      loadingTopics ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, { i }, i)) }) : topics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "study.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-muted-foreground mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: "No topics available" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground max-w-xs", children: [
              "Study topics for ",
              ROLE_LABELS[selectedRole],
              " haven't been added yet. Try selecting a different role."
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-w-3xl", "data-ocid": "study.topic_list", children: topics.map((topic, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TopicCard,
        {
          topic,
          index: i,
          complete: isCompleted(topic.id, progressList),
          mutating: markComplete.isPending,
          onComplete: handleMarkComplete
        },
        topic.id.toString()
      )) })
    ] })
  ] });
}
export {
  StudyPage
};
