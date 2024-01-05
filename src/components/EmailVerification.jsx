import React, { useEffect, useState } from 'react';
import verificationImg from "./../assets/image/modalImg.png";
import UiButton from './Ui/UiButton';
import OTPInput from 'react-otp-input';
import { useGlobalContext } from '../context/context';
import axios from 'axios';
import UiModal from './Ui/UiModal';
import ModalImg from "./../assets/image/modalImg.png";

const EmailVerification = () => {
    const [currentPath, setCurrentPath] = useState("verify")
    const [otp, setOtp] = useState("");
    const [second, setSecond] = useState(120);
    const [runTimeOut, setRunTimeOut] = useState(false);
    const [verificationMail, setVerificationMail] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const {
        isEmailVarified,
        setIsEmailVerified,

    } = useGlobalContext()





    const closeModal = () => {
        setModalOpen(false);
        setIsEmailVerified(true)

    };


    let timer;
    useEffect(() => {
        if (currentPath === "check") {
            timer = setInterval(() => {
                setSecond(second - 1);
                if (second === 0) {
                    setSecond(0)
                }
            }, 1000)
        }
        return () => clearInterval(timer)

    })

    const handleReset = () => {
        setSecond(120);
    };


    //email verification

    const handleEmailCode = async () => {
        setIsLoading(true)
        try {
            const res = await axios.post("https://apis.yummylabs.io/sendVerifyCode", {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("cactus_club_token")
                }
            })
            setVerificationMail(res.data.data);


            //send otp
            const resOtp = await axios.post("https://apis.yummylabs.io/sendVerifyCode", {
                Email: res.data.data
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("cactus_club_token")
                }
            }
            )

            setCurrentPath("check");
            handleReset();
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    }

    const verifyOtp = async () => {
        setIsLoading(true)
        try {
            const resVerify = await axios.post("https://apis.yummylabs.io/verifyCode", {
                VerifyCode: +otp
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("cactus_club_token")
                }
            })
            if (resVerify.data.code == 1) {
                setModalOpen(true);
                localStorage.setItem("cactus_club_email_verified", true);

            }
            if (resVerify.data.code === -17) {
                setErrMsg("Verification code incorrect, please try again")
            }
            // setIsEmailVerified(true)
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    }

    return (
        <div className=''>
            {
                isEmailVarified ? <div className='hidden'>
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
                                    <p className=' font-IBM text-base font-normal text-center mx-auto w-full md:w-[465px]'>A 4-digit verification code has been sent to {verificationMail} Enter the code below to verify your email address.</p>
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
                                    <p className="text-center text-stone-950 text-base font-normal font-IBM leading-tight mt-[10px]">Didn’t receive a code?{second === 0 ? <span className=' underline cursor-pointer' onClick={handleEmailCode}> Click to resend</span> : <span> Resend code in {second} seconds.</span>}</p>
                                    <UiButton label={"verify"} classes='mx-auto mt-[52px]' onClick={verifyOtp} />
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
                                        onClick={handleEmailCode}
                                        // onClick={() => setCurrentPath("check")}
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
                </div> :
                    <div className='block'>
                        {
                            currentPath === "check" && (
                                <>
                                    <div className='hidden'>
                                        <div className=' justify-center flex items-center bg-deposite-sm md:bg-deposite-lg md:bg-cover'>
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
                                    <div className=' block bg-deposite-sm bg-cover bg-no-repeat h-screen md:bg-deposite-lg md:bg-cover md:bg-no-repeat'>
                                        <h1 className=' font-poppins text-primary-title text-[24px] font-bold text-center'>Please check your email</h1>
                                        <p className=' font-IBM text-base font-normal text-center mx-auto w-full md:w-[465px]'>A 4-digit verification code has been sent to {verificationMail} Enter the code below to verify your email address.</p>
                                        <div className=' justify-center text-center items-center flex mx-auto mt-[24px] otp'>
                                            <OTPInput
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={4}
                                                inputStyle={`${errMsg ? "border-red-700 text-red-700" : "border-black"} border text-3xl rounded-md mx-2 `}
                                                // renderSeparator={<span>-</span>}
                                                renderInput={(props) => <input {...props} />}
                                            />

                                        </div>
                                        <div className=' text-center mx-auto justify-center items-center flex'>
                                            {errMsg && (
                                                <div className="px-2 py-1 rounded-md text-base font-IBM italic text-red-700 flex gap-4 justify-between items-center  transform">
                                                    <p className=" text-center">{errMsg}</p>
                                                    {/* <X
                                                        className="w-4 h-4 cursor-pointer"
                                                        onClick={() => setErrMsg(null)}
                                                    /> */}
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-center text-stone-950 text-base font-normal font-IBM leading-tight mt-[10px]">Didn’t receive a code?{second === 0 ? <span className=' underline cursor-pointer' onClick={handleEmailCode}> Click to resend</span> : <span> Resend code in {second} seconds.</span>}</p>
                                        <UiButton label={isLoading?"verify...": "verify"} classes='mx-auto mt-[52px]' onClick={verifyOtp} />
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

                                        <UiButton
                                            label={isLoading?"Wait...": "Verify Email Now"}
                                            onClick={handleEmailCode}
                                            classes='mx-auto py-0 mt-[52px]' />
                                    </div>
                                    <div className=' hidden'>
                                        <h1 className=' font-poppins text-primary-title text-[24px] font-bold text-center bg-deposite-sm md:bg-deposite-lg'>Please check your email</h1>
                                        <p className=' font-IBM text-base font-normal text-center mx-auto w-full md:w-[465px]'>A 4-digit verification code has been sent to y*****.com Enter the code below to verify your email address.</p>
                                        <div className=' justify-center text-center items-center flex mx-auto mt-[24px]'>
                                            <OTPInput
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={4}
                                                inputStyle="p-6 border rounded-md border-black mx-2"
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
            }

            <div>
                {
                    isModalOpen && (
                        <UiModal isOpen={isModalOpen} onClose={closeModal}>
                            <div className="px-[12px] md:px-[127px] w-[345px] md:w-[690px] justify-center text-center">
                                <img src={ModalImg} className="mx-auto" alt="Modal image" />
                                <div className="w-[321px] md:w-[453px] text-center">
                                    <h1 className="text-2xl font-rubik text-primary-title mt-[28px] uppercase">
                                        verification complete!
                                    </h1>
                                    <p className="text-stone-950 text-opacity-50">
                                        You can now deposit and start playing!                            </p>
                                </div>
                                <UiButton
                                    label="OK"
                                    onClose={closeModal}
                                    classes="w-[321px] md:!w-[453px] !h-[64px] mt-[12px] mb-[56px]"
                                // onClick={setShowModal(false)}
                                />
                            </div>
                        </UiModal>
                    )
                }

            </div>

        </div>
    );
};

export default EmailVerification;