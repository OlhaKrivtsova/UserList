import {useState} from 'react';
import styles from './AddUserSection.module.css';
import Container from '../UI/Container';
import Button from '../UI/Button';
import Form from '../Form';
import Modal from '../UI/Modal';

const SectionAddUser = ({refreshList}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleFormVisibility = () => {
    setIsFormVisible(prev => !prev);
  };

  return (
    <section className={styles.section}>
      <Container>
        {!isFormVisible && (
          <Button onClick={toggleFormVisibility}>Додати користувача</Button>
        )}
        {isFormVisible && (
          <Modal onClose={toggleFormVisibility}>
            <Form
              refreshList={refreshList}
              toggleFormVisibility={toggleFormVisibility}
              initialValueForInputs={{
                first_name: '',
                last_name: '',
                birthday: '',
                email: '',
                phone: '',
              }}
              nameSubmitButton='Додати'
            />
          </Modal>
        )}
      </Container>
    </section>
  );
};

export default SectionAddUser;
