
import { useEffect } from 'react';
import useStore from '../store/useStore';
import DeckCard from '../components/DeckCard';
import StatsChart from '../components/StatsChart';
import StatCard from '../components/StatCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { decks, userStats, performanceData, setCurrentDeckId } = useStore();
  const navigate = useNavigate();
  
  const handleStudyDeck = (deckId: string) => {
    setCurrentDeckId(deckId);
    navigate(`/study/${deckId}`);
  };

  return (
    <div className="container max-w-7xl mx-auto mt-24 px-4 pb-12">
      <div className="grid grid-cols-1 gap-8">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-serif font-bold mb-2">Welcome to CardBrain</h2>
          <p className="text-secondary-foreground">Your personalized spaced repetition system for efficient learning.</p>
        </div>

        {/* Stats Section */}
        <section>
          <h3 className="text-xl font-medium mb-4">Your Learning Stats</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Days Streak" 
              value={userStats.streakDays} 
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 3V7M7 3V7M3 11H21M5 5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>} 
              color="text-brand-orange"
            />
            <StatCard 
              title="Total Cards Studied" 
              value={userStats.totalCardsStudied} 
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>} 
              color="text-brand-blue"
            />
            <StatCard 
              title="Study Time (hrs)" 
              value={(userStats.totalStudyTime / 60).toFixed(1)} 
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>} 
              color="text-brand-teal"
            />
            <StatCard 
              title="Mastery Rate" 
              value={`${userStats.averageSuccessRate.toFixed(1)}%`} 
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3V21M5 3L12 7L19 3M5 21L12 17L19 21M5 12L12 8L19 12M19 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>} 
              color="text-brand-green"
            />
          </div>
        </section>

        {/* Chart Section */}
        <section className="grid grid-cols-1 gap-4">
          <StatsChart performanceData={performanceData} />
        </section>

        {/* Decks Section */}
        <section>
          <h3 className="text-xl font-medium mb-4">Your Decks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <DeckCard 
                key={deck.id} 
                deck={deck} 
                onClick={() => handleStudyDeck(deck.id)}
              />
            ))}
            
            <div 
              className="rounded-xl border border-dashed border-secondary flex items-center justify-center h-[200px] cursor-pointer hover:bg-secondary/10 transition-colors transform hover:scale-102 active:scale-98 transition-transform"
            >
              <div className="flex flex-col items-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="mt-2 font-medium">Create New Deck</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
