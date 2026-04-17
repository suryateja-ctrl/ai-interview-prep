import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { CheckCircle2, Copy, LogOut, Save, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ExperienceLevel, UserRole } from "../backend";
import type { UserProfileInput } from "../backend";
import { Badge } from "../components/ui/AipsBadge";
import { Button } from "../components/ui/AipsButton";
import { PageLoader } from "../components/ui/LoadingSpinner";
import { PageHeader } from "../components/ui/PageHeader";
import { useGetProfile, useSaveProfile } from "../lib/backendQueries";
import { useProfileStore } from "../store/profileStore";

const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.FrontendDeveloper]: "Frontend Developer",
  [UserRole.BackendDeveloper]: "Backend Developer",
  [UserRole.FullStack]: "Full Stack Developer",
  [UserRole.DataAnalyst]: "Data Analyst",
  [UserRole.DataScientist]: "Data Scientist",
  [UserRole.ProductManager]: "Product Manager",
  [UserRole.DevOps]: "DevOps Engineer",
};

const ROLE_OPTIONS = Object.entries(ROLE_LABELS) as [UserRole, string][];
const EXP_OPTIONS: { value: ExperienceLevel; label: string; sub: string }[] = [
  { value: ExperienceLevel.Junior, label: "Junior", sub: "0–2 yrs" },
  { value: ExperienceLevel.Mid, label: "Mid-Level", sub: "2–5 yrs" },
  { value: ExperienceLevel.Senior, label: "Senior", sub: "5+ yrs" },
];

function CompletenessBar({ pct }: { pct: number }) {
  const color =
    pct >= 80 ? "bg-accent" : pct >= 50 ? "bg-chart-5" : "bg-muted-foreground";
  const label =
    pct >= 80 ? "Looking great!" : pct >= 50 ? "Almost there" : "Just started";
  return (
    <div className="card-data p-5" data-ocid="profile.completeness_section">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Profile Completeness
        </span>
        <span className="text-sm font-bold font-display text-foreground">
          {pct}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1.5">{label}</p>
    </div>
  );
}

function computeCompleteness(
  name: string,
  role: UserRole,
  experienceLevel: ExperienceLevel,
  targetJobTitle: string,
): number {
  const filled = [name, role, experienceLevel, targetJobTitle].filter(
    (v) => v !== "" && v !== null && v !== undefined,
  ).length;
  return Math.round((filled / 4) * 100);
}

export function ProfilePage() {
  const { data: profile, isLoading } = useGetProfile();
  const saveProfile = useSaveProfile();
  const setProfileStore = useProfileStore((s) => s.setProfile);
  const { identity, clear } = useInternetIdentity();
  const [copied, setCopied] = useState(false);

  const principalId = identity?.getPrincipal().toText() ?? "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserProfileInput>({
    defaultValues: {
      name: "",
      role: UserRole.FrontendDeveloper,
      experienceLevel: ExperienceLevel.Junior,
      targetJobTitle: "",
    },
  });

  const watchedValues = watch();
  const completeness = computeCompleteness(
    watchedValues.name,
    watchedValues.role,
    watchedValues.experienceLevel,
    watchedValues.targetJobTitle,
  );

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("role", profile.role);
      setValue("experienceLevel", profile.experienceLevel);
      setValue("targetJobTitle", profile.targetJobTitle);
    }
  }, [profile, setValue]);

  async function onSubmit(data: UserProfileInput) {
    try {
      const saved = await saveProfile.mutateAsync(data);
      setProfileStore({
        name: saved.name,
        role: saved.role,
        experienceLevel: saved.experienceLevel,
        targetJobTitle: saved.targetJobTitle,
        onboardingComplete: saved.onboardingComplete,
      });
      toast.success("Profile saved!", {
        description: "Your changes have been applied.",
      });
    } catch {
      toast.error("Save failed", {
        description: "Something went wrong. Please try again.",
      });
    }
  }

  function handleCopyPrincipal() {
    if (!principalId) return;
    navigator.clipboard.writeText(principalId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleLogout() {
    clear();
    toast.success("Logged out successfully.");
  }

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col h-full" data-ocid="profile.page">
      <PageHeader
        title="Profile & Settings"
        subtitle="Manage your interview prep profile and account preferences"
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl space-y-5">
          {/* Avatar + completeness */}
          <div className="card-data p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center flex-shrink-0">
              <User size={24} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-foreground truncate">
                {profile?.name || "Your Name"}
              </p>
              <p className="text-micro truncate">
                {profile?.targetJobTitle || "Set your target role below"}
              </p>
              {profile?.onboardingComplete && (
                <Badge variant="success" className="mt-1.5">
                  <CheckCircle2 size={11} className="mr-1" />
                  Profile Complete
                </Badge>
              )}
            </div>
          </div>

          <CompletenessBar pct={completeness} />

          {/* ── SECTION 1: Profile Info ── */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            data-ocid="profile.info_section"
          >
            <div className="flex items-center gap-2 pt-1">
              <User size={15} className="text-accent" />
              <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-wide">
                Profile Info
              </h2>
            </div>

            {/* Personal fields */}
            <div className="card-data p-5 space-y-4">
              <div>
                <label
                  className="block text-xs font-medium text-muted-foreground mb-1.5"
                  htmlFor="profile-name"
                >
                  Full Name
                </label>
                <input
                  id="profile-name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  data-ocid="profile.name_input"
                />
                {errors.name && (
                  <p
                    className="text-xs text-destructive mt-1"
                    data-ocid="profile.name_input.field_error"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-muted-foreground mb-1.5"
                  htmlFor="profile-target"
                >
                  Target Job Title
                </label>
                <input
                  id="profile-target"
                  {...register("targetJobTitle", {
                    required: "Target job is required",
                  })}
                  placeholder="e.g. Senior Frontend Engineer at Google"
                  className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  data-ocid="profile.target_job_input"
                />
                {errors.targetJobTitle && (
                  <p
                    className="text-xs text-destructive mt-1"
                    data-ocid="profile.target_job_input.field_error"
                  >
                    {errors.targetJobTitle.message}
                  </p>
                )}
              </div>
            </div>

            {/* Role selector */}
            <div className="card-data p-5">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Role / Track
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {ROLE_OPTIONS.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setValue("role", value)}
                    className={`px-3 py-2.5 rounded-md border text-sm font-medium text-left transition-smooth ${
                      watch("role") === value
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                    }`}
                    data-ocid={`profile.role.${value.toLowerCase()}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience selector */}
            <div className="card-data p-5">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Experience Level
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {EXP_OPTIONS.map(({ value, label, sub }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setValue("experienceLevel", value)}
                    className={`px-3 py-3 rounded-md border text-sm font-medium text-left transition-smooth flex flex-col gap-0.5 ${
                      watch("experienceLevel") === value
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                    }`}
                    data-ocid={`profile.experience.${value.toLowerCase()}`}
                  >
                    <span>{label}</span>
                    <span className="text-xs opacity-70">{sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              variant="accent"
              className="w-full"
              disabled={saveProfile.isPending}
              data-ocid="profile.save_button"
            >
              <Save size={15} />
              {saveProfile.isPending ? "Saving…" : "Save Profile"}
            </Button>
          </form>

          {/* ── SECTION 2: Account Settings ── */}
          <div className="space-y-4 pt-2" data-ocid="profile.account_section">
            <div className="flex items-center gap-2">
              <Shield size={15} className="text-accent" />
              <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-wide">
                Account Settings
              </h2>
            </div>

            {/* Principal ID */}
            <div className="card-data p-5">
              <p className="block text-xs font-medium text-muted-foreground mb-2">
                Principal ID
              </p>
              <div className="flex items-center gap-2">
                <code
                  className="flex-1 min-w-0 px-3 py-2 rounded-md bg-muted border border-border text-xs font-mono text-muted-foreground truncate select-all"
                  data-ocid="profile.principal_id"
                >
                  {principalId || "—"}
                </code>
                <button
                  type="button"
                  onClick={handleCopyPrincipal}
                  disabled={!principalId}
                  className="flex-shrink-0 p-2 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth disabled:opacity-40"
                  aria-label="Copy principal ID"
                  data-ocid="profile.copy_principal_button"
                >
                  {copied ? (
                    <CheckCircle2 size={15} className="text-accent" />
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Your unique Internet Identity principal. Read-only.
              </p>
            </div>

            {/* Logout */}
            <div className="card-data p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Sign out</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Log out of your Internet Identity session.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                className="flex-shrink-0 text-destructive border-destructive/40 hover:bg-destructive/10"
                data-ocid="profile.logout_button"
              >
                <LogOut size={15} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
