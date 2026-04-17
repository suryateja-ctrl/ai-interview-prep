import type { backendInterface } from "../backend.d";
import {
  Difficulty,
  ExperienceLevel,
  QuestionType,
  UserRole,
  UserRole__1,
} from "../backend.d";

// Mock principal
const mockPrincipal: any = {
  toString: () => "aaaaa-aa",
  toText: () => "aaaaa-aa",
  isAnonymous: () => false,
};

const now = BigInt(Date.now()) * BigInt(1_000_000);

const mockUserProfile = {
  experienceLevel: ExperienceLevel.Mid,
  principal: mockPrincipal,
  name: "Alex Johnson",
  createdAt: now,
  role: UserRole.FrontendDeveloper,
  onboardingComplete: true,
  updatedAt: now,
  targetJobTitle: "Senior Frontend Developer",
};

const mockProgressReport = {
  scoreTrends: [
    { completedAt: now - BigInt(6) * BigInt(86400000000000), score: BigInt(55), sessionId: BigInt(1) },
    { completedAt: now - BigInt(5) * BigInt(86400000000000), score: BigInt(62), sessionId: BigInt(2) },
    { completedAt: now - BigInt(4) * BigInt(86400000000000), score: BigInt(68), sessionId: BigInt(3) },
    { completedAt: now - BigInt(3) * BigInt(86400000000000), score: BigInt(72), sessionId: BigInt(4) },
    { completedAt: now - BigInt(2) * BigInt(86400000000000), score: BigInt(78), sessionId: BigInt(5) },
    { completedAt: now - BigInt(1) * BigInt(86400000000000), score: BigInt(82), sessionId: BigInt(6) },
  ],
  topicsTotal: BigInt(24),
  readinessScore: BigInt(72),
  skillsAcquired: ["React", "TypeScript", "CSS Grid", "Testing"],
  userId: mockPrincipal,
  lastUpdated: now,
  mockSessionsCompleted: BigInt(6),
  topicsCompleted: BigInt(15),
  averageScore: BigInt(70),
};

const mockStudyTopics = [
  {
    id: BigInt(1),
    name: "React Fundamentals",
    role: UserRole.FrontendDeveloper,
    description: "Core React concepts including hooks, state management, and component patterns.",
    subtopics: [
      { name: "useState & useEffect", description: "Core React hooks", links: [{ url: "https://react.dev", title: "React Docs", resourceType: "Documentation" }] },
      { name: "Context API", description: "Global state management", links: [] },
    ],
    priority: BigInt(1),
  },
  {
    id: BigInt(2),
    name: "TypeScript",
    role: UserRole.FrontendDeveloper,
    description: "TypeScript fundamentals for building type-safe applications.",
    subtopics: [
      { name: "Types & Interfaces", description: "TypeScript type system", links: [] },
    ],
    priority: BigInt(2),
  },
  {
    id: BigInt(3),
    name: "CSS & Styling",
    role: UserRole.FrontendDeveloper,
    description: "Modern CSS techniques, Flexbox, Grid, and CSS-in-JS.",
    subtopics: [],
    priority: BigInt(3),
  },
];

const mockInterviewQuestions = [
  {
    id: BigInt(1),
    question: "Explain the difference between useState and useReducer in React.",
    idealAnswer: "useState is for simple state, useReducer is better for complex state logic or when next state depends on previous.",
    rubric: { excellent: "Full explanation with examples", good: "Clear understanding", fair: "Basic understanding", poor: "Confused or incorrect" },
    difficulty: Difficulty.Medium,
    role: UserRole.FrontendDeveloper,
    tags: ["React", "Hooks"],
    questionType: QuestionType.Technical,
  },
  {
    id: BigInt(2),
    question: "What is the Virtual DOM and how does React use it?",
    idealAnswer: "The Virtual DOM is a lightweight copy of the real DOM. React uses it to batch updates and minimize expensive DOM operations.",
    rubric: { excellent: "Full explanation with reconciliation details", good: "Understands the purpose", fair: "Knows it exists", poor: "Incorrect" },
    difficulty: Difficulty.Easy,
    role: UserRole.FrontendDeveloper,
    tags: ["React", "Performance"],
    questionType: QuestionType.Technical,
  },
];

const mockSkillGapResult = {
  studyPlan: [
    { topicIds: [BigInt(1)], skill: "Advanced React Patterns", estimatedHours: BigInt(8), priority: BigInt(1) },
    { topicIds: [BigInt(2)], skill: "System Design", estimatedHours: BigInt(12), priority: BigInt(2) },
  ],
  weakSkills: [
    { skill: "System Design", currentLevel: BigInt(30), targetLevel: BigInt(80), priority: BigInt(1), studyResources: ["System Design Primer"] },
    { skill: "Advanced TypeScript", currentLevel: BigInt(50), targetLevel: BigInt(85), priority: BigInt(2), studyResources: ["TypeScript Deep Dive"] },
  ],
  overallReadiness: BigInt(72),
};

const mockResumeData = {
  userId: mockPrincipal,
  education: [
    { gpa: "3.8", field: "Computer Science", startYear: BigInt(2016), endYear: BigInt(2020), institution: "State University", degree: "B.S." },
  ],
  experience: [
    { title: "Frontend Developer", endDate: undefined, description: "Building React apps", company: "Tech Corp", achievements: ["Improved load time by 40%"], startDate: "2020-06" },
  ],
  summary: "Experienced frontend developer specializing in React and TypeScript.",
  updatedAt: now,
  targetRole: "Senior Frontend Developer",
  skills: ["React", "TypeScript", "CSS", "GraphQL", "Testing"],
};

const mockMockSessions = [
  {
    id: BigInt(1),
    completedAt: now - BigInt(86400000000000),
    startedAt: now - BigInt(86400000000000) - BigInt(3600000000000),
    turns: [],
    userId: mockPrincipal,
    difficulty: Difficulty.Medium,
    role: UserRole.FrontendDeveloper,
    totalScore: BigInt(78),
    questionIds: [BigInt(1), BigInt(2)],
    currentQuestionIndex: BigInt(2),
    isComplete: true,
  },
];

const mockUserTopicProgress = [
  { completedAt: now - BigInt(86400000000000), userId: mockPrincipal, completed: true, topicId: BigInt(1) },
  { completedAt: now - BigInt(172800000000000), userId: mockPrincipal, completed: true, topicId: BigInt(2) },
];

export const mockBackend: backendInterface = {
  assignCallerUserRole: async () => undefined,
  completeOnboarding: async () => undefined,
  generateResume: async () => ({
    resume: mockResumeData,
    suggestions: ["Add quantifiable metrics", "Include relevant keywords"],
    isDemo: true,
    keywords: ["React", "TypeScript", "Frontend"],
  }),
  getCallerUserProfile: async () => mockUserProfile,
  getCallerUserRole: async () => UserRole__1.user,
  getInterviewQuestions: async () => mockInterviewQuestions,
  getMockSession: async () => mockMockSessions[0],
  getProgressReport: async () => mockProgressReport,
  getResume: async () => mockResumeData,
  getSkillGapAnalysis: async () => mockSkillGapResult,
  getStudyTopic: async () => mockStudyTopics[0],
  getStudyTopics: async () => mockStudyTopics,
  getUserMockSessions: async () => mockMockSessions,
  getUserProfile: async () => mockUserProfile,
  getUserTopicProgress: async () => mockUserTopicProgress,
  isCallerAdmin: async () => false,
  markTopicComplete: async () => undefined,
  saveCallerUserProfile: async () => mockUserProfile,
  saveResume: async () => mockResumeData,
  startMockSession: async () => ({
    firstQuestion: mockInterviewQuestions[0],
    sessionId: BigInt(99),
  }),
  submitAnswer: async () => ({
    feedback: "Good answer! You demonstrated solid understanding of the concept.",
    score: BigInt(80),
    finalScore: undefined,
    nextQuestion: mockInterviewQuestions[1],
    sessionComplete: false,
  }),
  transform: async () => ({
    status: BigInt(200),
    body: new Uint8Array(),
    headers: [],
  }),
};
