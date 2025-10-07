import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react'; 
import type { Enviroment_Object } from '../types/EnviromentTypes.tsx';

interface EnviromentContextType {
    people: Enviroment_Object[];
    setPeople: React.Dispatch<React.SetStateAction<Enviroment_Object[]>>;
}

const EnviromentContext = createContext<EnviromentContextType | undefined>(undefined);

export const EnviromentProvider = ({ children }: {children: ReactNode}) => {
  const [people, setPeople] = useState<Enviroment_Object[]>([]);

  return (
    <EnviromentContext.Provider value={{ people, setPeople }}>
      {children}
    </EnviromentContext.Provider>
  );
};

export const useEnviroment = () => {
    const context = useContext(EnviromentContext);
    if (context === undefined) {
        throw new Error('useEnviroment must be used within an EnviromentProvider');
    }
    return context;
};