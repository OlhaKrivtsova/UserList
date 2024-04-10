import {useState} from 'react';
import styles from './Form.module.css';
import Button from './UI/Button';
import Input from './UI/Input';
import {inputValidation, setMaskForPhone} from '../utils/input-validation';

const inputOptions = [
  {name: 'first_name', type: 'text', label: 'Їм’я'},
  {name: 'last_name', type: 'text', label: 'Прізвище'},
  {name: 'birthday', type: 'date', label: 'Дата народження'},
  {name: 'email', type: 'email', label: 'Email'},
  {
    name: 'phone',
    type: 'text',
    label: 'Номер телефону',
    placeholder: '+380 (__) ___- __-__',
    setMask: setMaskForPhone,
  },
];

const Form = props => {
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
    console.log(formData);
    props.toggleFormVisibility();
  };

  const inputs = inputOptions.map(item => (
    <Input
      key={item.name}
      {...item}
      update={updateInputHandler}
      isTouched={areInputsTouched}
      inputValidation={inputValidation}
    />
  ));

  return (
    <form className={styles.form} noValidate onSubmit={submitHandler}>
      {inputs}
      <div className={styles.buttons}>
        <Button className={styles.reset} onClick={props.toggleFormVisibility}>
          Скасувати
        </Button>
        <Button type='submit'>Додати</Button>
      </div>
    </form>
  );
};

export default Form;
