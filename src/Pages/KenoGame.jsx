import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import CactusKenoTitle from '../components/GameComponets/cactusKenoTitle';
import CatusGame from '../components/GameComponets/CatusGame';
import GameCredit from '../components/GameComponets/GameCredit';
import PlayKeno from '../components/GameComponets/PlayKeno';
import BetHistory from '../components/GameComponets/BetHistory';
import BalanceRequirment from '../components/GameComponets/BalanceRequirment';

const KenoGame = () => {
    // w-[830px]
    return (
        <MainLayout>
            <div className='bg-keno-bg-lg bg-cover bg-no-repeat h-full max-w-[1920px] mx-auto'>
                <CactusKenoTitle/>
                <div className='flex flex-wrap md:flex-wrap lg:flex-nowrap pl-0 lg:pl-[34px] gap-7 mt-2 mx-4 lg:mx-0'>
                    <div className='bg-white rounded-lg w-[345px] md:w-[830px] mb-8'>
                        <CatusGame/>
                        <GameCredit/>
                        <PlayKeno/>
                        <BalanceRequirment/>
                    </div>
                    <div className='bg-white bg-opacity-40 w-full border-3xl rounded-l-lg pt-8 pl-3'>
                        <BetHistory/>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default KenoGame;