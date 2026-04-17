import { i as createLucideIcon, b as useGetProfile, R as useSaveProfile, z as useProfileStore, u as useInternetIdentity, r as reactExports, n as useForm, S as ExperienceLevel, q as UserRole, j as jsxRuntimeExports, P as PageLoader, U as User, C as CircleCheck, B as Button, V as LogOut } from "./index-D5GFhSas.js";
import { u as ue } from "./index-CqdtLjej.js";
import { P as PageHeader, B as Badge } from "./PageHeader-D_Twfh17.js";
import { S as Save } from "./save-BmkyV9I9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const ROLE_LABELS = {
  [UserRole.FrontendDeveloper]: "Frontend Developer",
  [UserRole.BackendDeveloper]: "Backend Developer",
  [UserRole.FullStack]: "Full Stack Developer",
  [UserRole.DataAnalyst]: "Data Analyst",
  [UserRole.DataScientist]: "Data Scientist",
  [UserRole.ProductManager]: "Product Manager",
  [UserRole.DevOps]: "DevOps Engineer"
};
const ROLE_OPTIONS = Object.entries(ROLE_LABELS);
const EXP_OPTIONS = [
  { value: ExperienceLevel.Junior, label: "Junior", sub: "0–2 yrs" },
  { value: ExperienceLevel.Mid, label: "Mid-Level", sub: "2–5 yrs" },
  { value: ExperienceLevel.Senior, label: "Senior", sub: "5+ yrs" }
];
function CompletenessBar({ pct }) {
  const color = pct >= 80 ? "bg-accent" : pct >= 50 ? "bg-chart-5" : "bg-muted-foreground";
  const label = pct >= 80 ? "Looking great!" : pct >= 50 ? "Almost there" : "Just started";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data p-5", "data-ocid": "profile.completeness_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Profile Completeness" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold font-display text-foreground", children: [
        pct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full transition-all duration-700 ${color}`,
        style: { width: `${pct}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: label })
  ] });
}
function computeCompleteness(name, role, experienceLevel, targetJobTitle) {
  const filled = [name, role, experienceLevel, targetJobTitle].filter(
    (v) => v !== "" && v !== null && v !== void 0
  ).length;
  return Math.round(filled / 4 * 100);
}
function ProfilePage() {
  const { data: profile, isLoading } = useGetProfile();
  const saveProfile = useSaveProfile();
  const setProfileStore = useProfileStore((s) => s.setProfile);
  const { identity, clear } = useInternetIdentity();
  const [copied, setCopied] = reactExports.useState(false);
  const principalId = (identity == null ? void 0 : identity.getPrincipal().toText()) ?? "";
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      role: UserRole.FrontendDeveloper,
      experienceLevel: ExperienceLevel.Junior,
      targetJobTitle: ""
    }
  });
  const watchedValues = watch();
  const completeness = computeCompleteness(
    watchedValues.name,
    watchedValues.role,
    watchedValues.experienceLevel,
    watchedValues.targetJobTitle
  );
  reactExports.useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("role", profile.role);
      setValue("experienceLevel", profile.experienceLevel);
      setValue("targetJobTitle", profile.targetJobTitle);
    }
  }, [profile, setValue]);
  async function onSubmit(data) {
    try {
      const saved = await saveProfile.mutateAsync(data);
      setProfileStore({
        name: saved.name,
        role: saved.role,
        experienceLevel: saved.experienceLevel,
        targetJobTitle: saved.targetJobTitle,
        onboardingComplete: saved.onboardingComplete
      });
      ue.success("Profile saved!", {
        description: "Your changes have been applied."
      });
    } catch {
      ue.error("Save failed", {
        description: "Something went wrong. Please try again."
      });
    }
  }
  function handleCopyPrincipal() {
    if (!principalId) return;
    navigator.clipboard.writeText(principalId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  }
  function handleLogout() {
    clear();
    ue.success("Logged out successfully.");
  }
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Profile & Settings",
        subtitle: "Manage your interview prep profile and account preferences"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data p-5 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 24, className: "text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate", children: (profile == null ? void 0 : profile.name) || "Your Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro truncate", children: (profile == null ? void 0 : profile.targetJobTitle) || "Set your target role below" }),
          (profile == null ? void 0 : profile.onboardingComplete) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "success", className: "mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 11, className: "mr-1" }),
            "Profile Complete"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CompletenessBar, { pct: completeness }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit(onSubmit),
          className: "space-y-5",
          "data-ocid": "profile.info_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 15, className: "text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground uppercase tracking-wide", children: "Profile Info" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "block text-xs font-medium text-muted-foreground mb-1.5",
                    htmlFor: "profile-name",
                    children: "Full Name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "profile-name",
                    ...register("name", { required: "Name is required" }),
                    className: "w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "profile.name_input"
                  }
                ),
                errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive mt-1",
                    "data-ocid": "profile.name_input.field_error",
                    children: errors.name.message
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "block text-xs font-medium text-muted-foreground mb-1.5",
                    htmlFor: "profile-target",
                    children: "Target Job Title"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "profile-target",
                    ...register("targetJobTitle", {
                      required: "Target job is required"
                    }),
                    placeholder: "e.g. Senior Frontend Engineer at Google",
                    className: "w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "profile.target_job_input"
                  }
                ),
                errors.targetJobTitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive mt-1",
                    "data-ocid": "profile.target_job_input.field_error",
                    children: errors.targetJobTitle.message
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Role / Track" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: ROLE_OPTIONS.map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setValue("role", value),
                  className: `px-3 py-2.5 rounded-md border text-sm font-medium text-left transition-smooth ${watch("role") === value ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"}`,
                  "data-ocid": `profile.role.${value.toLowerCase()}`,
                  children: label
                },
                value
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Experience Level" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: EXP_OPTIONS.map(({ value, label, sub }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setValue("experienceLevel", value),
                  className: `px-3 py-3 rounded-md border text-sm font-medium text-left transition-smooth flex flex-col gap-0.5 ${watch("experienceLevel") === value ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"}`,
                  "data-ocid": `profile.experience.${value.toLowerCase()}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-70", children: sub })
                  ]
                },
                value
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                variant: "accent",
                className: "w-full",
                disabled: saveProfile.isPending,
                "data-ocid": "profile.save_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 15 }),
                  saveProfile.isPending ? "Saving…" : "Save Profile"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", "data-ocid": "profile.account_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 15, className: "text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground uppercase tracking-wide", children: "Account Settings" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-medium text-muted-foreground mb-2", children: "Principal ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "code",
              {
                className: "flex-1 min-w-0 px-3 py-2 rounded-md bg-muted border border-border text-xs font-mono text-muted-foreground truncate select-all",
                "data-ocid": "profile.principal_id",
                children: principalId || "—"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleCopyPrincipal,
                disabled: !principalId,
                className: "flex-shrink-0 p-2 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth disabled:opacity-40",
                "aria-label": "Copy principal ID",
                "data-ocid": "profile.copy_principal_button",
                children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 15, className: "text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 15 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Your unique Internet Identity principal. Read-only." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-data p-5 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Sign out" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Log out of your Internet Identity session." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: handleLogout,
              className: "flex-shrink-0 text-destructive border-destructive/40 hover:bg-destructive/10",
              "data-ocid": "profile.logout_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 15 }),
                "Logout"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ProfilePage
};
