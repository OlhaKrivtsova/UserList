import {useEffect, useState} from 'react';
import styles from './Form.module.css';
import Button from './UI/Button';
import Input from './FormInput';
import {inputValidation, setMaskForPhone} from '../utils/input-validation';
import useHttp from '../hooks/use-http';
import Loader from './UI/Loader';

//inputOptions is also used in <Filter> to set filter and sorting
export const inputOptions = {
  first_name: {
    type: 'text',
    label: 'Ім’я',
    sorted: true, // if should be sorted (may be omitted if shouldn't)
    filtered: true, // if should be filtered (may be omitted if shouldn't)
    // autoFocus: true,
  },
  last_name: {
    type: 'text',
    label: 'Прізвище',
    sorted: true,
    filtered: true,
  },
  birthday: {
    type: 'date',
    label: 'Дата народження',
    sorted: true,
    filtered: true,
  },
  email: {
    type: 'email',
    label: 'Email',
    // sorted: true,
    filtered: true,
  },
  phone: {
    type: 'text',
    label: 'Номер телефону',
    // sorted: true,
    filtered: true,
    placeholder: '+380 (__) ___- __-__',
    setMask: setMaskForPhone,
  },
};

const Form = ({
  refreshList,
  toggleFormVisibility,
  initialValueForInputs = null,
  firebaseFunction,
  nameSubmitButton,
}) => {
  const inputs = [];
  for (const key in inputOptions) {
    inputOptions[key].value = initialValueForInputs?.[key] ?? '';
    const input = {name: key, ...inputOptions[key]};
    delete input.sorted;
    delete input.filtered;
    inputs.push(input);
  }

  const {sendHttpRequest, status, error} = useHttp(firebaseFunction);

  const [areInputsTouched, setAreInputTouched] = useState(false);

  const formData = {};
  let isFormValid = false;

  //pass the data from the inputs (<FormInput>) to the form (formData)
  //and check if the form is valid (isFormValid)
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

  //send the form data to Firebase in case the form is valid
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
    if (initialValueForInputs?.id) newRecord.id = initialValueForInputs.id;

    sendHttpRequest(newRecord);
  };

  //if it's a success, close the form and trigger update from server
  useEffect(() => {
    if (status === 'completed' && !error) {
      toggleFormVisibility();
      refreshList();
    }
  }, [error, status, refreshList, toggleFormVisibility]);

  const inputList = inputs.map(item => (
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
        Не вдалося додати/змінити дані користувача
      </p>
    );
  }

  return (
    <>
      <form className={styles.form} noValidate onSubmit={submitHandler}>
        {inputList}
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
