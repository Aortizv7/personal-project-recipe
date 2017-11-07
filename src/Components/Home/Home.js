import React from 'react';
import './Home.css';

export default function Home() {
    return (
        <div className='home_background'>
            <a href={process.env.REACT_APP_LOGIN}>
                <button className='home_button'>Let's get started!</button>
            </a>
        </div>
    )
}