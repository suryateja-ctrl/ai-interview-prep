import Common "common";

module {
  public type SkillGapEntry = {
    skill : Text;
    currentLevel : Nat;
    targetLevel : Nat;
    priority : Nat;
    studyResources : [Text];
  };

  public type StudyPlanItem = {
    skill : Text;
    topicIds : [Common.TopicId];
    estimatedHours : Nat;
    priority : Nat;
  };

  public type SkillGapResult = {
    weakSkills : [SkillGapEntry];
    studyPlan : [StudyPlanItem];
    overallReadiness : Nat;
  };

  public type ScoreTrend = {
    sessionId : Common.SessionId;
    score : Nat;
    completedAt : Common.Timestamp;
  };

  public type ProgressReport = {
    userId : Common.UserId;
    readinessScore : Nat;
    mockSessionsCompleted : Nat;
    averageScore : Nat;
    scoreTrends : [ScoreTrend];
    topicsCompleted : Nat;
    topicsTotal : Nat;
    skillsAcquired : [Text];
    lastUpdated : Common.Timestamp;
  };
};
