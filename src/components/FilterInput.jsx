import styles from './FilterInput.module.css';
import close from '../assets/close.svg';
import {useEffect, useState} from 'react';

const FilterInput = ({
  name,
  label,
  changeFilter,
  changeSorting = null,
  sortedName,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [sorted, setSorted] = useState('');

  const classNameForAscendingButton = `${styles['btn-sort']} ${
    sorted === 'asc' ? styles.active : ''
  }`;
  const classNameForDescendingButton = `${styles['btn-sort']} ${
    sorted === 'desc' ? styles.active : ''
  }`;

  useEffect(() => {
    sortedName !== name && setSorted('');
  }, [sortedName, name]);

  const changeHandler = event => {
    setInputValue(event.target.value);
    changeFilter(name, event.target.value);
  };

  const clickHandler = () => {
    setInputValue('');
    changeFilter(name, '');
  };

  const sortHandler = sortOrder => {
    if (sorted !== sortOrder) {
      setSorted(sortOrder);
      changeSorting(name, sortOrder);
    }
    if (sorted === sortOrder) {
      setSorted('');
      changeSorting(name, '');
    }
  };

  return (
    <div className={styles['input-group']}>
      <div className={styles['label-row']}>
        <label htmlFor={name}>{label}</label>
        {changeSorting && (
          <div>
            <button
              onClick={() => {
                sortHandler('asc');
              }}
              className={classNameForAscendingButton}
            >
              &darr;
            </button>
            <button
              onClick={() => {
                sortHandler('desc');
              }}
              className={classNameForDescendingButton}
            >
              &uarr;
            </button>
          </div>
        )}
      </div>

      <div className={styles.input}>
        <input
          id={name}
          onChange={changeHandler}
          value={inputValue}
          type='text'
          name={name}
          placeholder='пошук'
        />
        {inputValue && (
          <button onClick={clickHandler} className={styles['btn-erase']}>
            <img src={close} alt='стерти' />
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterInput;
