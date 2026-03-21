import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithRedirect, 
  getRedirectResult,
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';

const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hour
const LAST_ACTIVE_KEY = 'aura_last_active';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  pendingAction: (() => void) | null;
  setPendingAction: (action: (() => void) | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    // Handle redirect result
    getRedirectResult(auth).catch((error) => {
      console.error('Error handling redirect result', error);
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // If user logs in and there's a pending action, execute it
      if (currentUser && pendingAction) {
        pendingAction();
        setPendingAction(null);
        setIsAuthModalOpen(false);
      }
    });

    return () => unsubscribe();
  }, [pendingAction]);

  useEffect(() => {
    if (!user) return;

    // Reset activity timer
    const resetTimer = () => {
      localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
    };

    // Check for inactivity
    const checkInactivity = () => {
      const lastActive = parseInt(localStorage.getItem(LAST_ACTIVE_KEY) || '0');
      const now = Date.now();
      
      if (now - lastActive > INACTIVITY_TIMEOUT) {
        console.log('Logging out due to inactivity');
        logout();
      }
    };

    // Initial check and timer reset
    resetTimer();

    // Set up event listeners for activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Run check every minute
    const intervalId = setInterval(checkInactivity, 60000);

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(intervalId);
    };
  }, [user]);

  const login = (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass).then(() => {});
  const register = (email: string, pass: string) => createUserWithEmailAndPassword(auth, email, pass).then(() => {});
  const loginWithGoogle = () => signInWithRedirect(auth, googleProvider);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      loginWithGoogle, 
      logout,
      isAuthModalOpen,
      setIsAuthModalOpen,
      pendingAction,
      setPendingAction
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
