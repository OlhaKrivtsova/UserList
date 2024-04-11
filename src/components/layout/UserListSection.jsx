import {useEffect} from 'react';
import useHttp from '../../hooks/use-http';
import {getAllRecords} from '../../utils/firebase-api';
import UserList from '../UserList';
import styles from './UserListSection.module.css';
import Loader from '../UI/Loader';
import Modal from '../UI/Modal';

const SectionUserList = ({refresh}) => {
  const {sendHttpRequest, data, error, status} = useHttp(getAllRecords, true);

  useEffect(() => {
    sendHttpRequest();
  }, [sendHttpRequest, refresh]);

  const users = data || [];
  users.reverse();
  const usersFiltered = users.map(item => item);

  return (
    <section className={styles.section}>
      {error && (
        <Modal>
          <p>
            {error}
            <br />
            Не вдалося завантажити список користувачів
          </p>
        </Modal>
      )}
      {!error && <UserList users={usersFiltered} />}
      {status === 'pending' && <Loader />}
    </section>
  );
};

export default SectionUserList;
