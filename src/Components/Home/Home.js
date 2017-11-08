import React, { Component } from 'react';
import './Home.css';
import Typist from 'react-typist';

export default class Home extends Component {
    render() {
        return (
            <div className='home_background'>
                <div>
                    <Typist>
                        <header className='home_header'> Cooking with Love, Provides food for the Soul!</header>
                    </Typist>
                </div>
                <div>
                    <a href={process.env.REACT_APP_LOGIN}>
                        <button className='home_button'>Feed my Soul!</button>
                    </a>
                </div>
            </div>
        )
    }
}