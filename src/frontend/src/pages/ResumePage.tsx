import {
  Download,
  FileText,
  Lightbulb,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Tag,
  Trash2,
  User,
  Wand2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { ResumeInput } from "../backend";
import { Badge } from "../components/ui/AipsBadge";
import { Button } from "../components/ui/AipsButton";
import { EmptyState } from "../components/ui/EmptyState";
import { PageLoader } from "../components/ui/LoadingSpinner";
import { PageHeader } from "../components/ui/PageHeader";
import {
  useGenerateResume,
  useGetProfile,
  useGetResume,
  useSaveResume,
} from "../lib/backendQueries";

// Personal info lives in local state (not part of ResumeInput schema)
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

const PERSONAL_STORAGE_KEY = "aips_resume_personal_info";

function loadPersonal(): PersonalInfo {
  try {
    const stored = localStorage.getItem(PERSONAL_STORAGE_KEY);
    if (stored) return JSON.parse(stored) as PersonalInfo;
  } catch {
    // ignore
  }
  return { name: "", email: "", phone: "", location: "" };
}

function savePersonal(info: PersonalInfo) {
  try {
    localStorage.setItem(PERSONAL_STORAGE_KEY, JSON.stringify(info));
  } catch {
    // ignore
  }
}

// ----------- Sub-components -----------

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
      {children}
    </h3>
  );
}

function FormSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`card-data p-5 space-y-4 ${className ?? ""}`}>
      {children}
    </div>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

const inputClass =
  "w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/60 transition-smooth";
const inputClassSm =
  "px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/60 transition-smooth w-full";

// ----------- Preview Component -----------

interface ResumePreviewProps {
  personal: PersonalInfo;
  targetRole: string;
  summary: string;
  skills: string[];
  education: ResumeInput["education"];
  experience: ResumeInput["experience"];
}

function ResumePreview({
  personal,
  targetRole,
  summary,
  skills,
  education,
  experience,
}: ResumePreviewProps) {
  const hasContent =
    personal.name ||
    targetRole ||
    summary ||
    skills.some(Boolean) ||
    education.some((e) => e.institution) ||
    experience.some((e) => e.company);

  if (!hasContent) {
    return (
      <EmptyState
        icon={<FileText size={24} />}
        title="Preview will appear here"
        description="Fill in the form on the left to see your resume preview."
        data-ocid="resume.preview.empty_state"
      />
    );
  }

  const validSkills = skills.filter(Boolean);
  const validEducation = education.filter((e) => e.institution);
  const validExperience = experience.filter((e) => e.company);

  return (
    <div
      className="font-body space-y-5 text-foreground"
      data-ocid="resume.preview"
      id="resume-print-area"
    >
      {/* Header */}
      <div className="border-b border-border pb-4">
        {personal.name && (
          <h1 className="font-display font-bold text-2xl text-foreground">
            {personal.name}
          </h1>
        )}
        {targetRole && (
          <p className="text-accent font-medium text-sm mt-0.5">{targetRole}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          {personal.email && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Mail size={11} />
              {personal.email}
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Phone size={11} />
              {personal.phone}
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={11} />
              {personal.location}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <h2 className="stat-label mb-2">Summary</h2>
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Skills */}
      {validSkills.length > 0 && (
        <div>
          <h2 className="stat-label mb-2">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {validSkills.map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {validExperience.length > 0 && (
        <div>
          <h2 className="stat-label mb-3">Experience</h2>
          <div className="space-y-4">
            {validExperience.map((exp, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: preview uses stable index
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="font-semibold text-sm">{exp.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {exp.company}
                    </p>
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-xs text-muted-foreground">
                      {exp.startDate}
                      {exp.endDate ? ` – ${exp.endDate}` : " – Present"}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {exp.description}
                  </p>
                )}
                {exp.achievements?.filter(Boolean).length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.achievements.filter(Boolean).map((a) => (
                      <li
                        key={a as string}
                        className="flex gap-2 text-xs text-muted-foreground"
                      >
                        <span className="text-accent mt-0.5">•</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {validEducation.length > 0 && (
        <div>
          <h2 className="stat-label mb-3">Education</h2>
          <div className="space-y-3">
            {validEducation.map((edu, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: stable index
              <div key={i} className="flex justify-between items-baseline">
                <div>
                  <p className="font-semibold text-sm">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground">
                    {edu.degree}
                    {edu.field ? `, ${edu.field}` : ""}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {edu.startYear ? edu.startYear.toString() : ""}
                  {edu.endYear ? ` – ${edu.endYear.toString()}` : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ----------- Main Page -----------

export function ResumePage() {
  const { data: resume, isLoading } = useGetResume();
  const { data: profile } = useGetProfile();
  const saveResume = useSaveResume();
  const generateResume = useGenerateResume();
  const [personal, setPersonal] = useState<PersonalInfo>(loadPersonal);
  const [skillInput, setSkillInput] = useState("");
  const [generationResult, setGenerationResult] = useState<{
    suggestions: string[];
    keywords: string[];
    isDemo: boolean;
  } | null>(null);
  const skillInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm<ResumeInput>({
      defaultValues: {
        summary: "",
        targetRole: profile?.targetJobTitle ?? "",
        skills: [],
        education: [
          { institution: "", degree: "", field: "", startYear: BigInt(2020) },
        ],
        experience: [
          {
            company: "",
            title: "",
            description: "",
            achievements: [""],
            startDate: "",
          },
        ],
      },
    });

  // Populate form once resume loads
  useEffect(() => {
    if (resume) {
      setValue("summary", resume.summary);
      setValue("targetRole", resume.targetRole);
      setValue("skills", resume.skills);
      setValue("education", resume.education);
      setValue("experience", resume.experience);
    }
  }, [resume, setValue]);

  // Populate targetRole from profile
  useEffect(() => {
    if (profile?.targetJobTitle && !getValues("targetRole")) {
      setValue("targetRole", profile.targetJobTitle);
    }
  }, [profile, setValue, getValues]);

  const eduFields = useFieldArray({ control, name: "education" });
  const expFields = useFieldArray({ control, name: "experience" });

  const watchedSkills = watch("skills") ?? [];
  const watchedValues = watch();

  function updatePersonal(field: keyof PersonalInfo, value: string) {
    setPersonal((prev) => {
      const updated = { ...prev, [field]: value };
      savePersonal(updated);
      return updated;
    });
  }

  function addSkill() {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    const current = getValues("skills") ?? [];
    if (!current.includes(trimmed)) {
      setValue("skills", [...current, trimmed]);
    }
    setSkillInput("");
    skillInputRef.current?.focus();
  }

  function removeSkill(skill: string) {
    const current = getValues("skills") ?? [];
    setValue(
      "skills",
      current.filter((s) => s !== skill),
    );
  }

  async function onSave(data: ResumeInput) {
    try {
      await saveResume.mutateAsync(data);
      toast.success("Resume saved successfully");
    } catch {
      toast.error("Failed to save resume");
    }
  }

  async function onGenerate() {
    const data = getValues();
    try {
      const result = await generateResume.mutateAsync(data);
      setGenerationResult({
        suggestions: result.suggestions,
        keywords: result.keywords,
        isDemo: result.isDemo,
      });
      // Populate form with generated content
      setValue("summary", result.resume.summary);
      setValue("targetRole", result.resume.targetRole);
      setValue("skills", result.resume.skills);
      if (result.resume.education.length > 0)
        setValue("education", result.resume.education);
      if (result.resume.experience.length > 0)
        setValue("experience", result.resume.experience);
      toast.success("Resume generated! Review and save.");
    } catch {
      toast.error("Generation failed, please try again.");
    }
  }

  function onExportPDF() {
    window.print();
  }

  if (isLoading) return <PageLoader />;

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #resume-print-root { display: block !important; }
        }
        #resume-print-root { display: none; }
      `}</style>

      <div className="flex flex-col h-full" data-ocid="resume.page">
        <PageHeader
          title="Resume Builder"
          subtitle="Build an ATS-optimized resume tailored to your target role"
          actions={
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={onExportPDF}
                data-ocid="resume.export_button"
              >
                <Download size={14} />
                Export PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onGenerate}
                disabled={generateResume.isPending}
                data-ocid="resume.generate_button"
              >
                {generateResume.isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Wand2 size={14} />
                )}
                {generateResume.isPending ? "Generating…" : "AI Generate"}
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={handleSubmit(onSave)}
                disabled={saveResume.isPending}
                data-ocid="resume.save_button"
              >
                {saveResume.isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                {saveResume.isPending ? "Saving…" : "Save Resume"}
              </Button>
            </div>
          }
        />

        {/* Two-column layout */}
        <div className="flex-1 overflow-hidden flex">
          {/* LEFT — Form */}
          <div
            className="w-full lg:w-1/2 overflow-y-auto p-6 border-r border-border space-y-5"
            data-ocid="resume.form_panel"
          >
            {/* AI Result Banner */}
            {generationResult && (
              <div
                className="bg-accent/5 border border-accent/20 rounded-lg p-4"
                data-ocid="resume.generation_result"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Wand2 size={14} className="text-accent" />
                    <p className="text-sm font-semibold text-foreground">
                      AI Suggestions
                    </p>
                    {generationResult.isDemo && (
                      <Badge variant="muted">Demo</Badge>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setGenerationResult(null)}
                    className="text-muted-foreground hover:text-foreground transition-smooth"
                    aria-label="Dismiss suggestions"
                    data-ocid="resume.dismiss_suggestions_button"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {generationResult.keywords.map((k) => (
                    <Badge key={k} variant="accent">
                      {k}
                    </Badge>
                  ))}
                </div>
                <ul className="space-y-1">
                  {generationResult.suggestions.map((s) => (
                    <li
                      key={s.slice(0, 40)}
                      className="text-xs text-muted-foreground flex gap-2"
                    >
                      <span className="text-accent mt-0.5">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit(onSave)}>
              {/* Personal Info */}
              <FormSection>
                <SectionHeading>
                  <User size={14} className="text-accent" />
                  Personal Information
                </SectionHeading>
                <input
                  value={personal.name}
                  onChange={(e) => updatePersonal("name", e.target.value)}
                  placeholder="Full Name"
                  className={inputClass}
                  data-ocid="resume.personal_name_input"
                />
                <FieldRow>
                  <input
                    value={personal.email}
                    onChange={(e) => updatePersonal("email", e.target.value)}
                    placeholder="Email"
                    type="email"
                    className={inputClassSm}
                    data-ocid="resume.personal_email_input"
                  />
                  <input
                    value={personal.phone}
                    onChange={(e) => updatePersonal("phone", e.target.value)}
                    placeholder="Phone"
                    type="tel"
                    className={inputClassSm}
                    data-ocid="resume.personal_phone_input"
                  />
                </FieldRow>
                <input
                  value={personal.location}
                  onChange={(e) => updatePersonal("location", e.target.value)}
                  placeholder="Location (e.g. San Francisco, CA)"
                  className={inputClass}
                  data-ocid="resume.personal_location_input"
                />
              </FormSection>

              {/* Target Role + Summary */}
              <FormSection>
                <SectionHeading>
                  <FileText size={14} className="text-accent" />
                  Summary
                </SectionHeading>
                <input
                  {...register("targetRole")}
                  placeholder="Target Role (e.g. Senior Frontend Engineer)"
                  className={inputClass}
                  data-ocid="resume.target_role_input"
                />
                <textarea
                  {...register("summary")}
                  rows={4}
                  placeholder="Write a compelling professional summary that highlights your key strengths..."
                  className={`${inputClass} resize-none`}
                  data-ocid="resume.summary_textarea"
                />
              </FormSection>

              {/* Skills */}
              <FormSection>
                <SectionHeading>
                  <Tag size={14} className="text-accent" />
                  Skills
                </SectionHeading>
                <div className="flex flex-wrap gap-1.5 min-h-8">
                  {watchedSkills.filter(Boolean).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-medium"
                      data-ocid="resume.skill_tag"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-destructive transition-smooth"
                        aria-label={`Remove ${skill}`}
                        data-ocid="resume.skill_remove_button"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    ref={skillInputRef}
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    placeholder="Add a skill (e.g. React, Python)"
                    className={`${inputClassSm} flex-1`}
                    data-ocid="resume.skill_input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSkill}
                    data-ocid="resume.add_skill_button"
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              </FormSection>

              {/* Education */}
              <FormSection>
                <div className="flex items-center justify-between">
                  <SectionHeading>Education</SectionHeading>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      eduFields.append({
                        institution: "",
                        degree: "",
                        field: "",
                        startYear: BigInt(2020),
                      })
                    }
                    data-ocid="resume.add_education_button"
                  >
                    <Plus size={14} /> Add
                  </Button>
                </div>
                <div className="space-y-4">
                  {eduFields.fields.map((field, i) => (
                    <div
                      key={field.id}
                      className="p-4 rounded-md border border-border bg-muted/20 space-y-3"
                      data-ocid={`resume.education.${i + 1}`}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-medium text-muted-foreground">
                          Education {i + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => eduFields.remove(i)}
                          className="text-muted-foreground hover:text-destructive transition-smooth"
                          aria-label="Remove education"
                          data-ocid={`resume.education.delete_button.${i + 1}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <FieldRow>
                        <input
                          {...register(`education.${i}.institution`)}
                          placeholder="Institution"
                          className={inputClassSm}
                        />
                        <input
                          {...register(`education.${i}.degree`)}
                          placeholder="Degree"
                          className={inputClassSm}
                        />
                      </FieldRow>
                      <FieldRow>
                        <input
                          {...register(`education.${i}.field`)}
                          placeholder="Field of Study"
                          className={inputClassSm}
                        />
                        <input
                          {...register(`education.${i}.gpa`)}
                          placeholder="GPA (optional)"
                          className={inputClassSm}
                        />
                      </FieldRow>
                      <FieldRow>
                        <input
                          {...register(`education.${i}.startYear`, {
                            setValueAs: (v: string) =>
                              v ? BigInt(v) : BigInt(2020),
                          })}
                          placeholder="Start Year"
                          type="number"
                          className={inputClassSm}
                        />
                        <input
                          {...register(`education.${i}.endYear`, {
                            setValueAs: (v: string) =>
                              v ? BigInt(v) : undefined,
                          })}
                          placeholder="End Year (or leave blank)"
                          type="number"
                          className={inputClassSm}
                        />
                      </FieldRow>
                    </div>
                  ))}
                </div>
              </FormSection>

              {/* Experience */}
              <FormSection>
                <div className="flex items-center justify-between">
                  <SectionHeading>Experience</SectionHeading>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      expFields.append({
                        company: "",
                        title: "",
                        description: "",
                        achievements: [""],
                        startDate: "",
                      })
                    }
                    data-ocid="resume.add_experience_button"
                  >
                    <Plus size={14} /> Add
                  </Button>
                </div>
                <div className="space-y-4">
                  {expFields.fields.map((field, i) => (
                    <div
                      key={field.id}
                      className="p-4 rounded-md border border-border bg-muted/20 space-y-3"
                      data-ocid={`resume.experience.${i + 1}`}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-medium text-muted-foreground">
                          Position {i + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => expFields.remove(i)}
                          className="text-muted-foreground hover:text-destructive transition-smooth"
                          aria-label="Remove experience"
                          data-ocid={`resume.experience.delete_button.${i + 1}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <FieldRow>
                        <input
                          {...register(`experience.${i}.company`)}
                          placeholder="Company"
                          className={inputClassSm}
                        />
                        <input
                          {...register(`experience.${i}.title`)}
                          placeholder="Job Title"
                          className={inputClassSm}
                        />
                      </FieldRow>
                      <FieldRow>
                        <input
                          {...register(`experience.${i}.startDate`)}
                          placeholder="Start (e.g. Jan 2022)"
                          className={inputClassSm}
                        />
                        <input
                          {...register(`experience.${i}.endDate`)}
                          placeholder="End (or leave blank)"
                          className={inputClassSm}
                        />
                      </FieldRow>
                      <textarea
                        {...register(`experience.${i}.description`)}
                        placeholder="Describe your role and responsibilities..."
                        rows={2}
                        className={`${inputClass} resize-none`}
                      />
                      {/* Achievements */}
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-medium">
                          Key Achievements
                        </p>
                        {(watch(`experience.${i}.achievements`) ?? [""]).map(
                          (_ach, ai) => (
                            <div
                              // biome-ignore lint/suspicious/noArrayIndexKey: stable
                              key={ai}
                              className="flex gap-2 items-center"
                            >
                              <span className="text-accent text-xs">•</span>
                              <input
                                {...register(
                                  `experience.${i}.achievements.${ai}`,
                                )}
                                placeholder="Quantifiable achievement..."
                                className={`${inputClassSm} flex-1`}
                                data-ocid={`resume.experience.achievement.${i + 1}.${ai + 1}`}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const current =
                                    getValues(`experience.${i}.achievements`) ??
                                    [];
                                  setValue(
                                    `experience.${i}.achievements`,
                                    current.filter((_, idx) => idx !== ai),
                                  );
                                }}
                                className="text-muted-foreground hover:text-destructive transition-smooth flex-shrink-0"
                                aria-label="Remove achievement"
                              >
                                <X size={13} />
                              </button>
                            </div>
                          ),
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            const current =
                              getValues(`experience.${i}.achievements`) ?? [];
                            setValue(`experience.${i}.achievements`, [
                              ...current,
                              "",
                            ]);
                          }}
                          className="text-xs text-accent hover:underline transition-smooth flex items-center gap-1"
                          data-ocid={`resume.add_achievement_button.${i + 1}`}
                        >
                          <Plus size={11} /> Add achievement
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </FormSection>

              <Button
                type="submit"
                variant="accent"
                className="w-full"
                disabled={saveResume.isPending}
                data-ocid="resume.submit_button"
              >
                {saveResume.isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                {saveResume.isPending ? "Saving…" : "Save Resume"}
              </Button>
            </form>
          </div>

          {/* RIGHT — Preview + Suggestions */}
          <div
            className="hidden lg:flex flex-col w-1/2 overflow-y-auto bg-muted/20"
            data-ocid="resume.preview_panel"
          >
            {/* Preview */}
            <div className="flex-1 p-6">
              <div className="card-data p-6 min-h-full">
                <ResumePreview
                  personal={personal}
                  targetRole={watchedValues.targetRole ?? ""}
                  summary={watchedValues.summary ?? ""}
                  skills={watchedValues.skills ?? []}
                  education={watchedValues.education ?? []}
                  experience={watchedValues.experience ?? []}
                />
              </div>
            </div>

            {/* Improvement Suggestions */}
            {generationResult && generationResult.suggestions.length > 0 && (
              <div
                className="border-t border-border p-6 bg-card"
                data-ocid="resume.suggestions_panel"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={15} className="text-accent" />
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    Improvement Tips
                  </h3>
                  {generationResult.isDemo && (
                    <Badge variant="muted">Demo</Badge>
                  )}
                </div>
                <ul className="space-y-2">
                  {generationResult.suggestions.map((s, si) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: stable index
                      key={si}
                      className="flex gap-2.5 text-xs text-muted-foreground p-2.5 rounded-md bg-accent/5 border border-accent/10"
                      data-ocid={`resume.suggestion.${si + 1}`}
                    >
                      <span className="text-accent font-bold mt-0.5 flex-shrink-0">
                        {si + 1}.
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>

                {generationResult.keywords.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Recommended Keywords
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {generationResult.keywords.map((k) => (
                        <Badge key={k} variant="accent">
                          {k}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hidden print area — mirrors the preview */}
      <div id="resume-print-root" className="p-12 max-w-3xl mx-auto">
        <ResumePreview
          personal={personal}
          targetRole={watchedValues.targetRole ?? ""}
          summary={watchedValues.summary ?? ""}
          skills={watchedValues.skills ?? []}
          education={watchedValues.education ?? []}
          experience={watchedValues.experience ?? []}
        />
      </div>
    </>
  );
}
