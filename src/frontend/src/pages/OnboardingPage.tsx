import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Target,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ExperienceLevel, UserRole } from "../backend";
import { Button } from "../components/ui/AipsButton";
import { useSaveProfile } from "../lib/backendQueries";
import { useProfileStore } from "../store/profileStore";

interface Step1Data {
  name: string;
  role: UserRole;
  experienceLevel: ExperienceLevel;
}

interface Step2Data {
  targetJobTitle: string;
}

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: UserRole.FrontendDeveloper, label: "Frontend Developer" },
  { value: UserRole.BackendDeveloper, label: "Backend Developer" },
  { value: UserRole.FullStack, label: "Full Stack Developer" },
  { value: UserRole.DataAnalyst, label: "Data Analyst" },
  { value: UserRole.DataScientist, label: "Data Scientist" },
  { value: UserRole.ProductManager, label: "Product Manager" },
  { value: UserRole.DevOps, label: "DevOps Engineer" },
];

const EXPERIENCE_OPTIONS: {
  value: ExperienceLevel;
  label: string;
  description: string;
}[] = [
  {
    value: ExperienceLevel.Junior,
    label: "Junior",
    description: "0–2 years of experience",
  },
  {
    value: ExperienceLevel.Mid,
    label: "Mid-Level",
    description: "2–5 years of experience",
  },
  {
    value: ExperienceLevel.Senior,
    label: "Senior",
    description: "5+ years of experience",
  },
];

const STEPS = [
  { label: "About You", icon: User },
  { label: "Your Goals", icon: Target },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useInternetIdentity();
  const [step, setStep] = useState(0);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const saveProfile = useSaveProfile();
  const setProfileStore = useProfileStore((s) => s.setProfile);

  const form1 = useForm<Step1Data>({
    defaultValues: {
      name: "",
      role: UserRole.FrontendDeveloper,
      experienceLevel: ExperienceLevel.Junior,
    },
  });
  const form2 = useForm<Step2Data>({
    defaultValues: { targetJobTitle: "" },
  });

  async function handleStep1(data: Step1Data) {
    setStep1Data(data);
    setStep(1);
  }

  async function handleStep2(data: Step2Data) {
    if (!step1Data) return;
    if (!isAuthenticated) {
      login();
      return;
    }
    try {
      const profile = await saveProfile.mutateAsync({
        name: step1Data.name,
        role: step1Data.role,
        experienceLevel: step1Data.experienceLevel,
        targetJobTitle: data.targetJobTitle,
      });
      setProfileStore({
        name: profile.name,
        role: profile.role,
        experienceLevel: profile.experienceLevel,
        targetJobTitle: profile.targetJobTitle,
        onboardingComplete: profile.onboardingComplete,
      });
      navigate({ to: "/dashboard" });
    } catch {
      // fallback navigate
      navigate({ to: "/dashboard" });
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 rounded-md bg-accent flex items-center justify-center glow-accent">
            <BrainCircuit size={20} className="text-accent-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            AIPS
          </span>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {STEPS.map(({ label, icon: Icon }, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${
                  i === step
                    ? "bg-accent/10 border border-accent/30 text-accent"
                    : i < step
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                }`}
                data-ocid={`onboarding.step.${i + 1}`}
              >
                {i < step ? (
                  <CheckCircle2 size={12} className="text-accent" />
                ) : (
                  <Icon size={12} />
                )}
                {label}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-8 h-px ${i < step ? "bg-accent/40" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-xl shadow-elevated overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="p-6 border-b border-border">
                  <h2 className="font-display font-bold text-xl text-foreground">
                    Tell us about yourself
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    We'll personalize your prep experience.
                  </p>
                </div>
                <form
                  onSubmit={form1.handleSubmit(handleStep1)}
                  className="p-6 space-y-5"
                >
                  <div>
                    <label
                      className="block text-sm font-medium text-foreground mb-1.5"
                      htmlFor="name"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      {...form1.register("name", {
                        required: "Name is required",
                      })}
                      placeholder="e.g. Alex Johnson"
                      className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                      data-ocid="onboarding.name_input"
                    />
                    {form1.formState.errors.name && (
                      <p
                        className="text-xs text-destructive mt-1"
                        data-ocid="onboarding.name_input.field_error"
                      >
                        {form1.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="block text-sm font-medium text-foreground mb-1.5">
                      Current Role / Track
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {ROLE_OPTIONS.map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => form1.setValue("role", value)}
                          className={`px-3 py-2 rounded-md border text-sm font-medium text-left transition-smooth ${
                            form1.watch("role") === value
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border bg-background text-muted-foreground hover:border-border hover:text-foreground"
                          }`}
                          data-ocid={`onboarding.role.${value.toLowerCase()}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="block text-sm font-medium text-foreground mb-1.5">
                      Experience Level
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {EXPERIENCE_OPTIONS.map(
                        ({ value, label, description }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() =>
                              form1.setValue("experienceLevel", value)
                            }
                            className={`px-3 py-3 rounded-md border text-left transition-smooth ${
                              form1.watch("experienceLevel") === value
                                ? "border-accent bg-accent/10"
                                : "border-border bg-background hover:border-border/80"
                            }`}
                            data-ocid={`onboarding.experience.${value.toLowerCase()}`}
                          >
                            <p
                              className={`text-sm font-medium ${form1.watch("experienceLevel") === value ? "text-accent" : "text-foreground"}`}
                            >
                              {label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {description}
                            </p>
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    className="w-full"
                    data-ocid="onboarding.next_button"
                  >
                    Continue
                    <ChevronRight size={16} />
                  </Button>
                </form>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="p-6 border-b border-border">
                  <h2 className="font-display font-bold text-xl text-foreground">
                    Define your goal
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    What role are you targeting?
                  </p>
                </div>
                <form
                  onSubmit={form2.handleSubmit(handleStep2)}
                  className="p-6 space-y-5"
                >
                  <div>
                    <label
                      className="block text-sm font-medium text-foreground mb-1.5"
                      htmlFor="targetJob"
                    >
                      Target Job Title
                    </label>
                    <input
                      id="targetJob"
                      {...form2.register("targetJobTitle", {
                        required: "Target job is required",
                      })}
                      placeholder="e.g. Senior Frontend Engineer at Stripe"
                      className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                      data-ocid="onboarding.target_job_input"
                    />
                    {form2.formState.errors.targetJobTitle && (
                      <p
                        className="text-xs text-destructive mt-1"
                        data-ocid="onboarding.target_job_input.field_error"
                      >
                        {form2.formState.errors.targetJobTitle.message}
                      </p>
                    )}
                  </div>

                  <div className="bg-muted/40 rounded-lg p-4 border border-border">
                    <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                      Your profile summary
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground">
                        <span className="text-muted-foreground">Name: </span>
                        {step1Data?.name}
                      </p>
                      <p className="text-sm text-foreground">
                        <span className="text-muted-foreground">Role: </span>
                        {
                          ROLE_OPTIONS.find((r) => r.value === step1Data?.role)
                            ?.label
                        }
                      </p>
                      <p className="text-sm text-foreground">
                        <span className="text-muted-foreground">
                          Experience:{" "}
                        </span>
                        {
                          EXPERIENCE_OPTIONS.find(
                            (e) => e.value === step1Data?.experienceLevel,
                          )?.label
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep(0)}
                      data-ocid="onboarding.back_button"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="accent"
                      className="flex-1"
                      disabled={saveProfile.isPending}
                      data-ocid="onboarding.submit_button"
                    >
                      {saveProfile.isPending
                        ? "Saving..."
                        : isAuthenticated
                          ? "Start Preparing"
                          : "Sign In & Start"}
                      <ChevronRight size={16} />
                    </Button>
                  </div>

                  {saveProfile.isError && (
                    <p
                      className="text-xs text-destructive text-center"
                      data-ocid="onboarding.error_state"
                    >
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-micro mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => login()}
            className="text-accent hover:underline"
            data-ocid="onboarding.sign_in_link"
          >
            Sign in
          </button>
        </p>
      </div>
      <footer className="py-4 px-6">
        <p className="text-center text-micro">
          &copy; {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
