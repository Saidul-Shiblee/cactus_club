import React from 'react';
import { Link } from 'react-router-dom';

const MobileLogSignIn = () => {
    return (
        <div className='block md:hidden'>
            <div className='flex mb-8 fixed bottom-0 ml-[15px] justify-center'>
                <Link to={"/sign-up"}>
                    <button className='px-12 bg-gradient-bg border-b-[4px] border-[#017f58] py-4 rounded-tl-[100px] rounded-bl-[100px] text-white font-bold font-poppins text-xl uppercase'>Sign Up</button>
                </Link>
                <Link to={"/login"}>
                    <button className='px-[53px] bg-orange-400 border-b-[4px] border-[#BC7522] py-4 rounded-tr-[100px] rounded-br-[100px] text-white font-bold font-poppins text-xl -ml-1 uppercase'>log in</button>
                </Link>
            </div>
        </div>
    );
};

export default MobileLogSignIn;