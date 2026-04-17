import Map "mo:core/Map";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import ResumeLib "../lib/resume";
import ResumeTypes "../types/resume";
import Common "../types/common";

mixin (
  _accessControlState : AccessControl.AccessControlState,
  resumes : Map.Map<Common.UserId, ResumeTypes.ResumeData>,
) {
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input)
  };

  public query ({ caller }) func getResume() : async ?ResumeTypes.ResumeData {
    ResumeLib.getResume(resumes, caller)
  };

  public shared ({ caller }) func saveResume(input : ResumeTypes.ResumeInput) : async ResumeTypes.ResumeData {
    ResumeLib.saveResume(resumes, caller, input, Time.now())
  };

  public shared ({ caller }) func generateResume(input : ResumeTypes.ResumeInput) : async ResumeTypes.ResumeGenerationResult {
    let now = Time.now();
    // Build a prompt for the AI
    let skillsList = input.skills.foldLeft("", func(acc, s) {
      if (acc == "") s else acc # ", " # s
    });
    let prompt = "Generate an ATS-friendly professional resume summary for a " # input.targetRole #
      " with skills: " # skillsList # ". Return JSON with fields: summary (string), suggestions (array of strings), keywords (array of strings).";
    let body = "{\"model\":\"llama3-8b-8192\",\"messages\":[{\"role\":\"user\",\"content\":\"" # prompt # "\"}],\"max_tokens\":800}";
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
    ];
    // Attempt AI call; fall back to demo on any error
    try {
      let rawJson = await OutCall.httpPostRequest(
        "https://api.groq.com/openai/v1/chat/completions",
        headers,
        body,
        transform,
      );
      let result = ResumeLib.parseGenerationResult(caller, rawJson, input, now);
      // Always save the generated resume
      ignore ResumeLib.saveResume(resumes, caller, input, now);
      result
    } catch (_) {
      let result = ResumeLib.buildDemoGenerationResult(caller, input, now);
      ignore ResumeLib.saveResume(resumes, caller, input, now);
      result
    }
  };
};
