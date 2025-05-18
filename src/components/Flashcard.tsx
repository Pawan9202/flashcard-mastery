
import { useState } from "react";
import { Flashcard as FlashcardType } from "../types";

interface FlashcardProps {
  card: FlashcardType;
  onAnswer?: (wasCorrect: boolean) => void;
  showControls?: boolean;
}

const Flashcard = ({ card, onAnswer, showControls = true }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="perspective w-full max-w-xl mx-auto h-72 sm:h-96 relative">
      <div
        className={`relative w-full h-full preserve-3d cursor-pointer transition-transform duration-600 ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => !isFlipped && toggleFlip()}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full rounded-2xl p-8 backface-hidden shadow-lg ${
            isFlipped ? "pointer-events-none" : ""
          } ${
            card.difficulty === "easy" 
              ? "bg-gradient-to-br from-brand-teal/10 to-brand-teal/30"
              : card.difficulty === "medium"
              ? "bg-gradient-to-br from-brand-gold/10 to-brand-gold/30" 
              : "bg-gradient-to-br from-brand-orange/10 to-brand-orange/30"
          } dark:bg-gradient-card-dark`}
        >
          <div className="flex flex-col h-full justify-center items-center">
            <div className="absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-medium bg-black/10 dark:bg-white/10">
              {card.difficulty.charAt(0).toUpperCase() + card.difficulty.slice(1)}
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-center">{card.front}</h3>
            <div className="absolute bottom-6 text-sm opacity-70">Click to reveal answer</div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full rounded-2xl p-8 backface-hidden shadow-lg bg-gradient-to-br from-brand-blue/10 to-brand-blue/30 dark:bg-gradient-card-dark ${isFlipped ? 'rotate-y-180' : 'invisible'}`}
        >
          <div className="flex flex-col h-full">
            <div className="absolute top-4 left-4 text-xs font-medium opacity-70">Answer:</div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-base sm:text-lg text-center">{card.back}</p>
            </div>
            
            {showControls && (
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAnswer?.(false);
                    setIsFlipped(false);
                  }}
                  className="px-6 py-2 bg-brand-orange text-white rounded-md font-medium hover:bg-opacity-90 transform hover:scale-105 active:scale-95 transition-transform"
                >
                  Incorrect
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAnswer?.(true);
                    setIsFlipped(false);
                  }}
                  className="px-6 py-2 bg-brand-green text-white rounded-md font-medium hover:bg-opacity-90 transform hover:scale-105 active:scale-95 transition-transform"
                >
                  Correct
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
