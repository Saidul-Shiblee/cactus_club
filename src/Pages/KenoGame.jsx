import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import CactusKenoTitle from '../components/GameComponets/cactusKenoTitle';
import CatusGame from '../components/GameComponets/CatusGame';
import GameCredit from '../components/GameComponets/GameCredit';
import PlayKeno from '../components/GameComponets/PlayKeno';
import BetHistory from '../components/GameComponets/BetHistory';
import BalanceRequirment from '../components/GameComponets/BalanceRequirment';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const KenoGame = () => {
  const [auto, setAuto] = useState(false)
  const [gameNumbers, setGameNumbers] = useState([
    { id: 1, },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
    { id: 21 },
    { id: 22 },
    { id: 23 },
    { id: 24 },
    { id: 25 },
    { id: 26 },
    { id: 27 },
    { id: 28 },
    { id: 29 },
    { id: 30 },
    { id: 31 },
    { id: 32 },
    { id: 33 },
    { id: 34 },
    { id: 35 },
    { id: 36 },
    { id: 37 },
    { id: 38 },
    { id: 39 },
    { id: 40 },
  ])
  console.log(gameNumbers);
  return (
    <MainLayout>
      <Toaster />
      <div className="bg-keno-bg-lg bg-cover bg-no-repeat h-full ">
        <CactusKenoTitle />
        <div className="flex flex-wrap md:flex-wrap lg:flex-nowrap px-[15px] md:pr-0 md:pl-[34px] gap-7 mt-2 ">
          <div className="bg-white rounded-lg w-full md:w-[830px] mb-8">
            <CatusGame
              gameNumbers={gameNumbers}
              setGameNumbers={setGameNumbers}
            />
            <GameCredit
              setAuto={setAuto}
              auto={auto}
              gameNumbers={gameNumbers}
              setGameNumbers={setGameNumbers}
            />
            <PlayKeno
              auto={auto}
              gameNumbers={gameNumbers}
              setGameNumbers={setGameNumbers}
            />
            <BalanceRequirment />
          </div>
          <div className="bg-white bg-opacity-40 w-full border-3xl rounded-lg md:rounded-l-lg md:rounded-r-none pt-8 px-[15px] md:pr-0 md:pl-3">
            <BetHistory />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default KenoGame;