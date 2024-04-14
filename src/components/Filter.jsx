import styles from './Filter.module.css';
import FilterInput from './FilterInput';

const Filter = ({changeFilter}) => {
  return (
    <div className={styles.row}>
      <div></div>
      <FilterInput
        changeFilter={changeFilter}
        sorted={true}
        name='first_name'
        label="Ім'я"
      />
      <FilterInput
        changeFilter={changeFilter}
        sorted={true}
        name='last_name'
        label='Прізвище'
      />
      <FilterInput
        changeFilter={changeFilter}
        sorted={true}
        name='birthday'
        label='Дата народження'
      />
      <FilterInput changeFilter={changeFilter} name='email' label='Email' />
      <FilterInput
        changeFilter={changeFilter}
        name='phone'
        label='Номер телефону'
      />
    </div>
  );
};

export default Filter;
