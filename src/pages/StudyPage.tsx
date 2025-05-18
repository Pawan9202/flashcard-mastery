
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../store/useStore';
import Flashcard from '../components/Flashcard';

const StudyPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { 
    getFlashcardsByDeck, 
    getDeckById, 
    recordReview,
    startStudySession,
    endStudySession
  } = useStore();
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardHistory, setCardHistory] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  });
  const [sessionEnded, setSessionEnded] = useState(false);
  
  const deck = getDeckById(deckId || '');
  const cards = getFlashcardsByDeck(deckId || '');
  const currentCard = cards[currentCardIndex];
  
  useEffect(() => {
    if (!deck || !deckId) {
      navigate('/');
      return;
    }
    
    // Start a new study session
    const id = startStudySession(deckId);
    setSessionId(id);
    
    // Clean up when component unmounts
    return () => {
      if (sessionId && !sessionEnded) {
        endStudySession(sessionId, stats.total, stats.correct);
      }
    };
  }, [deckId, deck, navigate, startStudySession]);
  
  if (!deck || !cards.length) {
    return (
      <div className="container max-w-7xl mx-auto mt-24 px-4">
        <h2 className="text-2xl font-bold">Deck not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-brand-blue text-white rounded-md"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }
  
  const handleAnswer = (wasCorrect: boolean) => {
    if (!currentCard || !sessionId) return;
    
    // Record this review
    recordReview(currentCard.id, wasCorrect);
    
    // Update session stats
    setStats(prev => ({
      correct: prev.correct + (wasCorrect ? 1 : 0),
      incorrect: prev.incorrect + (wasCorrect ? 0 : 1),
      total: prev.total + 1
    }));
    
    // Add card to history
    setCardHistory(prev => [...prev, currentCard.id]);
    
    // Move to next card or end session
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // End the session
      endStudySession(sessionId, stats.total + 1, stats.correct + (wasCorrect ? 1 : 0));
      setSessionEnded(true);
    }
  };
  
  const handleEndSession = () => {
    if (sessionId && !sessionEnded) {
      endStudySession(sessionId, stats.total, stats.correct);
      setSessionEnded(true);
    }
    navigate('/');
  };

  return (
    <div className="container max-w-7xl mx-auto mt-24 px-4 pb-12">
      {sessionEnded ? (
        <div 
          className="max-w-md mx-auto p-8 bg-card rounded-xl shadow-lg animate-fade-in"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Session Complete!</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
              <span>Cards Studied</span>
              <span className="font-semibold">{stats.total}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-brand-green/20 rounded-lg">
              <span>Correct Answers</span>
              <span className="font-semibold">{stats.correct}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-brand-orange/20 rounded-lg">
              <span>Incorrect Answers</span>
              <span className="font-semibold">{stats.incorrect}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-brand-blue/20 rounded-lg">
              <span>Success Rate</span>
              <span className="font-semibold">
                {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="mt-8 w-full py-3 bg-brand-blue text-white rounded-md font-medium hover:bg-opacity-90 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold">{deck.name}</h2>
              <p className="text-secondary-foreground">{deck.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">
                Card {currentCardIndex + 1} of {cards.length}
              </span>
              <button
                onClick={handleEndSession}
                className="px-4 py-2 border border-secondary rounded-md text-sm font-medium hover:bg-secondary/10"
              >
                End Session
              </button>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="animate-fade-in">
              <Flashcard 
                card={currentCard} 
                onAnswer={handleAnswer}
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <div className="bg-secondary/20 px-4 py-2 rounded-lg text-sm flex items-center space-x-4">
              <div>
                <span className="font-medium text-brand-green">Correct: </span>
                <span>{stats.correct}</span>
              </div>
              <div className="w-px h-4 bg-secondary-foreground/30"></div>
              <div>
                <span className="font-medium text-brand-orange">Incorrect: </span>
                <span>{stats.incorrect}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPage;
