import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';

// Page imports
import NexusLayout from '@/components/layout/NexusLayout';
import Home from '@/pages/Home';
import Chronicle from '@/pages/Chronicle';
import Capabilities from '@/pages/Capabilities';
import Studio from '@/pages/Studio';
import Vault from '@/pages/Vault';
import Uplink from '@/pages/Uplink';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#05070A]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#00F0FF33] border-t-[#00F0FF] rounded-full animate-spin"></div>
          <span className="font-mono text-xs text-[#00F0FF66] tracking-wider">INITIALIZING NEXUS...</span>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<NexusLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chronicle" element={<Chronicle />} />
        <Route path="/capabilities" element={<Capabilities />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/uplink" element={<Uplink />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App