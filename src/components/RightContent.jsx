import React from 'react';
import './rightcontent.css'
import MultiplierBtn from './ui/MultiplierBtn';
import UpgradeBox from './ui/UpgradeBox';

import { useUpgrade  } from '../context/UpgradeContext';

const RightContent = () => {
    const { addOne, addOneLevel } = useUpgrade();
    
    return (
        <div className='rightContent'>
            <div className='multiplier-containter'>
                <MultiplierBtn multiplier={1} />
                <MultiplierBtn multiplier={5} />
                <MultiplierBtn multiplier={10} />
                <MultiplierBtn multiplier={25} />
            </div>
            <div className='upgrades-containter'>
                <UpgradeBox title='Coin' upgradePrice={10} image='coin' onClick={addOne} upgradeLevel={addOneLevel}/>
                <UpgradeBox title='Golden Billet' upgradePrice={100} image='golden_billet'/>
                <UpgradeBox title='Coin' upgradePrice={10} image='coin' />
            </div> 
        </div>  
    );
}
 
export default RightContent;