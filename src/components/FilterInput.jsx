import styles from './FilterInput.module.css';
import close from '../assets/close.svg';
import {useState} from 'react';

const FilterInput = ({name, label, changeFilter, sorted = false}) => {
  const [inputValue, setInputValue] = useState('');
  // console.log(inputValue);

  const changeHandler = event => {
    setInputValue(event.target.value);
    changeFilter(name, event.target.value);
  };

  const clickHandler = () => {
    setInputValue('');
    changeFilter(name, '');
  };

  return (
    <div className={styles['input-group']}>
      <div className={styles['label-row']}>
        <label htmlFor={name}>{label}</label>
        {sorted && (
          <div>
            <button className={styles['btn-sort']}>&darr;</button>
            <button className={styles['btn-sort']}>&uarr;</button>
          </div>
        )}
      </div>

      <div className={styles.input}>
        <input
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
