import {createPortal} from 'react-dom';
import styles from './Modal.module.css';
import close from '../../assets/close.svg';
import {useState} from 'react';

const ModalWindow = props => {
  return (
    <>
      <div className={styles.backdrop} onClick={props.onClose}></div>
      <div className={styles.modal}>
        <button className={styles['btn-close']} onClick={props.onClose}>
          <img src={close} alt='закрити' />
        </button>
        <div className={styles.content}>{props.children}</div>
      </div>
    </>
  );
};

const Modal = props => {
  const [isVisible, setIsVisible] = useState(true);
  const onCloseHandler = () => setIsVisible(false);
  const container = document.getElementById('overlay');
  return createPortal(
    isVisible && (
      <ModalWindow onClose={props.onClose || onCloseHandler}>
        {props.children}
      </ModalWindow>
    ),
    container
  );
};
export default Modal;
