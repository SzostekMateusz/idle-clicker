import './leftcontent.css';
import UtilityBtn from './ui/UtilityBtn';
import logo from '../assets/golden_billet.png'

const LeftContent = () => {
    return (
        <div className='leftContent'>
            <div className='utility-buttons-containter'>
                <UtilityBtn image='settings' />
                <UtilityBtn image='currency_change' />
            </div>
            <div className='clicker-button-containter'>
                <span className='score-counter'>COUNTER</span>
                <button className='clicker-button'>
                    <img src={logo} alt="Logo" className='clicker-image'/>
                </button>
            </div>
        </div>  
        );
}
 
export default LeftContent;

