export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'single-choice';
  question: string;
  options?: string[];
  category: 'psychometric' | 'technical' | 'aptitude' | 'wiscar';
  subcategory?: string;
  weight: number;
}

export interface Assessment {
  userId: string;
  responses: Record<string, number | string>;
  scores: {
    psychological: number;
    technical: number;
    wiscar: WISCARScores;
    overall: number;
  };
  recommendation: 'YES' | 'MAYBE' | 'NO';
  confidence: number;
  completedAt: Date;
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface CareerPath {
  role: string;
  description: string;
  skillMatch: number;
  recommended: boolean;
}

export interface LearningPath {
  stage: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  tools: string[];
  duration: string;
}