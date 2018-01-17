import React, { Component } from 'react';
import './Home.css';
import Typist from 'react-typist';

export default class Home extends Component {
    render() {
        return (
            <div className='home_background'>

                <div>
                    <Typist>
                        <section className='home_title'> Cooking with Love, Provides food for the Soul!</section>
                    </Typist>
                </div>
                <div>
                    <a href={process.env.REACT_APP_LOGIN}>
                        <button className='home_button'>Let's Begin!</button>
                    </a>
                </div>
                <div className='demo_credentials'>
                    <h1>Demo Credentials</h1>
                    <h2>Select Yahoo</h2>
                    <ul>
                        <li>Email:demo_jd7@yahoo.com</li>
                        <li>Password:Password!17</li>
                    </ul>
                </div>
            </div>
        )
    }
}