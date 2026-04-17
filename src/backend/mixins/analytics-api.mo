import Map "mo:core/Map";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import AnalyticsLib "../lib/analytics";
import AnalyticsTypes "../types/analytics";
import InterviewTypes "../types/interview";
import StudyTypes "../types/study";
import ProfileTypes "../types/profile";
import Common "../types/common";

mixin (
  _accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
  sessions : Map.Map<Common.SessionId, InterviewTypes.MockSession>,
  topicProgress : Map.Map<Text, StudyTypes.UserTopicProgress>,
  topicsTotal : Nat,
) {
  public query ({ caller }) func getSkillGapAnalysis() : async AnalyticsTypes.SkillGapResult {
    let role : Common.UserRole = switch (profiles.get(caller)) {
      case (?p) p.role;
      case null #FrontendDeveloper;
    };
    AnalyticsLib.computeSkillGap(sessions, caller, role)
  };

  public query ({ caller }) func getProgressReport() : async AnalyticsTypes.ProgressReport {
    AnalyticsLib.getProgressReport(sessions, topicProgress, topicsTotal, caller, Time.now())
  };
};
