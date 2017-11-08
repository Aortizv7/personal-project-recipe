import React from 'react';
import './Home.css';

export default function Home() {
    return (
        <div className='home_background'>
            <div>
                <header className='home_header'>Cooking with Love,
                    Provides food for the Soul!</header>
            </div>
            <div>
                <a href={process.env.REACT_APP_LOGIN}>
                    <button className='home_button'>Feed my Soul!</button>
                </a>
            </div>
        </div>
    )
}