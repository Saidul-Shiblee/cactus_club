import React, { useEffect, useState } from 'react';
import MainLayout from '../Layouts/MainLayout';

const Experiment = () => {

  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped((prevFlipped) => !prevFlipped);
    }, 2000);

    return () => clearInterval(flipInterval);
  }, []);
  
    return (
        <MainLayout>
 
 <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="relative w-64 h-40">
        <div className={`absolute w-full h-full bg-green-500 rounded-lg transform transition-transform duration-500 ease-in-out ${isFlipped ? '-rotate-y-180' : 'rotate-y-0'}`}>
          <div className="absolute inset-0 flex justify-center items-center">
            <h2 className="text-white text-2xl">Front of Card</h2>
          </div>
          <div className="absolute inset-0 bg-red-500 rounded-lg flex justify-center items-center">
            <h2 className="text-white text-2xl">Back of Card</h2>
          </div>
        </div>
      </div>
    </div>

        </MainLayout>
    );
};

export default Experiment;