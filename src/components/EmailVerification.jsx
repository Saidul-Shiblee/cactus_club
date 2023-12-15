import React, { useEffect, useState } from 'react';
import verificationImg from "./../assets/image/modalImg.png";
import UiButton from './Ui/UiButton';
import OTPInput from 'react-otp-input';
import { useGlobalContext } from '../context/context';

const EmailVerification = () => {
    const [currentPath, setCurrentPath] = useState("verify")
    const [otp, setOtp] = useState("");
    const [second, setSecond] = useState(5)

    const {
        isEmailVarified, 
        setIsEmailVerified,

    } = useGlobalContext()

    let timer;
  useEffect(() => {
    if(currentPath === "check") {
        timer = setInterval(() => {
            setSecond(second - 1);
            if (second === 0) {
              setSecond(0)
            }
          }, 1000)
    }
    return () => clearInterval(timer) 

  })

  //email verification

// const handleEmailCode = () => {
//     try {
        


        
//     } catch (error) {
//         console.log(error)
//     }
// }

    return (
        <div className=''>
            {/* <div>
                <div className=' justify-center flex items-center'>
                    <img src={verificationImg} alt='deposite' />
                </div>
                <h1 className=' font-poppins text-primary-title text-[24px] font-bold text-center'>Secure your Account</h1>
                <p className=' font-IBM text-base font-normal text-center mx-auto w-full md:w-[465px]'>In order to secure your account, please verify your email address before making any deposits.</p> */}
                {/* <div className=' justify-center items-center mx-auto text-center'> */}
                {/* <UiButton
                    label={"Verify Email Now"}
                    onClick={() => setCurrentPath("check")}
                    classes='mx-auto py-0 mt-[52px]' /> */}
                {/* </div> */}
            {/* </div> */}
            {/* <div>
                <h1 className=' font-poppins text-primary-title text-[24px] font-bold text-center'>Please check your email</h1>
                <p className=' font-IBM text-base font-normal text-center mx-auto w-full md:w-[465px]'>A 4-digit verification code has been sent to y*****.com Enter the code below to verify your email address.</p>
                <div className=' justify-center text-center items-center flex mx-auto mt-[24px]'>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        inputStyle="p-6 border rounded-md border-black mx-2"
                        // renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
                <p className="text-center text-stone-950 text-base font-normal font-IBM leading-tight mt-[10px]">Didn’t receive a code? Resend code in 120 seconds.</p>
                <UiButton label={"verify"} classes='mx-auto mt-[52px]' />
            </div> */}

            {
                currentPath === "check" && (
                    <>
                        <div className='hidden'>
                            <div className=' justify-center flex items-center'>
                                <img src={verificationImg} alt='deposite' />
                            </div>
                            <h1 className=' font-poppins text-primary-title text-[24px] font-bold text-center'>Secure your Account</h1>
                            <p className=' font-IBM text-base font-normal text-center mx-auto w-full md:w-[465px]'>In order to secure your account, please verify your email address before making any deposits.</p>
                            {/* <div className=' justify-center items-center mx-auto text-center'> */}
                            <UiButton
                                label={"Verify Email Now"}
                                onClick={() => setCurrentPath("check")}
                                classes='mx-auto py-0 mt-[52px]' />
                            {/* </div> */}
                        </div>
                        <div className=' block bg-deposite-sm bg-cover bg-no-repeat h-screen md:bg-deposite-lg'>
                            <h1 className=' font-poppins text-primary-title text-[24px] font-bold text-center'>Please check your email</h1>
                            <p className=' font-IBM text-base font-normal text-center mx-auto w-full md:w-[465px]'>A 4-digit verification code has been sent to y*****.com Enter the code below to verify your email address.</p>
                            <div className=' justify-center text-center items-center flex mx-auto mt-[24px]'>
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={4}
                                    inputStyle=" border w-[63px] h-[63px] text-3xl rounded-md border-black mx-2"
                                    // renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>
                            <p className="text-center text-stone-950 text-base font-normal font-IBM leading-tight mt-[10px]">Didn’t receive a code?{second === 0? <span className=' underline cursor-pointer'> Click to resend</span>: <span> Resend code in {second} seconds.</span>}</p>
                            <UiButton label={"verify"} classes='mx-auto mt-[52px]' />
                        </div>
                    </>
                )
            }
            {
                currentPath === "verify" && (
                    <>
                        <div className='block bg-deposite-sm bg-cover bg-no-repeat h-screen md:bg-deposite-lg'>
                            <div className=' justify-center flex items-center'>
                                <img src={verificationImg} alt='deposite' />
                            </div>
                            <h1 className=' font-poppins text-primary-title text-[24px] font-bold text-center'>Secure your Account</h1>
                            <p className=' font-IBM text-base font-normal text-center mx-auto w-full md:w-[465px]'>In order to secure your account, please verify your email address before making any deposits.</p>
                            {/* <div className=' justify-center items-center mx-auto text-center'> */}
                            <UiButton
                                label={"Verify Email Now"}
                                // onClick={handleEmailCode}
                                onClick={() => setCurrentPath("check")}
                                classes='mx-auto py-0 mt-[52px]' />
                            {/* </div> */}
                        </div>
                        <div className=' hidden'>
                            <h1 className=' font-poppins text-primary-title text-[24px] font-bold text-center'>Please check your email</h1>
                            <p className=' font-IBM text-base font-normal text-center mx-auto w-full md:w-[465px]'>A 4-digit verification code has been sent to y*****.com Enter the code below to verify your email address.</p>
                            <div className=' justify-center text-center items-center flex mx-auto mt-[24px]'>
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={4}
                                    inputStyle="p-6 border rounded-md border-black mx-2"
                                    // renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>
                            <p className="text-center text-stone-950 text-base font-normal font-IBM leading-tight mt-[10px]">Didn’t receive a code? Resend code in 120 seconds.</p>
                            <UiButton label={"verify"} classes='mx-auto mt-[52px]' />
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default EmailVerification;