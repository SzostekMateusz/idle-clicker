import './navbar.css'
import { useUpgrade } from '../context/UpgradeContext';

const Navbar = () => {
    const {totalIncome,} = useUpgrade();


    function totalIncomeFormat(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }


    return ( 
    <div className='navbar-container'>
        <div className='income-section'>
            <p>Total Income: {totalIncomeFormat(totalIncome)} $</p>
        </div>     
    </div> );
}
 
export default Navbar;