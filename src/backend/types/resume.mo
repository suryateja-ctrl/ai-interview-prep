import Common "common";

module {
  public type EducationEntry = {
    institution : Text;
    degree : Text;
    field : Text;
    startYear : Nat;
    endYear : ?Nat;
    gpa : ?Text;
  };

  public type ExperienceEntry = {
    company : Text;
    title : Text;
    startDate : Text;
    endDate : ?Text;
    description : Text;
    achievements : [Text];
  };

  public type ResumeData = {
    userId : Common.UserId;
    summary : Text;
    targetRole : Text;
    skills : [Text];
    education : [EducationEntry];
    experience : [ExperienceEntry];
    updatedAt : Common.Timestamp;
  };

  public type ResumeInput = {
    summary : Text;
    targetRole : Text;
    skills : [Text];
    education : [EducationEntry];
    experience : [ExperienceEntry];
  };

  public type ResumeGenerationResult = {
    resume : ResumeData;
    suggestions : [Text];
    keywords : [Text];
    isDemo : Bool;
  };
};
