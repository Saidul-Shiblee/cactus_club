import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import CactusKenoTitle from '../components/GameComponets/cactusKenoTitle';
import CatusGame from '../components/GameComponets/CatusGame';
import GameCredit from '../components/GameComponets/GameCredit';
import PlayKeno from '../components/GameComponets/PlayKeno';
import BetHistory from '../components/GameComponets/BetHistory';
import BalanceRequirment from '../components/GameComponets/BalanceRequirment';
import { useState } from 'react';

const KenoGame = () => {
    const [auto ,setAuto]=useState(false)
    // w-[830px]
    return (
      <MainLayout>
        <div className="bg-keno-bg-lg bg-cover bg-no-repeat h-full ">
          <CactusKenoTitle />
          <div className="flex flex-wrap md:flex-wrap lg:flex-nowrap px-[15px] md:pr-0 md:pl-[34px] gap-7 mt-2 ">
            <div className="bg-white rounded-lg w-full md:w-[830px] mb-8">
              <CatusGame />
              <GameCredit setAuto={setAuto} auto={auto} />
              <PlayKeno auto={auto} />
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