
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import MobileBottomNav from "./components/MobileBottomNav";
import { useMobile } from "./hooks/useMobile";
import Index from "./pages/Index";
import Meditate from "./pages/Meditate";
import Learn from "./pages/Learn";
import LessonDetail from "./pages/LessonDetail";
import Reflect from "./pages/Reflect";
import SilentMeditation from "./pages/SilentMeditation";
import TraditionalMeditation from "./pages/TraditionalMeditation";
import TrainingMeditation from "./pages/TrainingMeditation";
import CosmicMeditation from "./pages/CosmicMeditation";
import LucidDreamingMeditation from "./pages/LucidDreamingMeditation";
import NextLevelMeditation from "./pages/NextLevelMeditation";
import WaveFrequencySounds from "./pages/WaveFrequencySounds";
import BreathWork from "./pages/BreathWork";
import NotFound from "./pages/NotFound";
import GuidedMeditationTypes from "./pages/GuidedMeditationTypes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <div className="relative min-h-screen">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/meditate" element={<Meditate />} />
                <Route path="/meditate/guided" element={<GuidedMeditationTypes />} />
                <Route path="/meditate/guided/traditional" element={<TraditionalMeditation />} />
                <Route path="/meditate/guided/training" element={<TrainingMeditation />} />
                <Route path="/meditate/guided/cosmic" element={<CosmicMeditation />} />
                <Route path="/meditate/guided/lucid" element={<LucidDreamingMeditation />} />
                <Route path="/meditate/guided/nextlevel" element={<NextLevelMeditation />} />
                <Route path="/meditate/silent" element={<SilentMeditation />} />
                <Route path="/meditate/sounds" element={<WaveFrequencySounds />} />
                <Route path="/meditate/breathwork" element={<BreathWork />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/learn/lesson/:id" element={<LessonDetail />} />
                <Route path="/reflect" element={<Reflect />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <MobileBottomNav />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
