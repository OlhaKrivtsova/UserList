import {useCallback, useEffect, useMemo, useState} from 'react';
import useHttp from '../../hooks/use-http';
import {getAllRecords} from '../../utils/firebase-api';
import UserList from '../UserList';
import styles from './UserListSection.module.css';
import Loader from '../UI/Loader';
import Modal from '../UI/Modal';
import Container from '../UI/Container';
import Filter from '../Filter';
import Pagination from '../UI/Pagination';

const SectionUserList = ({shouldRefresh, refreshList}) => {
  const {sendHttpRequest, data, error, status} = useHttp(getAllRecords, true);
  const [filter, setFilter] = useState({});
  const [sorted, setSorted] = useState({});
  const [{first, last}, setRange] = useState({first: 0, last: 0});

  const changeFilterHandler = (filterName, filterValue) => {
    setFilter(prev => ({...prev, [filterName]: filterValue}));
  };

  const sortHandler = (sortedName, sortOrder) => {
    console.log(sortedName, sortOrder);

    setSorted({sortedName, sortOrder});
  };

  const setRangeOfRecords = useCallback((first, last) => {
    setRange({first, last});
  }, []);

  useEffect(() => {
    sendHttpRequest();
  }, [sendHttpRequest, shouldRefresh]);

  const usersFiltered = useMemo(() => {
    console.log('filtered');

    const users = data || [];
    return users.filter(item => {
      let include = true;
      for (const key in filter) {
        if (key === 'phone') {
          include &&= item[key]
            .replace(/\D/g, '')
            .includes(filter[key].replace(/\D/g, ''));
        } else if (key === 'birthday') {
          include &&= new Date(item[key])
            .toLocaleString('uk', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })
            .includes(filter[key]);
        } else {
          include &&= item[key]
            .toLowerCase()
            .includes(filter[key].toLowerCase());
        }
        if (!include) break;
      }
      return include;
    });
  }, [data, filter]);

  const usersFilteredSorted = useMemo(() => {
    if (!sorted.sortOrder)
      return usersFiltered.map((item, index) => ({
        ...item,
        numberInOrder: index + 1,
      }));
    const sortedUsers = [...usersFiltered];
    return sortedUsers
      .sort((left, right) => {
        let diff;
        if (sorted.sortedName === 'birthday')
          diff =
            new Date(left[sorted.sortedName]).getTime() -
            new Date(right[sorted.sortedName]).getTime();
        diff = left[sorted.sortedName].localeCompare(right[sorted.sortedName]);

        if (sorted.sortOrder === 'asc') return diff;

        if (sorted.sortOrder === 'desc') return -diff;

        return 0;
      })
      .map((item, index) => ({
        ...item,
        numberInOrder: index + 1,
      }));
  }, [usersFiltered, sorted]);

  const usersFilteredSortedSliced = usersFilteredSorted.slice(first, last);

  return (
    <section className={styles.section}>
      <Container>
        <Filter
          changeFilter={changeFilterHandler}
          changeSorting={sortHandler}
          sortedName={sorted.sortedName}
        />
        {!error && (
          <UserList
            users={usersFilteredSortedSliced}
            refreshList={refreshList}
          />
        )}
        <Pagination
          totalAmountOfRecords={usersFiltered.length}
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
