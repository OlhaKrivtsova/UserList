import {useEffect, useState} from 'react';
import styles from './FormInput.module.css';
import CloseIcon from './UI/SVG/CloseIcon';

const Input = ({
  isTouched,
  inputValidation,
  setMask = null,
  update,
  label,
  value,
  type = 'text',
  name,
  ...props
}) => {
  const [enteredValue, setEnteredValue] = useState(value);
  const [isInputTouched, setIsInputTouched] = useState(isTouched);

  const {isValueValid, errMessage} = inputValidation(enteredValue, name, label);
  const isInputInvalid = !isValueValid && isInputTouched;

  const inputClassName = `${styles.input} ${
    isInputInvalid ? styles.failed : ''
  }`;

  useEffect(() => {
    setIsInputTouched(isTouched);
  }, [isTouched]);

  useEffect(() => {
    update(name, enteredValue, isValueValid);
  }, [enteredValue, isValueValid, errMessage, name, update]);

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
          <button onClick={eraseInputHandler} className={styles['btn-erase']}>
            <CloseIcon />
          </button>
        )}
      </div>
      {isInputInvalid && <p>{errMessage}</p>}
    </div>
  );
};

export default Input;
