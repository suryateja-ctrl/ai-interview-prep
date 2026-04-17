import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import InterviewLib "../lib/interview";
import InterviewTypes "../types/interview";
import Common "../types/common";

mixin (
  _accessControlState : AccessControl.AccessControlState,
  questions : List.List<InterviewTypes.InterviewQuestion>,
  sessions : Map.Map<Common.SessionId, InterviewTypes.MockSession>,
) {
  var nextSessionId : Nat = 0;

  public query ({ caller = _ }) func getInterviewQuestions(role : Common.UserRole, difficulty : ?Common.Difficulty) : async [InterviewTypes.InterviewQuestion] {
    InterviewLib.getQuestionsByRole(questions, role, difficulty)
  };

  public shared ({ caller }) func startMockSession(role : Common.UserRole, difficulty : Common.Difficulty) : async InterviewTypes.SessionStartResult {
    let result = InterviewLib.startSession(sessions, questions, nextSessionId, caller, role, difficulty, Time.now());
    nextSessionId += 1;
    result
  };

  public shared ({ caller }) func submitAnswer(sessionId : Common.SessionId, answer : Text) : async InterviewTypes.AnswerSubmitResult {
    InterviewLib.submitAnswer(sessions, questions, sessionId, caller, answer, Time.now())
  };

  public query ({ caller }) func getMockSession(sessionId : Common.SessionId) : async ?InterviewTypes.MockSession {
    InterviewLib.getSession(sessions, sessionId, caller)
  };

  public query ({ caller }) func getUserMockSessions() : async [InterviewTypes.MockSession] {
    InterviewLib.getUserSessions(sessions, caller)
  };
};
