import Map "mo:core/Map";
import Types "../types/profile";
import Common "../types/common";

module {
  public func getProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : ?Types.UserProfile {
    profiles.get(userId)
  };

  public func saveProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    input : Types.UserProfileInput,
    now : Common.Timestamp,
  ) : Types.UserProfile {
    let existing = profiles.get(userId);
    let createdAt = switch (existing) {
      case (?p) p.createdAt;
      case null now;
    };
    let profile : Types.UserProfile = {
      principal = userId;
      name = input.name;
      role = input.role;
      experienceLevel = input.experienceLevel;
      targetJobTitle = input.targetJobTitle;
      onboardingComplete = switch (existing) {
        case (?p) p.onboardingComplete;
        case null false;
      };
      createdAt = createdAt;
      updatedAt = now;
    };
    profiles.add(userId, profile);
    profile
  };

  public func completeOnboarding(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    now : Common.Timestamp,
  ) {
    switch (profiles.get(userId)) {
      case (?p) {
        profiles.add(userId, { p with onboardingComplete = true; updatedAt = now });
      };
      case null {};
    }
  };
};
