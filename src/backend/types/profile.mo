import Common "common";

module {
  public type UserProfile = {
    principal : Common.UserId;
    name : Text;
    role : Common.UserRole;
    experienceLevel : Common.ExperienceLevel;
    targetJobTitle : Text;
    onboardingComplete : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type UserProfileInput = {
    name : Text;
    role : Common.UserRole;
    experienceLevel : Common.ExperienceLevel;
    targetJobTitle : Text;
  };
};
