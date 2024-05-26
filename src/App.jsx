import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LeftContent from './components/LeftContent';
import RightContent from './components/RightContent';
import { UpgradeProvider } from './context/UpgradeContext'


function App() {


  return (
    <div className='app-container'>
    <UpgradeProvider>
      <Navbar />
      <News />
        <div className='body-container'>
          <LeftContent />
          <RightContent />
        </div>
      </UpgradeProvider>
  </div> 
  )
}

export default App
