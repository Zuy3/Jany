/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroScreen } from './components/HeroScreen';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { AnalyzingScreen } from './components/AnalyzingScreen';
import { LeadCaptureScreen } from './components/LeadCaptureScreen';
import { ResultScreen } from './components/ResultScreen';
import { IntegrationModal } from './components/IntegrationModal';
import { PrivacyModal } from './components/PrivacyModal';
import { Footer } from './components/Footer';
import { QUIZ_QUESTIONS, calculateQuizResult } from './data/quizQuestions';
import { QuizAnswers, ProfileResult } from './types/quiz';
import { analytics } from './services/analytics';

type AppStep = 'hero' | 'quiz' | 'analyzing' | 'lead_capture' | 'result';

export default function App() {
  const [step, setStep] = useState<AppStep>('hero');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [cachedResult, setCachedResult] = useState<ProfileResult | null>(null);
  const [leadName, setLeadName] = useState<string>('');
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  
  // Modals
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Capture UTM parameters and trigger PageView
  useEffect(() => {
    analytics.pageView();
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const params: Record<string, string> = {};
      const trackingKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src', 'sck', 'fbclid'];
      trackingKeys.forEach(key => {
        const val = searchParams.get(key);
        if (val) params[key] = val;
      });
      if (Object.keys(params).length > 0) {
        setUtmParams(params);
        sessionStorage.setItem('zuyzelia_utm_params', JSON.stringify(params));
      } else {
        const stored = sessionStorage.getItem('zuyzelia_utm_params');
        if (stored) {
          setUtmParams(JSON.parse(stored));
        }
      }
    } catch (e) {
      console.warn('Could not parse tracking params:', e);
    }
  }, []);

  // Smooth scroll helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = () => {
    analytics.quizStart();
    setStep('quiz');
    setCurrentQuestionIndex(0);
    scrollToTop();
  };

  const handleDirectToResult = () => {
    if (!cachedResult) {
      const defaultRes = calculateQuizResult(answers);
      setCachedResult(defaultRes);
    }
    setStep('result');
    scrollToTop();
  };

  const handleSelectOption = (optionId: string) => {
    const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
    
    // For empathetic interlude, proceed without forcing an option
    if (currentQ.type === 'empathetic_interlude') {
      // Proceed
    } else if (currentQ.type === 'text_name') {
      if (!leadName || leadName.trim().length < 2) return;
    } else if (!answers[currentQ.id]) {
      return;
    }

    analytics.quizStep(currentQuestionIndex + 1, currentQ.id);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      scrollToTop();
    } else {
      // Completed all questions -> calculate and move to analyzing
      const res = calculateQuizResult(answers);
      setCachedResult(res);
      setStep('analyzing');
      scrollToTop();
    }
  };

  const handleBackQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      scrollToTop();
    } else {
      // Back to hero
      setStep('hero');
      scrollToTop();
    }
  };

  const handleAnalysisComplete = () => {
    setStep('lead_capture');
    scrollToTop();
  };

  const handleLeadSuccess = (leadId: string, name?: string) => {
    if (name) {
      setLeadName(name);
    }
    setStep('result');
    scrollToTop();
  };

  const handleResetQuiz = () => {
    setStep('hero');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCachedResult(null);
    setLeadName('');
    scrollToTop();
  };

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedOptionForCurrent = currentQuestion ? answers[currentQuestion.id] : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-800">
      {/* Top Bar Header */}
      <Header
        onOpenIntegrationModal={() => setIsIntegrationModalOpen(true)}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onResetQuiz={handleResetQuiz}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 flex flex-col justify-center py-4 sm:py-8 px-2 sm:px-4">
        {step === 'hero' && (
          <HeroScreen
            onStartQuiz={handleStartQuiz}
            onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
            onDirectToResult={handleDirectToResult}
          />
        )}

        {step === 'quiz' && currentQuestion && (
          <div className="w-full">
            <ProgressBar
              currentStep={currentQuestionIndex + 1}
              totalSteps={QUIZ_QUESTIONS.length}
              canGoBack={true}
              onBack={handleBackQuestion}
            />

            <QuestionCard
              question={currentQuestion}
              selectedOptionId={selectedOptionForCurrent}
              onSelectOption={handleSelectOption}
              onNext={handleNextQuestion}
              onBack={handleBackQuestion}
              isFirst={currentQuestionIndex === 0}
              isLast={currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
              leadName={leadName}
              onNameChange={(name) => setLeadName(name)}
            />
          </div>
        )}

        {step === 'analyzing' && (
          <AnalyzingScreen 
            onComplete={handleAnalysisComplete} 
            leadName={leadName}
          />
        )}

        {step === 'lead_capture' && cachedResult && (
          <LeadCaptureScreen
            profileResult={cachedResult}
            answers={answers}
            initialName={leadName}
            onSuccess={(leadId, name) => {
              handleLeadSuccess(leadId, name);
            }}
            onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
          />
        )}

        {step === 'result' && cachedResult && (
          <ResultScreen
            result={cachedResult}
            answers={answers}
            leadName={leadName}
            utmParams={utmParams}
            onReset={handleResetQuiz}
            onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
          />
        )}
      </main>

      {/* Global Modals */}
      <IntegrationModal
        isOpen={isIntegrationModalOpen}
        onClose={() => setIsIntegrationModalOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenIntegrationModal={() => setIsIntegrationModalOpen(true)}
      />
    </div>
  );
}
