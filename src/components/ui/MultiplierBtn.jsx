import './multiplierBtn.css'

const MultiplierBtn = ( { multiplier } ) => {
    return (  
        <div className='btn-container'>
            <button className='btn'>X{multiplier}</button>
        </div>
    );
}
 
export default MultiplierBtn;