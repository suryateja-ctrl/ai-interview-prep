import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  FileText,
  MessageSquare,
  Mic,
  Target,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui/AipsButton";

const FEATURES = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    description:
      "Generate ATS-optimized resumes with keyword suggestions, action verbs, and quantifiable metrics tailored to your target role.",
  },
  {
    icon: MessageSquare,
    title: "Interview Q&A",
    description:
      "Get 10–15 role-specific technical and behavioral questions with ideal answers and detailed scoring rubrics.",
  },
  {
    icon: Mic,
    title: "Mock Interviews",
    description:
      "Simulate real interview sessions with AI that evaluates your responses on relevance, clarity, and confidence.",
  },
  {
    icon: BookOpen,
    title: "Study Topics",
    description:
      "Access curated learning paths with core concepts, subtopics, and vetted resources by role and domain.",
  },
  {
    icon: BarChart2,
    title: "Analytics Dashboard",
    description:
      "Track readiness scores, session history, and skill progression with visual performance trends.",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description:
      "Identify weak areas from your mock sessions and get a prioritized, personalized study plan.",
  },
];

const BENEFITS = [
  "Role-specific preparation for 7+ tech tracks",
  "AI-generated feedback on every answer",
  "Real-time readiness score tracking",
  "Structured study plans by skill gap",
];

export function HomePage() {
  const { login, isAuthenticated, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();

  function handleGetStarted() {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    } else {
      login();
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center glow-accent">
            <BrainCircuit size={18} className="text-accent-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            AIPS
          </span>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Button
              variant="accent"
              size="sm"
              onClick={() => navigate({ to: "/dashboard" })}
              data-ocid="home.go_to_dashboard_button"
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button
              variant="accent"
              size="sm"
              onClick={login}
              disabled={isInitializing}
              data-ocid="home.login_button"
            >
              Sign In with Internet Identity
            </Button>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden bg-background px-6 py-24">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.72 0.18 185 / 0.15) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
              <Zap size={12} />
              AI-Powered Interview Preparation
            </div>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-foreground leading-tight mb-6">
              Land Your Dream Role
              <br />
              <span className="text-accent">with AI Confidence</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              AIPS is your end-to-end interview preparation companion. Build a
              standout resume, master role-specific Q&amp;A, simulate real
              interviews, and track your readiness to success.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="hero"
                onClick={handleGetStarted}
                disabled={isInitializing}
                data-ocid="home.hero_cta_button"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
                <ArrowRight size={18} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="home.learn_more_button"
              >
                See Features
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            <div className="relative rounded-xl overflow-hidden border border-border shadow-elevated mx-auto max-w-3xl">
              <img
                src="/assets/generated/hero-aips.dim_1200x600.png"
                alt="AIPS Dashboard Preview"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="bg-card border-y border-border py-5 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2">
          {BENEFITS.map((b) => (
            <div
              key={b}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-background py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-3">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              From resume to offer letter — AIPS covers every stage of your
              interview journey.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="card-data p-5"
                data-ocid={`home.feature.${i + 1}`}
              >
                <div className="w-10 h-10 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-accent" />
                </div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-alt border-t border-border py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-4">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-muted-foreground mb-8">
              Sign in with Internet Identity and start your personalized prep
              journey in minutes.
            </p>
            <Button
              variant="hero"
              onClick={handleGetStarted}
              disabled={isInitializing}
              data-ocid="home.bottom_cta_button"
            >
              {isAuthenticated ? "Go to Dashboard" : "Start Preparing Now"}
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center">
              <BrainCircuit size={12} className="text-accent" />
            </div>
            <span className="font-display font-semibold text-sm text-foreground">
              AIPS
            </span>
          </div>
          <p className="text-micro text-center">
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
        </div>
      </footer>
    </div>
  );
}
