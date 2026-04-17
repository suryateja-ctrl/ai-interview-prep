import { i as createLucideIcon, a as useNavigate, b as useGetProfile, e as useGetUserMockSessions, t as useStartMockSession, v as useSubmitAnswer, r as reactExports, q as UserRole, D as Difficulty, j as jsxRuntimeExports, P as PageLoader, B as Button, w as ChevronRight, U as User, x as ChartNoAxesColumn, C as CircleCheck } from "./index-D5GFhSas.js";
import { P as PageHeader, B as Badge } from "./PageHeader-D_Twfh17.js";
import { P as ProgressBar } from "./ProgressBar-CWJg1SdH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
const Bot = createLucideIcon("bot", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
const ROLE_OPTIONS = [
  { value: UserRole.FrontendDeveloper, label: "Frontend Developer", icon: "⚛️" },
  { value: UserRole.BackendDeveloper, label: "Backend Developer", icon: "🖥️" },
  { value: UserRole.FullStack, label: "Full Stack", icon: "🔀" },
  { value: UserRole.DataAnalyst, label: "Data Analyst", icon: "📊" },
  { value: UserRole.DataScientist, label: "Data Scientist", icon: "🧬" },
  { value: UserRole.ProductManager, label: "Product Manager", icon: "🗂️" },
  { value: UserRole.DevOps, label: "DevOps Engineer", icon: "⚙️" }
];
const DIFFICULTY_OPTIONS = [
  {
    value: Difficulty.Easy,
    label: "Easy",
    desc: "Beginner-friendly",
    color: "text-emerald-400"
  },
  {
    value: Difficulty.Medium,
    label: "Medium",
    desc: "Standard difficulty",
    color: "text-amber-400"
  },
  {
    value: Difficulty.Hard,
    label: "Hard",
    desc: "Senior-level",
    color: "text-destructive"
  }
];
const TOTAL_QUESTIONS = 5;
function formatDate(ts) {
  return new Date(Number(ts / BigInt(1e6))).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function ScoreRing({ score }) {
  const color = score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28 mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        className: "w-full h-full -rotate-90",
        viewBox: "0 0 36 36",
        "aria-label": `Score: ${score} out of 100`,
        role: "img",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "18",
              cy: "18",
              r: "15.9",
              fill: "none",
              className: "stroke-muted",
              strokeWidth: "2.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "18",
              cy: "18",
              r: "15.9",
              fill: "none",
              className: score >= 80 ? "stroke-emerald-400" : score >= 60 ? "stroke-amber-400" : "stroke-destructive",
              strokeWidth: "2.5",
              strokeDasharray: `${score} 100`,
              strokeLinecap: "round"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-2xl font-display font-bold ${color}`, children: score }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "/ 100" })
    ] })
  ] });
}
function PastSessionCard({ session }) {
  var _a;
  const score = Number(session.totalScore);
  const turns = session.turns.length;
  const roleLabel = ((_a = ROLE_OPTIONS.find((r) => r.value === session.role)) == null ? void 0 : _a.label) ?? session.role;
  const diffColor = session.difficulty === Difficulty.Easy ? "success" : session.difficulty === Difficulty.Hard ? "destructive" : "warning";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data p-4 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 18, className: "text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: roleLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11, className: "text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(session.startedAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          turns,
          " questions"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: diffColor, children: session.difficulty }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-sm font-bold font-display ${score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-destructive"}`,
          children: score
        }
      )
    ] })
  ] });
}
function MockInterviewPage() {
  var _a;
  const navigate = useNavigate();
  const { data: profile } = useGetProfile();
  const { data: pastSessions, isLoading: sessionsLoading } = useGetUserMockSessions();
  const startSession = useStartMockSession();
  const submitAnswer = useSubmitAnswer();
  const [phase, setPhase] = reactExports.useState("setup");
  const [role, setRole] = reactExports.useState(
    (profile == null ? void 0 : profile.role) ?? UserRole.FrontendDeveloper
  );
  const [difficulty, setDifficulty] = reactExports.useState(Difficulty.Medium);
  const [sessionResult, setSessionResult] = reactExports.useState(
    null
  );
  const [currentQuestion, setCurrentQuestion] = reactExports.useState("");
  const [answer, setAnswer] = reactExports.useState("");
  const [turns, setTurns] = reactExports.useState([]);
  const [, setLastResult] = reactExports.useState(null);
  const [finalScore, setFinalScore] = reactExports.useState(null);
  const [questionIndex, setQuestionIndex] = reactExports.useState(0);
  const [pendingFeedback, setPendingFeedback] = reactExports.useState(false);
  const bottomRef = reactExports.useRef(null);
  const textareaRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a2;
    if (phase === "active") {
      (_a2 = bottomRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
    }
  }, [phase]);
  reactExports.useEffect(() => {
    if (profile == null ? void 0 : profile.role) setRole(profile.role);
  }, [profile == null ? void 0 : profile.role]);
  async function handleStart() {
    try {
      const result = await startSession.mutateAsync({ role, difficulty });
      setSessionResult(result);
      setCurrentQuestion(result.firstQuestion.question);
      setQuestionIndex(0);
      setPhase("active");
      setTimeout(() => {
        var _a2;
        return (_a2 = textareaRef.current) == null ? void 0 : _a2.focus();
      }, 100);
    } catch {
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
        answer: submittedAnswer
      });
      setTurns((prev) => [
        ...prev,
        {
          question: submittedQuestion,
          answer: submittedAnswer,
          feedback: result.feedback,
          score: Number(result.score),
          questionIndex: submittedIndex
        }
      ]);
      setLastResult(result);
      setPendingFeedback(false);
      if (result.sessionComplete) {
        setFinalScore(result.finalScore ? Number(result.finalScore) : null);
        setPhase("complete");
      } else if (result.nextQuestion) {
        setCurrentQuestion(result.nextQuestion.question);
        setQuestionIndex((i) => i + 1);
        setTimeout(() => {
          var _a2;
          return (_a2 = textareaRef.current) == null ? void 0 : _a2.focus();
        }, 100);
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {});
  }
  const completedSessions = (pastSessions == null ? void 0 : pastSessions.filter((s) => s.isComplete)) ?? [];
  const totalQ = TOTAL_QUESTIONS;
  const answeredCount = turns.length;
  const progressPct = Math.round(answeredCount / totalQ * 100);
  const avgScore = turns.length > 0 ? Math.round(turns.reduce((s, t) => s + t.score, 0) / turns.length) : 0;
  const strongTurns = turns.filter((t) => t.score >= 80);
  const weakTurns = turns.filter((t) => t.score < 60);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "mock_interview.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Mock Interview",
        subtitle: "Simulate a real interview — AI asks questions and evaluates your responses",
        actions: phase !== "setup" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleReset,
            "data-ocid": "mock_interview.reset_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 14 }),
              "New Session"
            ]
          }
        ) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [
      phase === "setup" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "max-w-2xl space-y-5",
          "data-ocid": "mock_interview.setup.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground mb-3", children: "Select Your Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2", children: ROLE_OPTIONS.map(({ value, label, icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setRole(value),
                  className: `px-3 py-2.5 rounded-md border text-sm font-medium text-left transition-smooth flex items-center gap-2 ${role === value ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:text-foreground hover:border-border/60"}`,
                  "data-ocid": `mock_interview.role.${value.toLowerCase()}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: icon }),
                    label
                  ]
                },
                value
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground mb-3", children: "Difficulty Level" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: DIFFICULTY_OPTIONS.map(({ value, label, desc, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setDifficulty(value),
                  className: `px-3 py-3.5 rounded-md border text-left transition-smooth ${difficulty === value ? "border-accent bg-accent/10" : "border-border bg-background hover:border-border/60"}`,
                  "data-ocid": `mock_interview.difficulty.${value.toLowerCase()}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `text-sm font-semibold ${difficulty === value ? "text-accent" : color}`,
                        children: label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
                  ]
                },
                value
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 rounded-md bg-muted/30 border border-border text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 16, className: "text-accent flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "You'll be asked",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                  totalQ,
                  " questions"
                ] }),
                " ",
                "and receive AI feedback after each answer."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "accent",
                className: "w-full h-11",
                onClick: handleStart,
                disabled: startSession.isPending,
                "data-ocid": "mock_interview.start_button",
                children: startSession.isPending ? "Preparing your interview..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  "Start Interview",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
                ] })
              }
            ),
            completedSessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "mock_interview.past_sessions.section", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14, className: "text-muted-foreground" }),
                "Past Sessions"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: completedSessions.slice(0, 5).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": `mock_interview.past_session.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(PastSessionCard, { session: s })
                },
                s.id.toString()
              )) })
            ] }),
            completedSessions.length === 0 && pastSessions !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-8 text-muted-foreground text-sm",
                "data-ocid": "mock_interview.past_sessions.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 28, className: "mx-auto mb-2 opacity-30" }),
                  "No sessions yet — start your first mock interview above."
                ]
              }
            )
          ]
        }
      ),
      phase === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "max-w-3xl flex flex-col gap-4",
          "data-ocid": "mock_interview.active.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-data px-4 py-3 flex items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "Question",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: answeredCount + 1 }),
                  " ",
                  "of ",
                  totalQ
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "accent", children: difficulty })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: progressPct })
            ] }) }),
            turns.map((turn, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "space-y-2",
                "data-ocid": `mock_interview.turn.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 15, className: "text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-1 font-medium", children: [
                        "Q",
                        turn.questionIndex + 1,
                        " · AI Interviewer"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-data p-3 border-primary/20 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: turn.question }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start justify-end pl-10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 max-w-lg", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 font-medium text-right", children: "Your Answer" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-accent/10 border border-accent/20 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: turn.answer }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 15, className: "text-accent" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-11 rounded-md bg-muted/40 border border-border p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "AI Feedback" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          variant: turn.score >= 80 ? "success" : turn.score >= 60 ? "warning" : "destructive",
                          children: [
                            "Score: ",
                            turn.score,
                            "/100"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground leading-relaxed", children: turn.feedback })
                  ] })
                ]
              },
              `turn-q${turn.questionIndex}`
            )),
            pendingFeedback && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 15, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-data p-3 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce",
                    style: { animationDelay: "0ms" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce",
                    style: { animationDelay: "150ms" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce",
                    style: { animationDelay: "300ms" }
                  }
                )
              ] }) })
            ] }),
            !pendingFeedback && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 15, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-1 font-medium", children: [
                  "Q",
                  questionIndex + 1,
                  " · AI Interviewer"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-data p-4 border-primary/30 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed font-medium", children: currentQuestion }) })
              ] })
            ] }),
            !pendingFeedback && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-11", "data-ocid": "mock_interview.answer.section", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  ref: textareaRef,
                  value: answer,
                  onChange: (e) => setAnswer(e.target.value),
                  placeholder: "Type your answer here... (Ctrl+Enter to submit)",
                  rows: 4,
                  className: "w-full px-3.5 py-2.5 rounded-md border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-smooth",
                  onKeyDown: (e) => {
                    if (e.key === "Enter" && e.ctrlKey) handleSubmit();
                  },
                  "data-ocid": "mock_interview.answer_textarea"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-micro", children: [
                  answer.length,
                  " characters · Ctrl+Enter to submit"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "accent",
                    size: "sm",
                    onClick: handleSubmit,
                    disabled: !answer.trim() || submitAnswer.isPending,
                    "data-ocid": "mock_interview.submit_answer_button",
                    children: [
                      "Submit Answer",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 13 })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
          ]
        }
      ),
      phase === "complete" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "max-w-2xl space-y-5",
          "data-ocid": "mock_interview.complete.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data p-8 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 22, className: "text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Interview Complete!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
                (_a = ROLE_OPTIONS.find((r) => r.value === role)) == null ? void 0 : _a.label,
                " ·",
                " ",
                difficulty
              ] }),
              finalScore !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreRing, { score: finalScore }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3", children: finalScore >= 80 ? "Outstanding performance! You're interview-ready." : finalScore >= 60 ? "Good effort! Review weak areas before your interview." : "Keep practicing — focus on the feedback below." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center mt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "accent",
                    onClick: handleReset,
                    "data-ocid": "mock_interview.complete.try_again_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 15 }),
                      "Try Again"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => navigate({ to: "/analytics" }),
                    "data-ocid": "mock_interview.complete.analytics_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 15 }),
                      "Go to Analytics"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "card-data p-5",
                "data-ocid": "mock_interview.complete.breakdown.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "text-accent" }),
                    "Performance Breakdown"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-value", children: avgScore }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Avg Score" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-value text-emerald-400", children: strongTurns.length }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Strong" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-value text-destructive", children: weakTurns.length }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Needs Work" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: turns.map((turn, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-3",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-5 text-right flex-shrink-0", children: [
                          "Q",
                          i + 1
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `h-full rounded-full transition-smooth ${turn.score >= 80 ? "bg-emerald-400" : turn.score >= 60 ? "bg-amber-400" : "bg-destructive"}`,
                            style: { width: `${turn.score}%` }
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `text-xs font-medium w-8 flex-shrink-0 ${turn.score >= 80 ? "text-emerald-400" : turn.score >= 60 ? "text-amber-400" : "text-destructive"}`,
                            children: turn.score
                          }
                        )
                      ]
                    },
                    `breakdown-q${turn.questionIndex}`
                  )) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "mock_interview.complete.feedback.section", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14, className: "text-accent" }),
                "Detailed Feedback"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: turns.map((turn, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "card-data p-4 space-y-2",
                  "data-ocid": `mock_interview.review.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground mt-0.5 flex-shrink-0", children: [
                          "Q",
                          i + 1
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-snug truncate", children: turn.question })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          className: "flex-shrink-0",
                          variant: turn.score >= 80 ? "success" : turn.score >= 60 ? "warning" : "destructive",
                          children: [
                            turn.score,
                            "/100"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: turn.feedback })
                  ]
                },
                `review-q${turn.questionIndex}`
              )) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  MockInterviewPage
};
