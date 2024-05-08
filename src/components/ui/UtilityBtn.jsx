import './utilityBtn.css';
import images from '../../imageImport.js'

const UtilityBtn = ({ image }) => {

    const selectedImage = images[image];


    return (
        <button className='utility-btn'>
            <img className='button-image' src={selectedImage}></img>
        </button>
    );
}

export default UtilityBtn;