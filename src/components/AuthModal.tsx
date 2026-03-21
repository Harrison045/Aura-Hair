import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, LogIn, UserPlus, Chrome } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, loginWithGoogle } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      setIsAuthModalOpen(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      setIsAuthModalOpen(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred during Google Sign-In.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-brand-charcoal/40 hover:text-brand-charcoal hover:bg-theme-bg/10 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-medium text-brand-charcoal mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-brand-charcoal/60 font-light">
                {isLogin 
                  ? 'Sign in to access your Aura profile' 
                  : 'Join Aura for a personalized experience'}
              </p>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-brand-charcoal/10 h-14 rounded-full font-medium text-brand-charcoal hover:bg-theme-bg/5 transition-all shadow-sm mb-6 active:scale-[0.98]"
            >
              <Chrome className="w-5 h-5 text-brand-charcoal/60" />
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center py-4 mb-2">
              <div className="flex-grow border-t border-brand-charcoal/10"></div>
              <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-brand-charcoal/30">or</span>
              <div className="flex-grow border-t border-brand-charcoal/10"></div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 px-4 py-3 bg-red-50 text-red-600 text-sm rounded-xl text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-charcoal/30" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-14 pl-14 pr-6 bg-theme-bg/5 border-none rounded-2xl focus:ring-2 focus:ring-brand-taupe/20 transition-all outline-none text-brand-charcoal"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-charcoal/30" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-14 pl-14 pr-6 bg-theme-bg/5 border-none rounded-2xl focus:ring-2 focus:ring-brand-taupe/20 transition-all outline-none text-brand-charcoal"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-charcoal text-white h-14 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-brand-charcoal/90 transition-all shadow-md active:scale-[0.98] mt-4"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center text-sm font-light text-brand-charcoal/60">
              {isLogin ? (
                <p>
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setIsLogin(false)}
                    className="text-brand-charcoal font-bold hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    onClick={() => setIsLogin(true)}
                    className="text-brand-charcoal font-bold hover:underline"
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
