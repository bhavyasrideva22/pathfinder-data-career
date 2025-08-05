import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/types/assessment';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: string, answer: number | string) => void;
  onNext: () => void;
  currentAnswer?: number | string;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  currentAnswer
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(
    currentAnswer?.toString() || ''
  );

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
    if (question.type === 'likert') {
      onAnswer(question.id, parseInt(value));
    } else {
      onAnswer(question.id, value);
    }
  };

  const isAnswered = selectedAnswer !== '';

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card border-0 bg-card">
      <CardHeader className="text-center">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="w-32 bg-muted rounded-full h-2">
            <div
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {question.type === 'likert' ? (
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerChange}>
            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="text-xs text-muted-foreground">Strongly Disagree</div>
              <div className="text-xs text-muted-foreground">Disagree</div>
              <div className="text-xs text-muted-foreground">Neutral</div>
              <div className="text-xs text-muted-foreground">Agree</div>
              <div className="text-xs text-muted-foreground">Strongly Agree</div>
              
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex justify-center">
                  <RadioGroupItem value={value.toString()} id={`option-${value}`} />
                </div>
              ))}
            </div>
          </RadioGroup>
        ) : (
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerChange}>
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        <div className="flex justify-end pt-4">
          <Button
            onClick={onNext}
            disabled={!isAnswered}
            variant="hero"
            size="lg"
          >
            {questionNumber === totalQuestions ? 'Complete Assessment' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}