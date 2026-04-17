import Common "common";

module {
  public type ScoringRubric = {
    excellent : Text;
    good : Text;
    fair : Text;
    poor : Text;
  };

  public type InterviewQuestion = {
    id : Common.QuestionId;
    role : Common.UserRole;
    questionType : Common.QuestionType;
    difficulty : Common.Difficulty;
    question : Text;
    idealAnswer : Text;
    rubric : ScoringRubric;
    tags : [Text];
  };

  public type MockSessionTurn = {
    questionId : Common.QuestionId;
    question : Text;
    userAnswer : Text;
    score : Nat;
    feedback : Text;
    answeredAt : Common.Timestamp;
  };

  public type MockSession = {
    id : Common.SessionId;
    userId : Common.UserId;
    role : Common.UserRole;
    difficulty : Common.Difficulty;
    turns : [MockSessionTurn];
    currentQuestionIndex : Nat;
    questionIds : [Common.QuestionId];
    totalScore : Nat;
    isComplete : Bool;
    startedAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
  };

  public type SessionStartResult = {
    sessionId : Common.SessionId;
    firstQuestion : InterviewQuestion;
  };

  public type AnswerSubmitResult = {
    score : Nat;
    feedback : Text;
    nextQuestion : ?InterviewQuestion;
    sessionComplete : Bool;
    finalScore : ?Nat;
  };
};
