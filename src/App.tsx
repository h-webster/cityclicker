import { useState, useEffect, use } from 'react'
import './App.css'
import { ShopItems } from './Shop.tsx'

type Worker = {
  id: number;
  x: number; 
  y: number;
};

function App() {
  const [count, setCount] = useState(0);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isShopOpen, openShop] = useState(true);

  const handleClick = () => {
    setCount(count + 1);

    const newWorker: Worker = {
      id: workers.length,
      x: Math.random() * window.innerWidth - 20,
      y: Math.random() * window.innerHeight - 20
    }
    setWorkers([...workers, newWorker]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkers((prevWorkers) =>
        prevWorkers.map((w) => {
          // Random small movement
          const deltaX = (Math.random() - 0.5) * 10;
          const deltaY = (Math.random() - 0.5) * 10;
          return {
            ...w,
            x: Math.min(Math.max(w.x + deltaX, 0), window.innerWidth - 20),
            y: Math.min(Math.max(w.y + deltaY, 0), window.innerHeight - 20),
          };
        })
      );
    }, 200); // update every 200ms

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <button onClick={() => openShop(true)} className={`fixed text-white h-1/4 w-10 top-0 left-0 text-4xl bg-gray-600 transition-all duration-300 hover:w-16 rounded ${isShopOpen ? "invisible" : "visible"}`}>&gt;</button>
      <div className={`flex gap-12 flex-col items-center fixed top-0 left-0 h-full bg-gray-600 text-white w-100 p-4 transform transition-transform duration-300 ${isShopOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={() => openShop(false)}className="text-4xl text-red-400 bg-gray-600 transition-all duration-300 hover:scale-110 rounded">Close ❌</button>
        <div className="flex flex-col items-center w-full">
          <button className="relative border-white border-2 h-40 bg-gray-500 w-5/6 rounded transition-all duration-300 ease-out hover:scale-105">
            <div className="absolute text-left left-2 top-2 text-3xl">
              <h2 className="text-3xl">{ShopItems[0].name}</h2>
              <h2 className='text-3xl text-green-500'>${ShopItems[0].price}</h2>
              <p className='text-xl'>+$1/s</p>
            </div>
            <img src="/person.png" alt="person-img" className='absolute -right-7 top-0 text-6xl h-full'/>
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <h1 className='text-3xl text-green-500'>${count}</h1>
        <button className='border-none text-6xl bg-gray-200 p-20px w-1/6 h-1/8 rounded-full transition-all duration-300 text-green-500 ease-in-out hover:scale-110 hover:bg-green-500 hover:text-white' onClick={handleClick}>💰</button>
      </div>
      <div>
        {workers.map((worker) => (
          <p 
          key={worker.id}
          className="size-4 transition-all -z-10"
          style={{position: 'fixed', top: worker.y, left: worker.x}}
          >🧍</p>
        ))}
      </div>
    </>
  )
}

export default App
