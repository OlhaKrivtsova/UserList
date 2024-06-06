import {useMemo, useState} from 'react';
import styles from './FormInput.module.css';
import CloseIcon from './UI/SVG/CloseIcon';
import {inputValidation} from '../utils/input-validation';

const Input = ({
  isFormTouched,
  setMask = null,
  update,
  label,
  value,
  type = 'text',
  name,
  ...props
}) => {
  const [enteredValue, setEnteredValue] = useState(value);
  const [isInputTouched, setIsInputTouched] = useState(false);

  const {isValueValid, errMessage} = inputValidation(enteredValue, name, label);
  const isInputInvalid = !isValueValid && (isInputTouched || isFormTouched);

  useMemo(
    () => update(name, enteredValue, isValueValid),
    [enteredValue, isValueValid, name, update]
  );

  const inputClassName = `${styles.input} ${
    isInputInvalid ? styles.failed : ''
  }`;

  const changeInputHandler = event => {
    setMask
      ? setEnteredValue(setMask(event.target.value))
      : setEnteredValue(event.target.value);
  };

  const blurInputHandler = () => {
    setIsInputTouched(true);
  };

  const eraseInputHandler = () => {
    setEnteredValue('');
  };

  return (
    <div className={styles['input-group']}>
      <label htmlFor={name}>{label}</label>
      <div className={inputClassName}>
        <input
          type={type}
          id={name}
          name={name}
          {...props}
          value={enteredValue}
          onChange={changeInputHandler}
          onBlur={blurInputHandler}
        />
        {enteredValue && (
          <button
            type='button'
            tabIndex='-1'
            onClick={eraseInputHandler}
            className={styles['btn-erase']}
          >
            <CloseIcon />
          </button>
        )}
      </div>
      {isInputInvalid && <p>{errMessage}</p>}
    </div>
  );
};

export default Input;
