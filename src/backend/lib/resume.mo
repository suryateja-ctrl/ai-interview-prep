import Map "mo:core/Map";
import Types "../types/resume";
import Common "../types/common";

module {
  public func getResume(
    resumes : Map.Map<Common.UserId, Types.ResumeData>,
    userId : Common.UserId,
  ) : ?Types.ResumeData {
    resumes.get(userId)
  };

  public func saveResume(
    resumes : Map.Map<Common.UserId, Types.ResumeData>,
    userId : Common.UserId,
    input : Types.ResumeInput,
    now : Common.Timestamp,
  ) : Types.ResumeData {
    let resume : Types.ResumeData = {
      userId = userId;
      summary = input.summary;
      targetRole = input.targetRole;
      skills = input.skills;
      education = input.education;
      experience = input.experience;
      updatedAt = now;
    };
    resumes.add(userId, resume);
    resume
  };

  public func buildDemoGenerationResult(
    userId : Common.UserId,
    input : Types.ResumeInput,
    now : Common.Timestamp,
  ) : Types.ResumeGenerationResult {
    let enhancedSummary = "Results-driven " # input.targetRole # " with proven expertise in " #
      (if (input.skills.size() > 0) input.skills[0] else "software development") #
      ". Passionate about delivering high-quality solutions and collaborating with cross-functional teams to achieve business objectives.";
    let resume : Types.ResumeData = {
      userId = userId;
      summary = enhancedSummary;
      targetRole = input.targetRole;
      skills = input.skills;
      education = input.education;
      experience = input.experience;
      updatedAt = now;
    };
    {
      resume = resume;
      suggestions = [
        "Add quantifiable metrics to your experience descriptions (e.g., 'Improved performance by 40%')",
        "Include relevant keywords from job descriptions to pass ATS filters",
        "Use strong action verbs: led, architected, optimized, delivered, reduced",
        "Add a projects section to showcase hands-on work",
        "Tailor your summary specifically for each application",
      ];
      keywords = [
        "agile", "cross-functional", "scalable", "optimization",
        "leadership", "problem-solving", "communication", input.targetRole,
      ];
      isDemo = true;
    }
  };

  public func parseGenerationResult(
    userId : Common.UserId,
    _rawJson : Text,
    input : Types.ResumeInput,
    now : Common.Timestamp,
  ) : Types.ResumeGenerationResult {
    // JSON parsing not natively supported — return demo result using input
    buildDemoGenerationResult(userId, input, now)
  };
};
