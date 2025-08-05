import { useState } from 'react';
import { AssessmentIntro } from './AssessmentIntro';
import { QuestionCard } from './QuestionCard';
import { ResultsDisplay } from './ResultsDisplay';
import { allQuestions } from '@/data/questions';
import { calculateFinalAssessment } from '@/utils/scoring';
import { Assessment } from '@/types/assessment';

type AssessmentState = 'intro' | 'questions' | 'results';

export function AssessmentFlow() {
  const [state, setState] = useState<AssessmentState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number | string>>({});
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  const handleStart = () => {
    setState('questions');
    setCurrentQuestionIndex(0);
    setResponses({});
  };

  const handleAnswer = (questionId: string, answer: number | string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Assessment complete
      const finalAssessment = calculateFinalAssessment(responses, allQuestions);
      setAssessment(finalAssessment);
      setState('results');
    }
  };

  const handleRestart = () => {
    setState('intro');
    setCurrentQuestionIndex(0);
    setResponses({});
    setAssessment(null);
  };

  if (state === 'intro') {
    return <AssessmentIntro onStart={handleStart} />;
  }

  if (state === 'questions') {
    const currentQuestion = allQuestions[currentQuestionIndex];
    return (
      <div className="max-w-4xl mx-auto">
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={allQuestions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
          currentAnswer={responses[currentQuestion.id]}
        />
      </div>
    );
  }

  if (state === 'results' && assessment) {
    return <ResultsDisplay assessment={assessment} onRestart={handleRestart} />;
  }

  return null;
}