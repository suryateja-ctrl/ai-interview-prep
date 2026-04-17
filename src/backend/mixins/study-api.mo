import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import StudyLib "../lib/study";
import StudyTypes "../types/study";
import Common "../types/common";

mixin (
  _accessControlState : AccessControl.AccessControlState,
  topics : List.List<StudyTypes.StudyTopic>,
  topicProgress : Map.Map<Text, StudyTypes.UserTopicProgress>,
) {
  public query ({ caller = _ }) func getStudyTopics(role : Common.UserRole) : async [StudyTypes.StudyTopic] {
    StudyLib.getTopicsByRole(topics, role)
  };

  public query ({ caller = _ }) func getStudyTopic(topicId : Common.TopicId) : async ?StudyTypes.StudyTopic {
    StudyLib.getTopic(topics, topicId)
  };

  public shared ({ caller }) func markTopicComplete(topicId : Common.TopicId) : async () {
    StudyLib.markTopicComplete(topicProgress, caller, topicId, Time.now())
  };

  public query ({ caller }) func getUserTopicProgress() : async [StudyTypes.UserTopicProgress] {
    StudyLib.getUserProgress(topicProgress, caller)
  };
};
