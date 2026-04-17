import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StudyPlanItem {
    topicIds: Array<TopicId>;
    skill: string;
    estimatedHours: bigint;
    priority: bigint;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface UserTopicProgress {
    completedAt?: Timestamp;
    userId: UserId;
    completed: boolean;
    topicId: TopicId;
}
export interface ScoreTrend {
    completedAt: Timestamp;
    score: bigint;
    sessionId: SessionId;
}
export interface InterviewQuestion {
    id: QuestionId;
    idealAnswer: string;
    question: string;
    rubric: ScoringRubric;
    difficulty: Difficulty;
    role: UserRole;
    tags: Array<string>;
    questionType: QuestionType;
}
export interface ResumeInput {
    education: Array<EducationEntry>;
    experience: Array<ExperienceEntry>;
    summary: string;
    targetRole: string;
    skills: Array<string>;
}
export interface ExperienceEntry {
    title: string;
    endDate?: string;
    description: string;
    company: string;
    achievements: Array<string>;
    startDate: string;
}
export interface EducationEntry {
    gpa?: string;
    field: string;
    startYear: bigint;
    endYear?: bigint;
    institution: string;
    degree: string;
}
export interface SkillGapResult {
    studyPlan: Array<StudyPlanItem>;
    weakSkills: Array<SkillGapEntry>;
    overallReadiness: bigint;
}
export type TopicId = bigint;
export interface ResumeGenerationResult {
    resume: ResumeData;
    suggestions: Array<string>;
    isDemo: boolean;
    keywords: Array<string>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface MockSessionTurn {
    question: string;
    userAnswer: string;
    feedback: string;
    score: bigint;
    questionId: QuestionId;
    answeredAt: Timestamp;
}
export interface AnswerSubmitResult {
    feedback: string;
    score: bigint;
    finalScore?: bigint;
    nextQuestion?: InterviewQuestion;
    sessionComplete: boolean;
}
export interface Subtopic {
    name: string;
    description: string;
    links: Array<LearningLink>;
}
export interface ResumeData {
    userId: UserId;
    education: Array<EducationEntry>;
    experience: Array<ExperienceEntry>;
    summary: string;
    updatedAt: Timestamp;
    targetRole: string;
    skills: Array<string>;
}
export interface ProgressReport {
    scoreTrends: Array<ScoreTrend>;
    topicsTotal: bigint;
    readinessScore: bigint;
    skillsAcquired: Array<string>;
    userId: UserId;
    lastUpdated: Timestamp;
    mockSessionsCompleted: bigint;
    topicsCompleted: bigint;
    averageScore: bigint;
}
export interface ScoringRubric {
    fair: string;
    good: string;
    poor: string;
    excellent: string;
}
export interface SessionStartResult {
    firstQuestion: InterviewQuestion;
    sessionId: SessionId;
}
export interface LearningLink {
    url: string;
    title: string;
    resourceType: string;
}
export type QuestionId = bigint;
export type SessionId = bigint;
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface StudyTopic {
    id: TopicId;
    name: string;
    role: UserRole;
    description: string;
    subtopics: Array<Subtopic>;
    priority: bigint;
}
export interface MockSession {
    id: SessionId;
    completedAt?: Timestamp;
    startedAt: Timestamp;
    turns: Array<MockSessionTurn>;
    userId: UserId;
    difficulty: Difficulty;
    role: UserRole;
    totalScore: bigint;
    questionIds: Array<QuestionId>;
    currentQuestionIndex: bigint;
    isComplete: boolean;
}
export interface SkillGapEntry {
    targetLevel: bigint;
    studyResources: Array<string>;
    skill: string;
    currentLevel: bigint;
    priority: bigint;
}
export interface UserProfileInput {
    experienceLevel: ExperienceLevel;
    name: string;
    role: UserRole;
    targetJobTitle: string;
}
export interface UserProfile {
    experienceLevel: ExperienceLevel;
    principal: UserId;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    onboardingComplete: boolean;
    updatedAt: Timestamp;
    targetJobTitle: string;
}
export enum Difficulty {
    Easy = "Easy",
    Hard = "Hard",
    Medium = "Medium"
}
export enum ExperienceLevel {
    Mid = "Mid",
    Junior = "Junior",
    Senior = "Senior"
}
export enum QuestionType {
    Technical = "Technical",
    Behavioral = "Behavioral"
}
export enum UserRole {
    ProductManager = "ProductManager",
    DataAnalyst = "DataAnalyst",
    DataScientist = "DataScientist",
    BackendDeveloper = "BackendDeveloper",
    FrontendDeveloper = "FrontendDeveloper",
    FullStack = "FullStack",
    DevOps = "DevOps"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    completeOnboarding(): Promise<void>;
    generateResume(input: ResumeInput): Promise<ResumeGenerationResult>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getInterviewQuestions(role: UserRole, difficulty: Difficulty | null): Promise<Array<InterviewQuestion>>;
    getMockSession(sessionId: SessionId): Promise<MockSession | null>;
    getProgressReport(): Promise<ProgressReport>;
    getResume(): Promise<ResumeData | null>;
    getSkillGapAnalysis(): Promise<SkillGapResult>;
    getStudyTopic(topicId: TopicId): Promise<StudyTopic | null>;
    getStudyTopics(role: UserRole): Promise<Array<StudyTopic>>;
    getUserMockSessions(): Promise<Array<MockSession>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserTopicProgress(): Promise<Array<UserTopicProgress>>;
    isCallerAdmin(): Promise<boolean>;
    markTopicComplete(topicId: TopicId): Promise<void>;
    saveCallerUserProfile(input: UserProfileInput): Promise<UserProfile>;
    saveResume(input: ResumeInput): Promise<ResumeData>;
    startMockSession(role: UserRole, difficulty: Difficulty): Promise<SessionStartResult>;
    submitAnswer(sessionId: SessionId, answer: string): Promise<AnswerSubmitResult>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
