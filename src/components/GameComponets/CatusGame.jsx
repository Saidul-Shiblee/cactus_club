import React, { useEffect, useState } from 'react';
import { GameNumber } from '../../assets/data/local.db';
import { useGlobalContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

const CatusGame = () => {
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const {isLoggedIn} = useGlobalContext();
    const navigate = useNavigate()

    console.log(GameNumber)

    const handleClick = (id) => {
      if(!isLoggedIn) {
        navigate("/login");
      } else {
        if (selectedNumbers.includes(id)) {
          setSelectedNumbers(selectedNumbers.filter(num => num !== id));
        } else {
            if (selectedNumbers.length < 10) {
                setSelectedNumbers([...selectedNumbers, id]);
              }
        }
      }
      };

    useEffect(() => {
        console.log('numbers>>', selectedNumbers);
      }, [selectedNumbers]);
    return (
      <div>
        <div className="grid grid-cols-8 lg:grid-cols-10 gap-2 p-3 lg:p-6">
          {GameNumber.map(({ id }) => (
            <div
              onClick={() => handleClick(id)}
              className={`${
                selectedNumbers.includes(id)
                  ? "tile-style-selected"
                  : "tile-style"
              } px-[15.12px] py-[5.73px] lg:px-[29px] lg:py-[11px] rounded-lg shadow  text-white text-opacity-50 text-lg md:text-[34px] font font-extrabold font-poppins flex justify-center cursor-pointer select-none`}
              key={id}
            >
              {id}
            </div>
          ))}
        </div>
        <div>
          <p className=" text-primary-game text-xs md:text-sm font-normal font-rubik leading-3 uppercase text-center mb-6 ">
            Select between 1 and 10 numbers to play!
          </p>
        </div>
      </div>
    );
};

export default CatusGame;







