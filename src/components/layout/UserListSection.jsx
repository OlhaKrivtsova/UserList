import {useCallback, useEffect, useState} from 'react';
import useHttp from '../../hooks/use-http';
import {getAllRecords} from '../../utils/firebase-api';
import UserList from '../UserList';
import styles from './UserListSection.module.css';
import Loader from '../UI/Loader';
import Modal from '../UI/Modal';
import Container from '../UI/Container';
import Filter from '../Filter';
import Pagination from '../UI/Pagination';
import useFilterSorting from '../../hooks/use-filter-sorting';

const SectionUserList = ({shouldRefresh, refreshList}) => {
  //send the request to Firebase and get data (the user list) or an error
  const {sendHttpRequest, data, error, status} = useHttp(getAllRecords, true);
  useEffect(() => {
    sendHttpRequest();
  }, [sendHttpRequest, shouldRefresh]);

  //filter and sort the user list
  const {
    sorting,
    usersFilteredSorted,
    changeFilterHandler,
    changeSortingHandler,
  } = useFilterSorting(data);

  //split on the pages
  const [{first, last}, setRange] = useState({first: 0, last: 0});
  const usersFilteredSortedSliced = usersFilteredSorted.slice(first, last);

  const setRangeOfRecords = useCallback((first, last) => {
    setRange({first, last});
  }, []);

  return (
    <section className={styles.section}>
      <Container>
        <Filter
          changeFilter={changeFilterHandler}
          changeSorting={changeSortingHandler}
          sortedName={sorting.sortedName}
          className={styles.row}
        />
        {!error && (
          <UserList
            users={usersFilteredSortedSliced}
            refreshList={refreshList}
            className={styles.row}
          />
        )}
        <Pagination
          totalAmountOfRecords={usersFilteredSorted.length}
          setRangOfRecords={setRangeOfRecords}
        />
      </Container>
      {status === 'pending' && <Loader />}
      {error && (
        <Modal>
          <p>
            {error}
            <br />
            Не вдалося завантажити список користувачів
          </p>
        </Modal>
      )}
    </section>
  );
};

export default SectionUserList;
