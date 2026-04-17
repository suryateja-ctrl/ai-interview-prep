module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type SessionId = Nat;
  public type QuestionId = Nat;
  public type TopicId = Nat;

  public type UserRole = {
    #FrontendDeveloper;
    #BackendDeveloper;
    #DataAnalyst;
    #FullStack;
    #DevOps;
    #DataScientist;
    #ProductManager;
  };

  public type ExperienceLevel = {
    #Junior;
    #Mid;
    #Senior;
  };

  public type QuestionType = {
    #Technical;
    #Behavioral;
  };

  public type Difficulty = {
    #Easy;
    #Medium;
    #Hard;
  };
};
