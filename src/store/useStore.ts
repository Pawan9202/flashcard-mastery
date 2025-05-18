import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Deck, Flashcard, StudySession, UserStats, PerformanceData } from '../types';

// Sample data
const sampleDecks: Deck[] = [
  {
    id: '1',
    name: 'JavaScript Fundamentals',
    description: 'Core concepts of JavaScript programming',
    cardCount: 15,
    color: 'bg-brand-blue',
    createdAt: new Date('2023-01-15'),
    lastStudied: new Date('2023-05-10'),
  },
  {
    id: '2',
    name: 'React Hooks',
    description: 'Modern React state management',
    cardCount: 10,
    color: 'bg-brand-teal',
    createdAt: new Date('2023-02-20'),
    lastStudied: new Date('2023-05-12'),
  },
  {
    id: '3',
    name: 'Design Patterns',
    description: 'Common software design patterns',
    cardCount: 20,
    color: 'bg-brand-orange',
    createdAt: new Date('2023-03-05'),
    lastStudied: null,
  },
  {
    id: '4',
    name: 'Spanish Vocabulary',
    description: 'Essential Spanish words and phrases',
    cardCount: 30,
    color: 'bg-brand-green',
    createdAt: new Date('2023-04-10'),
    lastStudied: new Date('2023-05-14'),
  },
];

const sampleFlashcards: Flashcard[] = [
  {
    id: '101',
    front: 'What is a closure in JavaScript?',
    back: 'A closure is a function that has access to its outer function scope even after the outer function has returned.',
    deckId: '1',
    difficulty: 'medium',
    lastReviewed: new Date('2023-05-10'),
    nextReview: new Date('2023-05-13'),
    reviewCount: 5,
    successRate: 80,
    tags: ['functions', 'scope'],
  },
  {
    id: '102',
    front: 'Explain the concept of hoisting.',
    back: 'Hoisting is JavaScript\'s default behavior of moving declarations to the top of the current scope before code execution.',
    deckId: '1',
    difficulty: 'hard',
    lastReviewed: new Date('2023-05-09'),
    nextReview: new Date('2023-05-12'),
    reviewCount: 7,
    successRate: 65,
    tags: ['scope', 'variables'],
  },
  {
    id: '103',
    front: 'What is the purpose of the useEffect hook?',
    back: 'useEffect allows you to perform side effects in function components, similar to componentDidMount, componentDidUpdate, and componentWillUnmount in class components.',
    deckId: '2',
    difficulty: 'medium',
    lastReviewed: new Date('2023-05-11'),
    nextReview: new Date('2023-05-15'),
    reviewCount: 3,
    successRate: 90,
    tags: ['hooks', 'lifecycle'],
  },
  {
    id: '104',
    front: '¿Cómo estás?',
    back: 'How are you?',
    deckId: '4',
    difficulty: 'easy',
    lastReviewed: new Date('2023-05-14'),
    nextReview: new Date('2023-05-18'),
    reviewCount: 2,
    successRate: 100,
    tags: ['greetings', 'basic'],
  },
  {
    id: '105',
    front: '¿Dónde está la biblioteca?',
    back: 'Where is the library?',
    deckId: '4',
    difficulty: 'easy',
    lastReviewed: new Date('2023-05-14'),
    nextReview: new Date('2023-05-18'),
    reviewCount: 2,
    successRate: 100,
    tags: ['questions', 'locations'],
  },
  {
    id: '106',
    front: 'Singleton Pattern',
    back: 'A design pattern that restricts the instantiation of a class to a single instance. Useful when exactly one object is needed to coordinate actions across the system.',
    deckId: '3',
    difficulty: 'medium',
    lastReviewed: null,
    nextReview: null,
    reviewCount: 0,
    successRate: 0,
    tags: ['creational', 'object'],
  },
];

const sampleStats: UserStats = {
  streakDays: 7,
  totalCardsStudied: 150,
  totalStudyTime: 480, // 8 hours
  masteredCards: 42,
  averageSuccessRate: 78,
};

const samplePerformanceData: PerformanceData[] = [
  { date: '2023-05-08', cardsStudied: 15, successRate: 73 },
  { date: '2023-05-09', cardsStudied: 18, successRate: 78 },
  { date: '2023-05-10', cardsStudied: 22, successRate: 82 },
  { date: '2023-05-11', cardsStudied: 12, successRate: 75 },
  { date: '2023-05-12', cardsStudied: 20, successRate: 85 },
  { date: '2023-05-13', cardsStudied: 25, successRate: 88 },
  { date: '2023-05-14', cardsStudied: 30, successRate: 90 },
];

// Define the store state interface
interface StoreState {
  // App state
  isDarkMode: boolean;
  setDarkMode: (isDark: boolean) => void;
  currentDeckId: string | null;
  setCurrentDeckId: (deckId: string | null) => void;
  
  // Data
  decks: Deck[];
  flashcards: Flashcard[];
  studySessions: StudySession[];
  userStats: UserStats;
  performanceData: PerformanceData[];
  
  // Deck operations
  addDeck: (deck: Omit<Deck, 'id' | 'createdAt' | 'cardCount'>) => void;
  updateDeck: (deckId: string, updates: Partial<Deck>) => void;
  deleteDeck: (deckId: string) => void;
  
  // Flashcard operations
  addFlashcard: (card: Omit<Flashcard, 'id' | 'reviewCount' | 'successRate' | 'lastReviewed' | 'nextReview'>) => void;
  updateFlashcard: (cardId: string, updates: Partial<Flashcard>) => void;
  deleteFlashcard: (cardId: string) => void;
  
  // Study operations
  recordReview: (cardId: string, wasCorrect: boolean) => void;
  startStudySession: (deckId: string) => string;
  endStudySession: (sessionId: string, cardsStudied: number, correctAnswers: number) => void;
  
  // Getters
  getFlashcardsByDeck: (deckId: string) => Flashcard[];
  getDeckById: (deckId: string) => Deck | undefined;
  calculateDueCards: (deckId: string) => number;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial app state
      isDarkMode: false,
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
      currentDeckId: null,
      setCurrentDeckId: (deckId) => set({ currentDeckId: deckId }),
      
      // Initial data
      decks: sampleDecks,
      flashcards: sampleFlashcards,
      studySessions: [],
      userStats: sampleStats,
      performanceData: samplePerformanceData,
      
      // Deck operations
      addDeck: (deck) => {
        const newDeck: Deck = {
          ...deck,
          id: Date.now().toString(),
          createdAt: new Date(),
          lastStudied: null,
          cardCount: 0,
        };
        
        set((state) => ({
          decks: [...state.decks, newDeck],
        }));
        
        return newDeck.id;
      },
      
      updateDeck: (deckId, updates) => {
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === deckId ? { ...deck, ...updates } : deck
          ),
        }));
      },
      
      deleteDeck: (deckId) => {
        set((state) => ({
          decks: state.decks.filter((deck) => deck.id !== deckId),
          flashcards: state.flashcards.filter((card) => card.deckId !== deckId),
        }));
      },
      
      // Flashcard operations
      addFlashcard: (card) => {
        const newCard: Flashcard = {
          ...card,
          id: Date.now().toString(),
          reviewCount: 0,
          successRate: 0,
          lastReviewed: null,
          nextReview: null,
        };
        
        set((state) => ({
          flashcards: [...state.flashcards, newCard],
          decks: state.decks.map((deck) =>
            deck.id === card.deckId
              ? { ...deck, cardCount: deck.cardCount + 1 }
              : deck
          ),
        }));
        
        return newCard.id;
      },
      
      updateFlashcard: (cardId, updates) => {
        set((state) => ({
          flashcards: state.flashcards.map((card) =>
            card.id === cardId ? { ...card, ...updates } : card
          ),
        }));
      },
      
      deleteFlashcard: (cardId) => {
        const card = get().flashcards.find((c) => c.id === cardId);
        if (!card) return;
        
        set((state) => ({
          flashcards: state.flashcards.filter((c) => c.id !== cardId),
          decks: state.decks.map((deck) =>
            deck.id === card.deckId
              ? { ...deck, cardCount: Math.max(0, deck.cardCount - 1) }
              : deck
          ),
        }));
      },
      
      // Study operations
      recordReview: (cardId, wasCorrect) => {
        const card = get().flashcards.find((c) => c.id === cardId);
        if (!card) return;
        
        const newReviewCount = card.reviewCount + 1;
        const newSuccessRate =
          ((card.successRate * card.reviewCount + (wasCorrect ? 100 : 0)) /
          newReviewCount);
        
        // Calculate next review date based on difficulty, success rate, etc.
        // This is a simplified spaced repetition algorithm
        let daysToAdd = 1;
        if (wasCorrect) {
          if (card.difficulty === 'easy') daysToAdd = 7;
          else if (card.difficulty === 'medium') daysToAdd = 4;
          else daysToAdd = 2;
          
          // Adjust based on past success
          if (newSuccessRate > 90) daysToAdd *= 1.5;
          else if (newSuccessRate < 70) daysToAdd *= 0.8;
        } else {
          daysToAdd = 1; // Review again tomorrow if wrong
        }
        
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + daysToAdd);
        
        set((state) => ({
          flashcards: state.flashcards.map((c) =>
            c.id === cardId
              ? {
                  ...c,
                  lastReviewed: new Date(),
                  nextReview,
                  reviewCount: newReviewCount,
                  successRate: newSuccessRate,
                }
              : c
          ),
          userStats: {
            ...state.userStats,
            totalCardsStudied: state.userStats.totalCardsStudied + 1,
            masteredCards:
              newSuccessRate >= 90 &&
              newReviewCount >= 5 &&
              state.userStats.masteredCards + 1,
            averageSuccessRate:
              (state.userStats.averageSuccessRate * state.userStats.totalCardsStudied +
                (wasCorrect ? 100 : 0)) /
              (state.userStats.totalCardsStudied + 1),
          },
        }));
      },
      
      startStudySession: (deckId) => {
        const session: StudySession = {
          id: Date.now().toString(),
          deckId,
          startTime: new Date(),
          endTime: null,
          cardsStudied: 0,
          correctAnswers: 0,
        };
        
        set((state) => ({
          studySessions: [...state.studySessions, session],
        }));
        
        return session.id;
      },
      
      endStudySession: (sessionId, cardsStudied, correctAnswers) => {
        const endTime = new Date();
        
        set((state) => {
          const session = state.studySessions.find((s) => s.id === sessionId);
          if (!session) return state;
          
          const durationMinutes = (endTime.getTime() - session.startTime.getTime()) / 60000;
          
          // Update the deck's lastStudied date
          const updatedDecks = state.decks.map((deck) =>
            deck.id === session.deckId ? { ...deck, lastStudied: endTime } : deck
          );
          
          // Add today's performance
          const today = new Date().toISOString().split('T')[0];
          const existingPerfIndex = state.performanceData.findIndex(
            (p) => p.date === today
          );
          let updatedPerformanceData = [...state.performanceData];
          
          if (existingPerfIndex >= 0) {
            // Update existing entry for today
            const existing = state.performanceData[existingPerfIndex];
            updatedPerformanceData[existingPerfIndex] = {
              ...existing,
              cardsStudied: existing.cardsStudied + cardsStudied,
              successRate:
                (existing.successRate * existing.cardsStudied +
                  (correctAnswers / cardsStudied) * 100 * cardsStudied) /
                (existing.cardsStudied + cardsStudied),
            };
          } else {
            // Add new entry for today
            updatedPerformanceData.push({
              date: today,
              cardsStudied,
              successRate: (correctAnswers / cardsStudied) * 100,
            });
          }
          
          // Keep only last 30 days
          if (updatedPerformanceData.length > 30) {
            updatedPerformanceData = updatedPerformanceData.slice(-30);
          }
          
          return {
            studySessions: state.studySessions.map((s) =>
              s.id === sessionId
                ? { ...s, endTime, cardsStudied, correctAnswers }
                : s
            ),
            decks: updatedDecks,
            userStats: {
              ...state.userStats,
              totalStudyTime: state.userStats.totalStudyTime + durationMinutes,
              // Update streak calculation logic here if needed
              streakDays: state.userStats.streakDays,
            },
            performanceData: updatedPerformanceData,
          };
        });
      },
      
      // Getters
      getFlashcardsByDeck: (deckId) => {
        return get().flashcards.filter((card) => card.deckId === deckId);
      },
      
      getDeckById: (deckId) => {
        return get().decks.find((deck) => deck.id === deckId);
      },
      
      calculateDueCards: (deckId) => {
        const now = new Date();
        return get().flashcards.filter(
          (card) =>
            card.deckId === deckId &&
            (!card.nextReview || card.nextReview <= now)
        ).length;
      },
    }),
    {
      name: 'flashcard-storage',
      partialize: (state) => ({
        decks: state.decks,
        flashcards: state.flashcards,
        studySessions: state.studySessions,
        userStats: state.userStats,
        performanceData: state.performanceData,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);

export default useStore;
