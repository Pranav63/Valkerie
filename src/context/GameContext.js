// src/context/GameContext.js
import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [unlockedGifts, setUnlockedGifts] = useState([]);
  const [puzzleProgress, setPuzzleProgress] = useState(0);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const unlockGift = (giftId) => {
    setUnlockedGifts([...unlockedGifts, giftId]);
  };

  return (
    <GameContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      unlockedGifts,
      unlockGift,
      puzzleProgress,
      setPuzzleProgress
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);