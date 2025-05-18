
import { useState } from 'react';
import { Deck } from '../types';
import useStore from '../store/useStore';

interface DeckCardProps {
  deck: Deck;
  onClick: () => void;
}

const DeckCard = ({ deck, onClick }: DeckCardProps) => {
  const { calculateDueCards } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  
  const dueCards = calculateDueCards(deck.id);
  const lastStudiedText = deck.lastStudied 
    ? new Date(deck.lastStudied).toLocaleDateString() 
    : 'Never';

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-md ${deck.color} bg-opacity-10 dark:bg-opacity-20 border border-border hover:shadow-lg transition-shadow transform hover:-translate-y-1 transition-transform`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-2 w-full ${deck.color}`}></div>
      <div className="p-5">
        <h3 className="font-semibold text-lg">{deck.name}</h3>
        <p className="text-sm text-secondary-foreground/70 mt-1">{deck.description}</p>
        
        <div className="flex justify-between mt-4 text-sm">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5H5V19H19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5 9H19" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {deck.cardCount} cards
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {lastStudiedText}
          </span>
        </div>
        
        <div className="mt-3">
          <div 
            className={`rounded-full py-1 px-4 text-sm font-medium ${dueCards > 0 ? 'bg-brand-blue text-white' : 'bg-secondary text-secondary-foreground'} w-fit ${isHovered && dueCards > 0 ? 'pulse-animation' : ''}`}
          >
            {dueCards} cards due
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckCard;
