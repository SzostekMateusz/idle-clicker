import './utilityBtn.css';
import images from '../../imageImport.js'

const UtilityBtn = ({ image, onClick }) => {

    const selectedImage = images[image];


    return (
        <button className='utility-btn' onClick={onClick}>
            <img className='button-image' src={selectedImage}></img>
        </button>
    );
}

export default UtilityBtn;