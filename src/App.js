import React, { Component } from 'react';
import './App.css';
import router from './router.js';
import MainPage from './Components/MainPage/MainPage';

class App extends Component {
  render() {
    return (
      <div  className='background'>
        <MainPage/>
       {router}
      </div>
    );
  }
}

export default App;
