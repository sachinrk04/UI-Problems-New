import { useEffect, useState } from 'react';
import Lights from '@/components/TrafficLightIIComponents/Lights';

const LIGHTSEQUENCE = [
  { light: "GREEN", duration: 3000 },
  { light: "YELLOW", duration: 1000 },
  { light: "RED", duration: 4000 },
];

const TrafficLightII = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % LIGHTSEQUENCE.length);
        }, LIGHTSEQUENCE[activeIndex].duration);

        return () => clearTimeout(timer);
    }, [activeIndex])

    const activeLight = LIGHTSEQUENCE[activeIndex].light;

  return (
    <div className='p-4'>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center justify-center gap-4'>
            <Lights variant='col' activeLight={activeLight} />
            <Lights variant='row' activeLight={activeLight} />
        </div>
      </div>
    </div>
  );
}

export default TrafficLightII;