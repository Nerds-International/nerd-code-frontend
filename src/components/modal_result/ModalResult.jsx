import './ModalResult.css';
import {observer} from "mobx-react-lite";
import {useState} from "react";

const ModalResult =  observer( ({ state }) => {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
    };

    if (!isOpen) {
        return null;
    }

    let emoji, message;

    switch (state) {
        case 'Success':
            emoji = '✅';
            message = 'Success';
            break;
        case 'Lose':
            emoji = '😢';
            message = 'You lose';
            break;
        case 'Win':
            emoji = '🤓';
            message = 'You win, 100% nerd';
            break;
        default:
            emoji = '';
            message = '';
    }

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="modal-emoji">{emoji}</span>
                <p className="modal-message">{message}</p>
                <button className="modal-close-button" onClick={closeModal}>Close</button>
            </div>
        </div>
    );
});

export default ModalResult;