import { useEnviroment } from '../contexts/EnviromentContext.tsx';
export default function Enviroment() {
    const { people, houses } = useEnviroment();
    return (
        <div>
            {people.map((person) => (
                <p 
                key={person.id}
                className="size-4 transition-all duration-300 -z-10 hover:scale-110"
                style={{position: 'fixed', top: person.y, left: person.x}}
                >🧍</p>
            ))}
            {houses.map((house) => (
                <img 
                key={house.id}
                className="size-8 transition-all duration-300 -z-10 hover:scale-110"
                style={{position: 'fixed', top: house.y, left: house.x}}
                src="/house.png"
                alt="House"
                />
            ))}

        </div>
    );
}