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
      <Navbar />
      <News />
      <div className='body-container'>
      <UpgradeProvider>
        <LeftContent />
        <RightContent />
        </UpgradeProvider>
      </div>
    </div> 
  )
}

export default App
