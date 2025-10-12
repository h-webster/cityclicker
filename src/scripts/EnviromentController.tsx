import type { Enviroment_Object } from '../types/EnviromentTypes';
import { useEnviroment } from '../contexts/EnviromentContext';
import { useEffect } from 'react';

export const useEnviromentController = () => {
    const {people, setPeople, houses, setHouses} = useEnviroment();

    useEffect(() => {
        const interval = setInterval(() => {
          setPeople((prevPeople) =>
            prevPeople.map((p) => {
                    if (p.waitTime <= 0) {
                        // switch status
                        if (p.status == "at-home") { 
                            return {
                                ...p,
                                status: "idle",
                                waitTime: Math.floor(Math.random() * 2000) + 300,
                            };
                        }
                        else if (p.taken && p.status == "idle") { 
                            return {
                                ...p,
                                status: "to-home",
                            }
                        }
                    }
                if (p.status === "idle") {
                    // Random small movement
                    const deltaX = (Math.random() - 0.5) * 10;
                    const deltaY = (Math.random() - 0.5) * 10;
                    return {
                        ...p,
                        x: Math.min(Math.max(p.x + deltaX, 0), window.innerWidth - 20),
                        y: Math.min(Math.max(p.y + deltaY, 0), window.innerHeight - 20),
                        waitTime: p.waitTime - 1
                    };
                }
                else if (p.status == "to-home") {
                    if (!p.taken) {
                        console.warn(`Person ${p.id} is not taken but is set to be moving to home`);
                        return p;
                    }
                    // move towards home
                    const homeX = p.targetX;
                    const homeY = p.targetY;

                    if (homeX === undefined || homeY === undefined) {
                        console.warn(`Person ${p.id} has no target position`);
                        return p;
                    }
                    const SPEED = 1.5;
                    const dX = (homeX - p.x);
                    const dY = (homeY - p.y);
                    
                    let moveX;
                    let moveY;
                    if (dY > 0) {
                        moveY = Math.min(dY, SPEED);
                    } else {
                        moveY = Math.max(dY, -SPEED);
                    }
                    if (dX > 0) {
                        moveX = Math.min(dX, SPEED);
                    } else {
                        moveX = Math.max(dX, -SPEED);
                    }

                    const d = Math.sqrt((homeX - p.x) * (homeX - p.x) + (homeY - p.y) * (homeY - p.y));
                    if (d < 12) {
                        return {
                            ...p,
                            x: p.x + moveX,
                            y: p.y + moveY,
                            status: "at-home",
                            waitTime: Math.floor(Math.random() * 1000) + 300,
                        }
                    }
                    return {
                        ...p,
                        x: p.x + moveX,
                        y: p.y + moveY,
                    };
                } else if (p.status == "at-home") {
                    return {
                        ...p,
                        waitTime: p.waitTime - 1,
                    };
                }
                return p;
            })
          );
        }, 100); // update every 100ms
    
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        for (const house of houses) {
            if (!house.taken) { // house doesn't have an owner yet
                const potentialOwner = people.find(p => !p.taken);
                if (potentialOwner) {
                    // Assign the house to the potential owner
                    setHouses(prev => prev.map(h => 
                        h.id === house.id ? { ...h, taken: true } : h
                    ));
                    setPeople(prev => prev.map(p => 
                        p.id === potentialOwner.id ? { ...p, taken: true, targetX: house.x, targetY: house.y } : p
                    ));
                    console.log(`House ${house.id} taken by person ${potentialOwner.id}`);
                }
            }
        }
    }, [houses]);
}