import './navbar.css'
import { useUpgrade } from '../context/UpgradeContext';

const Navbar = () => {
    const {totalIncome, totalMoneySpent} = useUpgrade();


    function counterFormat(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }


    return ( 
    <div className='navbar-container'>
        <div className='income-section'>
            <h1>Total Income: {counterFormat(totalIncome)} $</h1>  
        </div>
        <div className='income-section'>
            <h1>Money Spent: {counterFormat(totalMoneySpent)} $</h1>  
        </div>
        
    </div> );
}
 
export default Navbar;