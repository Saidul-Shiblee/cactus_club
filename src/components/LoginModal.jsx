import React, { useState } from 'react';
import UiModal from './Ui/UiModal';
import ModalImg from './../assets/image/modalImg.png';
import UiButton from './Ui/UiButton';

const LoginModal = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <div>
            <button onClick={openModal} className="bg-blue-500 text-white p-2">
                Open Modal
            </button>
            <UiModal isOpen={isModalOpen} onClose={closeModal}>
                <div className="px-[118px] justify-center text-center">
                    <img src={ModalImg} className='mx-auto' alt="Modal image"/>
                    <h1 className='text-2xl font-rubik text-primary-title mt-[28px] uppercase'>Login Failed</h1>
                    <p className='text-stone-950 text-opacity-50'>Invalid username or password was entered. Please try again!</p>
                   <UiButton label="OK" onClose={closeModal} classes='!w-full h-16 mt-[30px] mb-[56px]'/>
                </div>
            </UiModal>
        </div>
    );
};

export default LoginModal;