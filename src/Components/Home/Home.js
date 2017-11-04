import React, { Component } from 'react';
import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div className='home_background'>
                <a href={process.env.REACT_APP_LOGIN}>     
                    <button id='star-six'className='home_button'>Let's get started</button>
                </a>
                {console.log(process.env.REACT_APP_LOGIN)}
            </div>
        )
    }
}