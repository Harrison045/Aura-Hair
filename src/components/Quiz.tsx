import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

const questions = [
  {
    id: 'texture',
    question: "What is your natural hair texture?",
    options: ["Straight (Type 1)", "Wavy (Type 2)", "Curly (Type 3)", "Coily (Type 4)"]
  },
  {
    id: 'concern',
    question: "What is your primary hair goal?",
    options: ["Deep Hydration", "Damage Repair", "Scalp Soothing", "Volume & Body"]
  },
  {
    id: 'porosity',
    question: "How quickly does your hair dry?",
    options: ["Very quickly (High Porosity)", "Average (Medium Porosity)", "Takes hours (Low Porosity)"]
  }
];

export default function Quiz() {
  const [step, setStep] = useState(-1); // -1 is intro, 0-2 are questions, 3 is result
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStart = () => setStep(0);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[step].id]: answer });
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
      setIsAnalyzing(true);
      setTimeout(() => setIsAnalyzing(false), 2000);
    }
  };

  const resetQuiz = () => {
    setStep(-1);
    setAnswers({});
  };

  return (
    <section id="hair-quiz" className="py-24 px-6 md:px-12 bg-brand-sage/20">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm min-h-[400px] flex flex-col justify-center relative overflow-hidden">
        
        {/* Progress Bar */}
        {step >= 0 && step < questions.length && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-beige">
            <motion.div 
              className="h-full bg-brand-taupe"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === -1 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-medium mb-4">Find Your Match</h2>
              <p className="text-brand-charcoal/70 mb-8 max-w-md mx-auto">
                Take our 60-second quiz to discover the perfect routine tailored to your unique texture and goals.
              </p>
              <button 
                onClick={handleStart}
                className="inline-flex items-center gap-2 bg-brand-charcoal text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-brand-taupe hover:text-brand-charcoal transition-colors duration-300"
              >
                Start Quiz <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step >= 0 && step < questions.length && (
            <motion.div
              key={`question-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <span className="text-sm font-medium text-brand-charcoal/50 mb-2 block">
                Question {step + 1} of {questions.length}
              </span>
              <h3 className="text-2xl md:text-3xl font-medium mb-8">{questions[step].question}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[step].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="text-left p-4 rounded-xl border border-brand-rose/50 hover:border-brand-taupe hover:bg-brand-rose/20 transition-all duration-300 text-brand-charcoal"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === questions.length && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-brand-rose border-t-brand-taupe rounded-full animate-spin" />
                  <p className="text-brand-charcoal/70 animate-pulse">Analyzing your profile...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-brand-sage/30 rounded-full flex items-center justify-center mb-6 text-emerald-700">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-medium mb-4">The Moisture Lock Routine</h3>
                  <p className="text-brand-charcoal/70 mb-8 max-w-md">
                    Based on your {answers.texture?.split(' ')[0].toLowerCase()} hair and goal of {answers.concern?.toLowerCase()}, we've curated a deeply hydrating 3-step routine.
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-brand-charcoal text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-brand-taupe hover:text-brand-charcoal transition-colors duration-300">
                      Shop Your Routine
                    </button>
                    <button 
                      onClick={resetQuiz}
                      className="px-8 py-4 rounded-full text-sm font-medium border border-brand-charcoal/20 hover:bg-brand-beige transition-colors duration-300"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
