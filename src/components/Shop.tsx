import { ShopItems } from '../types/ShopType.tsx'
import type { ShopItem } from '../types/ShopType.tsx';
import { useState, useEffect } from 'react'
import { useGame } from '../contexts/GameContext.tsx';
import type { Enviroment_Object } from '../types/EnviromentTypes.tsx';
import { useEnviroment } from '../contexts/EnviromentContext.tsx';

export default function Shop() {
    const [isShopOpen, openShop] = useState(false);
    const { money, setMoney, income, setIncome, upgrades, setUpgrades } = useGame();
    const { people, setPeople } = useEnviroment();

    const buy = (item: ShopItem) => {
        if (money >= item.price) {
            setMoney(prev => prev - item.price); // prev is the latest state
            setIncome(prev => prev + item.income);

            setUpgrades(prev => prev.map(upgrade => 
                upgrade.name === item.name
                    ? {...upgrade, owned: (upgrade.owned || 0) + 1 }
                    : upgrade
            ));

            const newPerson: Enviroment_Object = {
                id: Date.now(),
                x: Math.random() * window.innerWidth - 20,
                y: Math.random() * window.innerHeight - 20
            };
            setPeople(prev => [...prev, newPerson]);
        }
    }
    return (
        <>
            <button onClick={() => openShop(true)} className={`fixed text-white h-1/4 w-14 top-0 -left-2 text-4xl bg-gray-600 transition-all duration-300 hover:w-18 rounded ${isShopOpen ? "invisible" : "visible"}`}>&gt;</button>
            <div className={`flex gap-12 flex-col items-center fixed top-0 left-0 h-full bg-gray-600 text-white w-100 p-4 transform transition-transform duration-300 ${isShopOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button onClick={() => openShop(false)}className="text-4xl text-red-400 bg-gray-600 transition-all duration-300 hover:scale-110 rounded">Close ❌</button>
                <div className="flex flex-col items-center w-full">
                {upgrades.map((item, index) => (
                    <button key={index} onClick={() => buy(item)} className="relative border-white border-2 h-40 bg-gray-500 w-5/6 rounded transition-all duration-300 ease-out hover:scale-105">
                        <div className="absolute text-left left-2 top-2 text-3xl">
                        <h2 className="text-3xl">{item.name}</h2>
                        <h2 className='text-3xl text-green-500'>${item.price}</h2>
                        <p className='text-xl'>+${item.income}/s</p>
                        <p className='text-xl'>Owned: {item.owned}</p>
                        </div>
                        <img src={item.img} alt="person-img" className='absolute -right-7 top-0 text-6xl h-full'/>
                    </button>
                ))}
                </div>
            </div>
        </>
    )
}