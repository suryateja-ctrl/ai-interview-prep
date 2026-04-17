import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProfileLib "../lib/profile";
import ProfileTypes "../types/profile";
import Common "../types/common";

mixin (
  _accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
) {
  public shared ({ caller }) func saveCallerUserProfile(input : ProfileTypes.UserProfileInput) : async ProfileTypes.UserProfile {
    ProfileLib.saveProfile(profiles, caller, input, Time.now())
  };

  public query ({ caller }) func getCallerUserProfile() : async ?ProfileTypes.UserProfile {
    ProfileLib.getProfile(profiles, caller)
  };

  public query ({ caller = _ }) func getUserProfile(user : Principal) : async ?ProfileTypes.UserProfile {
    ProfileLib.getProfile(profiles, user)
  };

  public shared ({ caller }) func completeOnboarding() : async () {
    ProfileLib.completeOnboarding(profiles, caller, Time.now())
  };
};
