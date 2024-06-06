import {useState} from 'react';
import styles from './UserItem.module.css';
import EditIcon from './UI/SVG/EditIcon';
import Modal from './UI/Modal';
import Form from './Form';
import {editRecord} from '../utils/firebase-api';
import {inputOptionsForForm} from '../utils/input-options';

const UserItem = ({user, refreshList}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleFormVisibility = () => {
    setIsFormVisible(prev => !prev);
  };

  return (
    <>
      <tr>
        <td>{user.numberInOrder}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>
          {' '}
          {new Date(user.birthday).toLocaleString('uk', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>
          <button
            onClick={toggleFormVisibility}
            className={styles['btn-edit']}
            title='коригувати'
          >
            <EditIcon />
          </button>
        </td>
      </tr>
      {isFormVisible && (
        <Modal onClose={toggleFormVisibility}>
          <Form
            inputOptions={inputOptionsForForm}
            refreshList={refreshList}
            toggleFormVisibility={toggleFormVisibility}
            initialValueForInputs={user}
            nameSubmitButton='Зберегти'
            firebaseFunction={editRecord}
          />
        </Modal>
      )}
    </>
  );
};

export default UserItem;
