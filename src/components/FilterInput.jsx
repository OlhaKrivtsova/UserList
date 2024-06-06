import styles from './FilterInput.module.css';
import CloseIcon from './UI/SVG/CloseIcon';

const FilterInput = ({
  name,
  label,
  changeFilter,
  changeSorting,
  sorting,
  filter,
}) => {
  const classNameForAscendingButton = `${styles['btn-sort']} ${
    sorting && sorting.sortedName === name && sorting.sortOrder === 'asc'
      ? styles.active
      : ''
  }`;
  const classNameForDescendingButton = `${styles['btn-sort']} ${
    sorting && sorting.sortedName === name && sorting.sortOrder === 'desc'
      ? styles.active
      : ''
  }`;

  const changeFilterHandler = event => {
    changeFilter(name, event.target.value);
  };

  const clearFilterHandler = () => {
    changeFilter(name, '');
  };

  const changeSortHandler = sortOrder => {
    if (sorting.sortedName === name && sorting.sortOrder === sortOrder) {
      changeSorting('', '');
    } else {
      changeSorting(name, sortOrder);
    }
  };

  return (
    <th>
      <div className={styles['input-group']}>
        <div className={styles['label-row']}>
          <label htmlFor={changeFilter ? name : false}>{label}</label>
          {sorting && (
            <div className={styles['btns-sort']}>
              <button
                onClick={() => {
                  changeSortHandler('asc');
                }}
                className={classNameForAscendingButton}
              >
                &darr;
              </button>
              <button
                onClick={() => {
                  changeSortHandler('desc');
                }}
                className={classNameForDescendingButton}
              >
                &uarr;
              </button>
            </div>
          )}
        </div>

        {filter && (
          <div className={styles.input}>
            <input
              id={name}
              onChange={changeFilterHandler}
              value={filter[name] || ''}
              type='text'
              name={name}
              placeholder='пошук'
            />
            {filter[name] && (
              <button
                onClick={clearFilterHandler}
                className={styles['btn-erase']}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}
      </div>
    </th>
  );
};

export default FilterInput;
