import {useCallback, useEffect, useState} from 'react';
import useHttp from '../../hooks/use-http';
import {getAllRecords} from '../../utils/firebase-api';
import UserList from '../UserList';
import styles from './UserListSection.module.css';
import Loader from '../UI/Loader';
import Modal from '../UI/Modal';
import Filter from '../Filter';
import Pagination from '../UI/Pagination';
import useFilterSorting from '../../hooks/use-filter-sorting';
import {inputOptionsForForm} from '../../utils/input-options';

const SectionUserList = ({shouldRefresh, refreshList}) => {
  //send the request to Firebase and get data (the user list) or an error
  const {sendHttpRequest, data, error, status} = useHttp(getAllRecords, true);

  useEffect(() => {
    const controller = {isIgnore: false};
    sendHttpRequest(controller);
    return () => (controller.isIgnore = true);
  }, [sendHttpRequest, shouldRefresh]);

  //filter and sort the user list
  const {
    sorting,
    filter,
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
      <div className={styles['table-container']}>
        <table className={styles.table}>
          <Filter
            inputOptions={inputOptionsForForm}
            changeFilter={changeFilterHandler}
            changeSorting={changeSortingHandler}
            sorting={sorting}
            filter={filter}
          />

          {!error && (
            <UserList
              users={usersFilteredSortedSliced}
              refreshList={refreshList}
            />
          )}
        </table>
      </div>
      <Pagination
        totalAmountOfRecords={usersFilteredSorted.length}
        setRangOfRecords={setRangeOfRecords}
      />
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
