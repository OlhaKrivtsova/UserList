import {useState, useMemo} from 'react';

const useFilterSorting = data => {
  const [filter, setFilter] = useState({});
  const [sorting, setSorting] = useState({});

  const changeFilterHandler = (filterName, filterValue) => {
    setFilter(prev => ({...prev, [filterName]: filterValue}));
  };

  const changeSortingHandler = (sortedName, sortOrder) => {
    setSorting({sortedName, sortOrder});
  };

  const usersFiltered = useMemo(() => {
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
    if (!sorting.sortOrder)
      return usersFiltered.map((item, index) => ({
        ...item,
        numberInOrder: index + 1,
      }));
    const sortedUsers = [...usersFiltered];
    return sortedUsers
      .sort((left, right) => {
        let diff;
        if (sorting.sortedName === 'birthday')
          diff =
            new Date(left[sorting.sortedName]).getTime() -
            new Date(right[sorting.sortedName]).getTime();
        diff = left[sorting.sortedName].localeCompare(
          right[sorting.sortedName],
          'uk'
        );
        if (sorting.sortOrder === 'asc') return diff;
        if (sorting.sortOrder === 'desc') return -diff;
        return 0;
      })
      .map((item, index) => ({
        ...item,
        numberInOrder: index + 1,
      }));
  }, [usersFiltered, sorting]);

  return {
    sorting,
    usersFilteredSorted,
    changeFilterHandler,
    changeSortingHandler,
  };
};

export default useFilterSorting;
