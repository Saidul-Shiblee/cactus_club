export default function InfoData({ data }) {
  const winningNumbers = JSON.parse(data.WinningNumbers);
  const NumbersPicked = JSON.parse(data.NumbersPicked);
  return (
    <div>
      <div>
        <p className=" font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase">
          Player
        </p>
        <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
          <div className="flex items-center">
            <p
              id="deposite"
              className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden font-poppins font-normal"
            >
              {data.Player}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className=" font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase">
          Bet ID
        </p>
        <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
          <div className="flex items-center">
            <p
              id="deposite"
              className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden font-poppins font-normal"
            >
              {data.BetID}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className=" font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase">
          Bet Amount
        </p>
        <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
          <div className="flex items-center">
            <p
              id="deposite"
              className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden font-poppins font-normal"
            >
              {data.BetAmount + " " + data.Coin}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className=" font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase">
          winning numbers
        </p>
        <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
          <div className="flex items-center">
            <p
              id="deposite"
              className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden font-poppins font-normal"
            >
              {
                winningNumbers.map((item, index) => <span key={item}>{item}{index !== winningNumbers.length - 1 && <span>, </span>}</span> )
              }
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className=" font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase">
          Numbers picked
        </p>
        <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
          <div className="flex items-center">
            <p
              id="deposite"
              className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden font-poppins font-normal"
            >
              {
                NumbersPicked.map((item, index) => <span key={item}>{item}{index !== NumbersPicked.length - 1 && <span>, </span>} </span> )
              }
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className=" font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase">
          Payout
        </p>
        <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
          <div className="flex items-center">
            <p
              id="deposite"
              className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden font-poppins font-normal"
            >
              {data.Payout + "x"}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className=" font-poppins text-primary-title text-xs font-bold my-2 mt-4 uppercase">
          Profit
        </p>
        <div className="rounded-[20px] pr-[20px] md:pr-[40px] h-[54px] md:h-[72px] bg-orange-primary cactus-text-color font-poppins text-[16px] font-black placeholder:text-primary-title focus:outline-none border-r-2 flex justify-between">
          <div className="flex items-center">
            <p
              id="deposite"
              className="md:w-full rounded-[20px] px-[20px] md:px-[40px] text-[10px] md:text-base overflow-hidden font-poppins font-normal"
            >
              {Number(data.Profit) >= 0 ? "+" + data.Profit : data.Profit}{" "}
              {data.Coin}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
