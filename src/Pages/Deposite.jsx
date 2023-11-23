import React from 'react';
import MainLayout from "../Layouts/MainLayout";
import DepositeInputs from '../components/DepositeInputs';
import DepositQRCode from '../components/DepositQRCode';


const Deposite = () => {
    return (
        <MainLayout>
            <DepositeInputs/>
            <DepositQRCode />
        </MainLayout>
    );
};

export default Deposite;