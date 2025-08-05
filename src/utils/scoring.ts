import { Question } from '@/types/assessment';
import { WISCARScores, Assessment } from '@/types/assessment';

export function calculatePsychologicalScore(
  responses: Record<string, number | string>,
  questions: Question[]
): number {
  const psychQuestions = questions.filter(q => q.category === 'psychometric');
  let totalScore = 0;
  let totalWeight = 0;

  psychQuestions.forEach(question => {
    const response = responses[question.id];
    if (typeof response === 'number') {
      // Convert Likert scale (1-5) to percentage (0-100)
      const score = ((response - 1) / 4) * 100;
      totalScore += score * question.weight;
      totalWeight += question.weight;
    }
  });

  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
}

export function calculateTechnicalScore(
  responses: Record<string, number | string>,
  questions: Question[]
): number {
  const techQuestions = questions.filter(q => q.category === 'technical' || q.category === 'aptitude');
  let correctAnswers = 0;
  let totalWeight = 0;

  // Correct answers for technical questions
  const correctAnswers_tech = {
    'tech_1': 'Storing and processing large datasets across distributed systems',
    'tech_2': 'ETL transforms data before loading, ELT loads data before transforming',
    'tech_3': 'Data consistency across nodes',
    'tech_4': 'Dictionary',
    'tech_5': 'Fast, large-scale data processing',
    'apt_1': '100,000',
    'apt_2': '32',
    'apt_3': '4 seconds'
  };

  techQuestions.forEach(question => {
    const response = responses[question.id];
    if (typeof response === 'string') {
      const isCorrect = response === correctAnswers_tech[question.id as keyof typeof correctAnswers_tech];
      if (isCorrect) {
        correctAnswers += question.weight;
      }
      totalWeight += question.weight;
    }
  });

  return totalWeight > 0 ? Math.round((correctAnswers / totalWeight) * 100) : 0;
}

export function calculateWISCARScores(
  responses: Record<string, number | string>,
  questions: Question[]
): WISCARScores {
  const psychScore = calculatePsychologicalScore(responses, questions);
  const techScore = calculateTechnicalScore(responses, questions);

  // Map responses to WISCAR dimensions based on question subcategories
  const will = calculateSubcategoryScore(responses, questions, ['grit', 'motivation']) || psychScore;
  const interest = calculateSubcategoryScore(responses, questions, ['interest']) || psychScore;
  const skill = techScore;
  const cognitive = calculateSubcategoryScore(responses, questions, ['logical', 'pattern']) || techScore;
  const ability = calculateSubcategoryScore(responses, questions, ['growth_mindset']) || psychScore;
  const realWorld = calculateSubcategoryScore(responses, questions, ['work_style']) || Math.round((psychScore + techScore) / 2);

  return {
    will: Math.max(0, Math.min(100, will)),
    interest: Math.max(0, Math.min(100, interest)),
    skill: Math.max(0, Math.min(100, skill)),
    cognitive: Math.max(0, Math.min(100, cognitive)),
    ability: Math.max(0, Math.min(100, ability)),
    realWorld: Math.max(0, Math.min(100, realWorld))
  };
}

function calculateSubcategoryScore(
  responses: Record<string, number | string>,
  questions: Question[],
  subcategories: string[]
): number | null {
  const relevantQuestions = questions.filter(q => 
    q.subcategory && subcategories.includes(q.subcategory)
  );

  if (relevantQuestions.length === 0) return null;

  let totalScore = 0;
  let totalWeight = 0;

  relevantQuestions.forEach(question => {
    const response = responses[question.id];
    if (typeof response === 'number') {
      const score = ((response - 1) / 4) * 100;
      totalScore += score * question.weight;
      totalWeight += question.weight;
    }
  });

  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : null;
}

export function generateRecommendation(
  psychScore: number,
  techScore: number,
  wiscarScores: WISCARScores
): { recommendation: 'YES' | 'MAYBE' | 'NO'; confidence: number } {
  const overallScore = Math.round((psychScore + techScore) / 2);
  const wiscarAverage = Math.round(
    (wiscarScores.will + wiscarScores.interest + wiscarScores.skill + 
     wiscarScores.cognitive + wiscarScores.ability + wiscarScores.realWorld) / 6
  );

  // Key factors for recommendation
  const hasStrongInterest = wiscarScores.interest >= 70;
  const hasBasicSkills = wiscarScores.skill >= 40;
  const hasGrowthMindset = wiscarScores.ability >= 60;
  const hasCognitiveFit = wiscarScores.cognitive >= 50;

  let recommendation: 'YES' | 'MAYBE' | 'NO';
  let confidence: number;

  if (overallScore >= 75 && hasStrongInterest && hasCognitiveFit) {
    recommendation = 'YES';
    confidence = Math.min(95, 70 + (overallScore - 75) * 1.2);
  } else if (overallScore >= 55 && (hasStrongInterest || hasGrowthMindset) && hasBasicSkills) {
    recommendation = 'MAYBE';
    confidence = Math.min(85, 50 + (overallScore - 55) * 1.5);
  } else {
    recommendation = 'NO';
    confidence = Math.min(90, 60 + (60 - overallScore) * 0.8);
  }

  return {
    recommendation,
    confidence: Math.round(Math.max(60, confidence))
  };
}

export function calculateFinalAssessment(
  responses: Record<string, number | string>,
  questions: Question[]
): Assessment {
  const psychological = calculatePsychologicalScore(responses, questions);
  const technical = calculateTechnicalScore(responses, questions);
  const wiscar = calculateWISCARScores(responses, questions);
  const overall = Math.round((psychological + technical) / 2);
  
  const { recommendation, confidence } = generateRecommendation(psychological, technical, wiscar);

  return {
    userId: 'current-user',
    responses,
    scores: {
      psychological,
      technical,
      wiscar,
      overall
    },
    recommendation,
    confidence,
    completedAt: new Date()
  };
}