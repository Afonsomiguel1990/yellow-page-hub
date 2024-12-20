import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { BottomNav } from "@/components/navigation/BottomNav";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { AuthDialog } from "@/components/AuthDialog";

const queryClient = new QueryClient();

function AppContent() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav 
        onAddContact={() => session ? setShowAddForm(true) : setShowAuthDialog(true)}
        onShowAuth={() => setShowAuthDialog(true)}
      />
      <Toaster />
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

export default App;