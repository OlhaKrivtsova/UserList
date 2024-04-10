import {useEffect, useState} from 'react';
import styles from './Input.module.css';

const Input = ({
  isTouched,
  inputValidation,
  setMask = null,
  update,
  label,
  type = 'text',
  name,
  ...props
}) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isInputTouched, setIsInputTouched] = useState(isTouched);
  const {isValueValid, errMessage} = inputValidation(enteredValue, name, label);
  const isInputInvalid = !isValueValid && isInputTouched;

  const inputClassName = isInputInvalid ? styles.failed : '';

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

  // const resetInputState = () => {
  //   setEnteredValue('');
  //   setIsInputTouched(false);
  // };

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        className={inputClassName}
        type={type}
        id={name}
        name={name}
        {...props}
        value={enteredValue}
        onChange={changeInputHandler}
        onBlur={blurInputHandler}
      />
      {isInputInvalid && <p>{errMessage}</p>}
    </div>
  );
};

export default Input;
