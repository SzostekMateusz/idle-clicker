import './utilityBtn.css';
import images from '../../imageImport.js'

const UtilityBtn = ({ image }) => {

    const selectedImage = images[image];


    return (
            <img className='button-image' src={selectedImage}></img>
    );
}

export default UtilityBtn;