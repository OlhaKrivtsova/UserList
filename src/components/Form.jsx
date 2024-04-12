import {useEffect, useState} from 'react';
import styles from './Form.module.css';
import Button from './UI/Button';
import Input from './UI/Input';
import {inputValidation, setMaskForPhone} from '../utils/input-validation';
import useHttp from '../hooks/use-http';

import Loader from './UI/Loader';

const Form = ({
  refreshList,
  toggleFormVisibility,
  initialValueForInputs,
  firebaseFunction,
  nameSubmitButton,
}) => {
  const inputOptions = [
    {
      name: 'first_name',
      type: 'text',
      label: 'Їм’я',
      value: initialValueForInputs.first_name,
      // autoFocus: true,
    },
    {
      name: 'last_name',
      type: 'text',
      label: 'Прізвище',
      value: initialValueForInputs.last_name,
    },
    {
      name: 'birthday',
      type: 'date',
      label: 'Дата народження',
      value: initialValueForInputs.birthday,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      value: initialValueForInputs.email,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Номер телефону',
      value: initialValueForInputs.phone,
      placeholder: '+380 (__) ___- __-__',
      setMask: setMaskForPhone,
    },
  ];

  const {sendHttpRequest, status, error} = useHttp(firebaseFunction);

  const [areInputsTouched, setAreInputTouched] = useState(false);
  const formData = {};
  let isFormValid = false;

  const updateInputHandler = (inputName, value, isValueValid) => {
    formData[inputName] = {
      value,
      isValueValid,
    };
    isFormValid = true;
    for (let key in formData) {
      isFormValid &&= formData[key].isValueValid;
      if (!isFormValid) break;
    }
  };

  const submitHandler = event => {
    event.preventDefault();

    if (!isFormValid) {
      setAreInputTouched(true);
      return;
    }
    const newRecord = {};
    for (let key in formData) {
      newRecord[key] = formData[key].value;
    }
    if (initialValueForInputs.id) newRecord.id = initialValueForInputs.id;

    sendHttpRequest(newRecord);
  };

  useEffect(() => {
    if (status === 'completed' && !error) {
      toggleFormVisibility();
      refreshList();
    }
  }, [error, status, refreshList, toggleFormVisibility]);

  const inputs = inputOptions.map(item => (
    <Input
      key={item.name}
      {...item}
      update={updateInputHandler}
      isTouched={areInputsTouched}
      inputValidation={inputValidation}
    />
  ));

  if (error) {
    return (
      <p>
        {error}
        <br />
        Не вдалося додати користувача
      </p>
    );
  }

  return (
    <>
      <form className={styles.form} noValidate onSubmit={submitHandler}>
        {inputs}
        <div className={styles.buttons}>
          <Button className={styles.reset} onClick={toggleFormVisibility}>
            Скасувати
          </Button>
          <Button type='submit'>{nameSubmitButton}</Button>
        </div>
      </form>
      {status === 'pending' && <Loader />}
    </>
  );
};

export default Form;
