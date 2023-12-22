import { FC, useEffect, useState } from 'react';
import "./modal.scss"
interface Props {
    content: string,
    isOpen: boolean,
    onClosed: () => void,
}

const Modal: FC<Props> = ({content, isOpen, onClosed}) => {
  const [isOpened, setIsOpened] = useState(false);

  const openModal = () => {
    setIsOpened(true);
  };

  const closeModal = () => {
    onClosed()
    setIsOpened(false);
  };
  useEffect(() => {
    if(isOpen) {
        openModal()
    }
  }, [isOpen])

  return (
    <div>
      {isOpened && (
        <div className="modal__container">
          <div className="modal__container__content">
            <span className="modal__container__content--closeButton" onClick={closeModal}>
              &times;
            </span> 
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
