import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AuthLayout, Layout } from "./components/Layout";
import { PageLoader } from "./components/ui/LoadingSpinner";
import { HomePage } from "./pages/HomePage";
import { OnboardingPage } from "./pages/OnboardingPage";

const DashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const ResumePage = lazy(() =>
  import("./pages/ResumePage").then((m) => ({ default: m.ResumePage })),
);
const InterviewPage = lazy(() =>
  import("./pages/InterviewPage").then((m) => ({ default: m.InterviewPage })),
);
const MockInterviewPage = lazy(() =>
  import("./pages/MockInterviewPage").then((m) => ({
    default: m.MockInterviewPage,
  })),
);
const StudyPage = lazy(() =>
  import("./pages/StudyPage").then((m) => ({ default: m.StudyPage })),
);
const AnalyticsPage = lazy(() =>
  import("./pages/AnalyticsPage").then((m) => ({ default: m.AnalyticsPage })),
);
const ProfilePage = lazy(() =>
  import("./pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
);

function withSuspense(Component: React.ComponentType) {
  return function SuspenseWrapper() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    );
  };
}

// Root route
const rootRoute = createRootRoute();

// Public layout route
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public-layout",
  component: AuthLayout,
});

// Authenticated layout route
const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth-layout",
  component: Layout,
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: HomePage,
});

const onboardingRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/onboarding",
  component: OnboardingPage,
});

// Authenticated routes
const dashboardRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/dashboard",
  component: withSuspense(DashboardPage),
});

const resumeRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/resume",
  component: withSuspense(ResumePage),
});

const interviewRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/interview",
  component: withSuspense(InterviewPage),
});

const mockInterviewRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/mock-interview",
  component: withSuspense(MockInterviewPage),
});

const studyRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/study",
  component: withSuspense(StudyPage),
});

const analyticsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/analytics",
  component: withSuspense(AnalyticsPage),
});

const profileRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/profile",
  component: withSuspense(ProfilePage),
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([homeRoute, onboardingRoute]),
  authLayoutRoute.addChildren([
    dashboardRoute,
    resumeRoute,
    interviewRoute,
    mockInterviewRoute,
    studyRoute,
    analyticsRoute,
    profileRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
