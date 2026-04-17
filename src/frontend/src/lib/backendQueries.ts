import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Difficulty,
  ResumeInput,
  SessionId,
  TopicId,
  UserProfileInput,
  UserRole,
} from "../backend";

function useBackendActor() {
  return useActor((canisterId, uploadFile, downloadFile, options) =>
    createActor(canisterId, uploadFile, downloadFile, options),
  );
}

// Profile
export function useGetProfile() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveProfile() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UserProfileInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveCallerUserProfile(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useCompleteOnboarding() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.completeOnboarding();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

// Resume
export function useGetResume() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["resume"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getResume();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveResume() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: ResumeInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveResume(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["resume"] });
    },
  });
}

export function useGenerateResume() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: ResumeInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.generateResume(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["resume"] });
    },
  });
}

// Interview Questions
export function useGetInterviewQuestions(
  role: UserRole | null,
  difficulty: Difficulty | null = null,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["questions", role, difficulty],
    queryFn: async () => {
      if (!actor || !role) return [];
      return actor.getInterviewQuestions(role, difficulty);
    },
    enabled: !!actor && !isFetching && !!role,
  });
}

// Study Topics
export function useGetStudyTopics(role: UserRole | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["topics", role],
    queryFn: async () => {
      if (!actor || !role) return [];
      return actor.getStudyTopics(role);
    },
    enabled: !!actor && !isFetching && !!role,
  });
}

export function useGetStudyTopic(topicId: TopicId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["topic", topicId?.toString()],
    queryFn: async () => {
      if (!actor || topicId === null) return null;
      return actor.getStudyTopic(topicId);
    },
    enabled: !!actor && !isFetching && topicId !== null,
  });
}

export function useMarkTopicComplete() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (topicId: TopicId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.markTopicComplete(topicId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["topics"] });
      qc.invalidateQueries({ queryKey: ["topicProgress"] });
    },
  });
}

export function useGetUserTopicProgress() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["topicProgress"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserTopicProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

// Mock Sessions
export function useStartMockSession() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      role,
      difficulty,
    }: { role: UserRole; difficulty: Difficulty }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.startMockSession(role, difficulty);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
}

export function useSubmitAnswer() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sessionId,
      answer,
    }: { sessionId: SessionId; answer: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitAnswer(sessionId, answer);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["session", vars.sessionId.toString()],
      });
    },
  });
}

export function useGetMockSession(sessionId: SessionId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["session", sessionId?.toString()],
    queryFn: async () => {
      if (!actor || sessionId === null) return null;
      return actor.getMockSession(sessionId);
    },
    enabled: !!actor && !isFetching && sessionId !== null,
  });
}

export function useGetUserMockSessions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserMockSessions();
    },
    enabled: !!actor && !isFetching,
  });
}

// Analytics
export function useGetProgressReport() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProgressReport();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSkillGapAnalysis() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["skillGap"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSkillGapAnalysis();
    },
    enabled: !!actor && !isFetching,
  });
}
