import { create } from "zustand";
import type { ExperienceLevel, UserRole } from "../backend";

interface ProfileState {
  name: string;
  role: UserRole | null;
  experienceLevel: ExperienceLevel | null;
  targetJobTitle: string;
  onboardingComplete: boolean;
  setProfile: (
    profile: Partial<Omit<ProfileState, "setProfile" | "clearProfile">>,
  ) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: "",
  role: null,
  experienceLevel: null,
  targetJobTitle: "",
  onboardingComplete: false,
  setProfile: (profile) => set((state) => ({ ...state, ...profile })),
  clearProfile: () =>
    set({
      name: "",
      role: null,
      experienceLevel: null,
      targetJobTitle: "",
      onboardingComplete: false,
    }),
}));
