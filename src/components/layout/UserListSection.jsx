import {useEffect} from 'react';
import useHttp from '../../hooks/use-http';
import {getAllRecords} from '../../utils/firebase-api';
import UserList from '../UserList';
import styles from './UserListSection.module.css';
import Loader from '../UI/Loader';
import Modal from '../UI/Modal';
import Container from '../UI/Container';

const SectionUserList = ({shouldRefresh, refreshList}) => {
  const {sendHttpRequest, data, error, status} = useHttp(getAllRecords, true);

  useEffect(() => {
    sendHttpRequest();
  }, [sendHttpRequest, shouldRefresh]);

  const users = data || [];
  users.reverse();
  const usersFiltered = users.map((item, index) => ({
    ...item,
    // birthday: new Date(item.birthday).toLocaleString('uk', {
    //   dateStyle: 'medium',
    // }),
    numberInOrder: index + 1,
  }));

  return (
    <section className={styles.section}>
      <Container>
        {error && (
          <Modal>
            <p>
              {error}
              <br />
              Не вдалося завантажити список користувачів
            </p>
          </Modal>
        )}
        {!error && <UserList users={usersFiltered} refreshList={refreshList} />}
        {status === 'pending' && <Loader />}
      </Container>
    </section>
  );
};

export default SectionUserList;
