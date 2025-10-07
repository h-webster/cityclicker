import React, { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react'; 
import type { ShopItem } from '../types/ShopType.tsx';
import { ShopItems } from '../types/ShopType.tsx';

interface GameContextType {
  money: number;
  setMoney: React.Dispatch<React.SetStateAction<number>>;
  income: number;
  setIncome: React.Dispatch<React.SetStateAction<number>>;
  upgrades: ShopItem[];
  setUpgrades: React.Dispatch<React.SetStateAction<ShopItem[]>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: {children: ReactNode}) => {
  const [money, setMoney] = useState(0);
  const [income, setIncome] = useState(0);
  const [upgrades, setUpgrades] = useState<ShopItem[]>(ShopItems);

  return (
    <GameContext.Provider value={{ money, setMoney, income, setIncome, upgrades, setUpgrades }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};