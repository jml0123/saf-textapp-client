import React from 'react';

import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import CuratorList from "../../components/CuratorList/CuratorList";
import "./LandingPage.css"

export default function LandingPage(){
    return (
        <>
            <header>
                <NavBar/>
                <Banner/>
            </header>
            <main className="LandingPage">
                <h1 className="section-heading">
                    Custom text messages and news from thought leaders, curators and revolutionaries
                </h1>
                <CuratorList/>
            </main>
            <Footer/>
        </>
    )
}