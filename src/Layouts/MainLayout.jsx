import React from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import MobileLogSignIn from '../components/MobileLogSignIn';
import { useGlobalContext } from '../context/context';

const MainLayout = ({children}) => {
    const { isLoggedIn } = useGlobalContext();

    return (
        <>
            <Navbar />
            {children}
            {
                isLoggedIn?null:<MobileLogSignIn />
            }
            <Footer/>
        </>
    );
};

export default MainLayout;