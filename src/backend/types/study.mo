import Common "common";

module {
  public type LearningLink = {
    title : Text;
    url : Text;
    resourceType : Text;
  };

  public type Subtopic = {
    name : Text;
    description : Text;
    links : [LearningLink];
  };

  public type StudyTopic = {
    id : Common.TopicId;
    role : Common.UserRole;
    name : Text;
    description : Text;
    subtopics : [Subtopic];
    priority : Nat;
  };

  public type UserTopicProgress = {
    userId : Common.UserId;
    topicId : Common.TopicId;
    completed : Bool;
    completedAt : ?Common.Timestamp;
  };
};
