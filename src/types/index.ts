
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  deckId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed: Date | null;
  nextReview: Date | null;
  reviewCount: number;
  successRate: number; // 0-100
  tags: string[];
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  color: string; // Tailwind color class
  createdAt: Date;
  lastStudied: Date | null;
}

export interface StudySession {
  id: string;
  deckId: string;
  startTime: Date;
  endTime: Date | null;
  cardsStudied: number;
  correctAnswers: number;
}

export interface UserStats {
  streakDays: number;
  totalCardsStudied: number;
  totalStudyTime: number; // in minutes
  masteredCards: number;
  averageSuccessRate: number;
}

export interface PerformanceData {
  date: string;
  cardsStudied: number;
  successRate: number;
}
