import { useEffect } from 'react'
import './App.css'
import Shop from './components/Shop.tsx';
import { useGame } from './contexts/GameContext.tsx';
import Enviroment from './components/Enviroment.tsx';
import { useEnviroment } from './contexts/EnviromentContext.tsx';

function App() {
  const { money, setMoney, income } = useGame();
  const { setPeople } = useEnviroment();

  const handleClick = () => {
    setMoney(prev => prev + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPeople((prevPeople) =>
        prevPeople.map((p) => {
          // Random small movement
          const deltaX = (Math.random() - 0.5) * 10;
          const deltaY = (Math.random() - 0.5) * 10;
          return {
            ...p,
            x: Math.min(Math.max(p.x + deltaX, 0), window.innerWidth - 20),
            y: Math.min(Math.max(p.y + deltaY, 0), window.innerHeight - 20),
          };
        })
      );
    }, 100); // update every 100ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const incomeInterval = setInterval(() => {
      console.log(`Gain money ${income}`);
      setMoney(prev => prev + (income / 10));
    }, 100);
    return () => clearInterval(incomeInterval);
  }, [income]);

  return (
    <>
      <Shop/>
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="flex items-center gap-1">
          <h1 className='text-3xl text-green-500'>${money.toFixed(1)}</h1>
          { income > 0 &&
            <h2 className='text-2xl text-green-400'>(+${income}/s)</h2>
          }
        </div>
        <button className='border-none text-6xl bg-gray-200 p-20px w-1/6 h-1/8 rounded-full transition-all duration-300 text-green-500 ease-in-out hover:scale-110 hover:bg-green-500 hover:text-white' onClick={handleClick}>💰</button>
      </div>
      <Enviroment/>
    </>
  )
}

export default App
