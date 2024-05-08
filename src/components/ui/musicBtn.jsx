import './utilityBtn.css';
import images from '../../imageImport.js'

const MusicBtn = ({ image, onClick, onMouseDown }) => {

    const selectedImage = images[image];


    return (
        <button className='utility-btn' onClick={onClick} onMouseDown={onMouseDown}>
            <img className='button-image' src={selectedImage}></img>
        </button>
    );
}

export default MusicBtn;