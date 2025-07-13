import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated || userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Placeholder components for routes not yet implemented
const CreateWebsite = () => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold mb-4">Create Website</h1>
    <p className="text-muted-foreground">This page will be implemented next.</p>
  </div>
);

const Domains = () => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold mb-4">Domain Mapping</h1>
    <p className="text-muted-foreground">This page will be implemented next.</p>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-website"
            element={
              <ProtectedRoute>
                <CreateWebsite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/domains"
            element={
              <ProtectedRoute>
                <Domains />
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
