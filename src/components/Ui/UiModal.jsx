// src/components/Modal.js
import React from 'react';
import UiButton from './UiButton';

const UiModal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-[#15523F8F] opacity-[56%]"></div>
            <div className="z-50 bg-white p-3 mx-2 md:mx-0 rounded-[30px] shadow">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="text-white bg-emerald-400 w-7 h-7 rounded-full"
                >
                  X
                </button>
              </div>
              <div className="mt-4" onClick={onClose}>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UiModal;
