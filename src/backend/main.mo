import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import ProfileTypes "types/profile";
import ResumeTypes "types/resume";
import InterviewTypes "types/interview";
import StudyTypes "types/study";
import Common "types/common";
import ProfileMixin "mixins/profile-api";
import ResumeMixin "mixins/resume-api";
import InterviewMixin "mixins/interview-api";
import StudyMixin "mixins/study-api";
import AnalyticsMixin "mixins/analytics-api";
import InterviewLib "lib/interview";
import StudyLib "lib/study";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Profile state
  let profiles = Map.empty<Common.UserId, ProfileTypes.UserProfile>();
  include ProfileMixin(accessControlState, profiles);

  // Resume state
  let resumes = Map.empty<Common.UserId, ResumeTypes.ResumeData>();
  include ResumeMixin(accessControlState, resumes);

  // Interview state: pre-seeded questions + sessions
  let questions = List.empty<InterviewTypes.InterviewQuestion>();
  var nextQuestionId : Nat = InterviewLib.seedQuestions(questions, 0);
  let sessions = Map.empty<Common.SessionId, InterviewTypes.MockSession>();
  include InterviewMixin(accessControlState, questions, sessions);

  // Study state: pre-seeded topics + user progress
  let topics = List.empty<StudyTypes.StudyTopic>();
  var nextTopicId : Nat = StudyLib.seedTopics(topics, 0);
  let topicProgress = Map.empty<Text, StudyTypes.UserTopicProgress>();
  include StudyMixin(accessControlState, topics, topicProgress);

  // Analytics state (shared references from above)
  include AnalyticsMixin(accessControlState, profiles, sessions, topicProgress, nextTopicId);
};
