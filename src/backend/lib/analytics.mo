import Map "mo:core/Map";
import List "mo:core/List";
import AnalyticsTypes "../types/analytics";
import InterviewTypes "../types/interview";
import StudyTypes "../types/study";
import Common "../types/common";

module {
  // Skill areas for gap analysis
  let skillAreas : [Text] = [
    "JavaScript / Programming Fundamentals",
    "CSS & Styling",
    "React / Frontend Frameworks",
    "System Design & Architecture",
    "Databases & SQL",
    "API Design",
    "Security",
    "Caching & Performance",
    "Concurrency & Async",
    "Statistics & Analysis",
    "Data Visualization",
    "Python & Data Tools",
    "Metrics & Business Analysis",
    "Data Cleaning & Quality",
    "Behavioral & Soft Skills",
  ];

  public func computeSkillGap(
    sessions : Map.Map<Common.SessionId, InterviewTypes.MockSession>,
    userId : Common.UserId,
    _role : Common.UserRole,
  ) : AnalyticsTypes.SkillGapResult {
    // Gather all completed sessions for user
    let userSessions = List.empty<InterviewTypes.MockSession>();
    for ((_id, s) in sessions.entries()) {
      if (s.userId == userId and s.isComplete) userSessions.add(s);
    };

    if (userSessions.size() == 0) {
      // No sessions yet — return generic gaps
      return {
        weakSkills = [
          { skill = "JavaScript / Programming Fundamentals"; currentLevel = 0; targetLevel = 80; priority = 1; studyResources = ["https://javascript.info/", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"] },
          { skill = "System Design & Architecture"; currentLevel = 0; targetLevel = 75; priority = 2; studyResources = ["https://github.com/donnemartin/system-design-primer"] },
          { skill = "Databases & SQL"; currentLevel = 0; targetLevel = 80; priority = 3; studyResources = ["https://use-the-index-luke.com/", "https://mode.com/sql-tutorial/"] },
        ];
        studyPlan = [
          { skill = "JavaScript / Programming Fundamentals"; topicIds = [0]; estimatedHours = 20; priority = 1 },
          { skill = "System Design & Architecture"; topicIds = [8]; estimatedHours = 15; priority = 2 },
          { skill = "Databases & SQL"; topicIds = [9, 16]; estimatedHours = 12; priority = 3 },
        ];
        overallReadiness = 0;
      };
    };

    // Aggregate scores across all turns in all sessions
    // Each turn's score is applied to all skill areas as a general proxy
    let skillScores = Map.empty<Text, (Nat, Nat)>(); // skill -> (totalScore, count)
    for (session in userSessions.values()) {
      for (turn in session.turns.values()) {
        for (skillName in skillAreas.values()) {
          let existing = skillScores.get(skillName);
          switch (existing) {
            case (?(total, count)) {
              skillScores.add(skillName, (total + turn.score, count + 1));
            };
            case null {
              skillScores.add(skillName, (turn.score, 1));
            };
          };
        };
      };
    };

    // Find weak skills (avg score < 65)
    let weakSkills = List.empty<AnalyticsTypes.SkillGapEntry>();
    var priority = 1;
    for ((skillName, (total, count)) in skillScores.entries()) {
      let avg = if (count == 0) 0 else total / count;
      if (avg < 65 and priority <= 5) {
        weakSkills.add({
          skill = skillName;
          currentLevel = avg;
          targetLevel = 80;
          priority = priority;
          studyResources = ["https://developer.mozilla.org/", "https://roadmap.sh/"];
        });
        priority += 1;
      };
    };

    // Build study plan from weak skills
    let studyPlan = weakSkills.map<AnalyticsTypes.SkillGapEntry, AnalyticsTypes.StudyPlanItem>(func(gap) {
      {
        skill = gap.skill;
        topicIds = [];
        estimatedHours = if (gap.currentLevel < 30) 20 else if (gap.currentLevel < 50) 12 else 6;
        priority = gap.priority;
      }
    });

    // Compute overall readiness from all sessions
    var totalScore : Nat = 0;
    var sessionCount : Nat = 0;
    for (session in userSessions.values()) {
      totalScore += session.totalScore;
      sessionCount += 1;
    };
    let overallReadiness = if (sessionCount == 0) 0 else totalScore / sessionCount;

    {
      weakSkills = weakSkills.toArray();
      studyPlan = studyPlan.toArray();
      overallReadiness = overallReadiness;
    }
  };

  public func getProgressReport(
    sessions : Map.Map<Common.SessionId, InterviewTypes.MockSession>,
    topicProgress : Map.Map<Text, StudyTypes.UserTopicProgress>,
    topicsTotal : Nat,
    userId : Common.UserId,
    now : Common.Timestamp,
  ) : AnalyticsTypes.ProgressReport {
    // Gather completed sessions
    let completedSessions = List.empty<InterviewTypes.MockSession>();
    for ((_id, s) in sessions.entries()) {
      if (s.userId == userId and s.isComplete) completedSessions.add(s);
    };

    let sessionCount = completedSessions.size();

    // Average score and trend
    var totalScore : Nat = 0;
    let trends = List.empty<AnalyticsTypes.ScoreTrend>();
    for (s in completedSessions.values()) {
      totalScore += s.totalScore;
      trends.add({
        sessionId = s.id;
        score = s.totalScore;
        completedAt = switch (s.completedAt) { case (?t) t; case null now };
      });
    };
    let avgScore = if (sessionCount == 0) 0 else totalScore / sessionCount;

    // Topics completed
    var topicsDone : Nat = 0;
    let acquiredSkills = List.empty<Text>();
    for ((_key, entry) in topicProgress.entries()) {
      if (entry.userId == userId and entry.completed) {
        topicsDone += 1;
      };
    };

    // Readiness score: weighted blend of mock session performance + topic completion
    let sessionWeight : Nat = 70;
    let topicWeight : Nat = 30;
    let topicPct : Nat = if (topicsTotal == 0) 0 else (topicsDone * 100) / topicsTotal;
    let readiness : Nat = if (sessionCount == 0 and topicsDone == 0) 0 else {
      (avgScore * sessionWeight + topicPct * topicWeight) / 100
    };

    {
      userId = userId;
      readinessScore = readiness;
      mockSessionsCompleted = sessionCount;
      averageScore = avgScore;
      scoreTrends = trends.toArray();
      topicsCompleted = topicsDone;
      topicsTotal = topicsTotal;
      skillsAcquired = acquiredSkills.toArray();
      lastUpdated = now;
    }
  };
};
