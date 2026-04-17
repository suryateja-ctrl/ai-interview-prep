import type { Principal } from "@icp-sdk/core/principal";
import { create } from "zustand";

interface AuthState {
  principal: Principal | null;
  isAuthenticated: boolean;
  setPrincipal: (principal: Principal | null) => void;
  setAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  principal: null,
  isAuthenticated: false,
  setPrincipal: (principal) => set({ principal }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
