import type { Enviroment_Object } from '../types/EnviromentTypes';
import { useEnviroment } from '../contexts/EnviromentContext';

export const useEnviromentManager = () => {
    const { setPeople, houses, setHouses } = useEnviroment();

    const HOUSE_SIZE = 50;
    const MAX_ATTEMPTS = 100;
    
    const newEnviromentObject = (name: string) => {
        if (name === "Citizen") {
            const newPerson: Enviroment_Object = {
                id: Date.now(),
                x: Math.random() * window.innerWidth - 20,
                y: Math.random() * window.innerHeight - 20
            };
            setPeople(prev => [...prev, newPerson]);
        } else if (name === "House") {
            const newHouse: Enviroment_Object = {
                id: Date.now(),
                x: Math.random() * window.innerWidth - 50,
                y: Math.random() * window.innerHeight - 50
            };
            const position = getNonOverlapping();
            newHouse.x = position ? position.x : newHouse.x;
            newHouse.y = position ? position.y : newHouse.y;
            setHouses(prev => [...prev, newHouse]);
        } else {
            console.error("Unknown item type for enviroment object");
        }
    }

    const checkOverlap = (newX: number, newY: number, existingObjects: Enviroment_Object[]) => {
        for (const obj of existingObjects) {
            if (newX < obj.x + HOUSE_SIZE && newX + HOUSE_SIZE > obj.x && newY < obj.y + HOUSE_SIZE && newY + HOUSE_SIZE > obj.y) {
                return true;
            }
        }
        return false;
    }

    const getNonOverlapping = () => {
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            const x = Math.random() * (window.innerWidth - HOUSE_SIZE);
            const y = Math.random() * (window.innerHeight - HOUSE_SIZE);

            if (!checkOverlap(x, y, houses)) {
                return { x, y };
            }
        }
        return null; // Failed to find a non-overlapping position
    }

    return { newEnviromentObject };
}   