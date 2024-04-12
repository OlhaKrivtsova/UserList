import {useState} from 'react';
import styles from './UserItem.module.css';
import editIcon from '../assets/edit.svg';
import Modal from './UI/Modal';
import Form from './Form';
import {editRecord} from '../utils/firebase-api';

const UserItem = ({user, refreshList}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleFormVisibility = () => {
    setIsFormVisible(prev => !prev);
  };

  return (
    <>
      <li className={styles.row}>
        <p>{user.numberInOrder}</p>
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>
        <p>
          {new Date(user.birthday).toLocaleString('uk', {
            dateStyle: 'medium',
          })}
        </p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <button
          onClick={toggleFormVisibility}
          className={styles['btn-edit']}
          title='коригувати'
        >
          <img src={editIcon} alt='коригувати' />
        </button>
      </li>
      {isFormVisible && (
        <Modal onClose={toggleFormVisibility}>
          <Form
            refreshList={refreshList}
            toggleFormVisibility={toggleFormVisibility}
            initialValueForInputs={{...user}}
            nameSubmitButton='Зберегти'
            firebaseFunction={editRecord}
          />
        </Modal>
      )}
    </>
  );
};

export default UserItem;
