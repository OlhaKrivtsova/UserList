import {useState} from 'react';
import styles from './App.module.css';
import Form from './components/Form';
import Button from './components/UI/Button';

const App = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleFormVisibility = () => {
    setIsFormVisible(prev => !prev);
  };

  return (
    <section className={styles.sectionAddUser}>
      {!isFormVisible && (
        <Button className={styles.form__button} onClick={toggleFormVisibility}>
          Додати користувача
        </Button>
      )}
      {isFormVisible && <Form toggleFormVisibility={toggleFormVisibility} />}
    </section>
  );
};

export default App;
