import {useState} from 'react';
import styles from './AddUserSection.module.css';
import Button from '../UI/Button';
import Form from '../Form';
import Modal from '../UI/Modal';
import {addRecord} from '../../utils/firebase-api';
import {inputOptionsForForm} from '../../utils/input-options';

const SectionAddUser = ({refreshList}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleFormVisibility = () => {
    setIsFormVisible(prev => !prev);
  };

  return (
    <section className={styles.section}>
      {!isFormVisible && (
        <Button onClick={toggleFormVisibility}>Додати користувача</Button>
      )}
      {isFormVisible && (
        <Modal onClose={toggleFormVisibility}>
          <Form
            inputOptions={inputOptionsForForm}
            refreshList={refreshList}
            toggleFormVisibility={toggleFormVisibility}
            firebaseFunction={addRecord}
            nameSubmitButton='Додати'
          />
        </Modal>
      )}
    </section>
  );
};

export default SectionAddUser;
