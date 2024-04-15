import styles from './Filter.module.css';
import FilterInput from './FilterInput';

const Filter = ({changeFilter, changeSorting, sortedName}) => {
  return (
    <div className={styles.row}>
      <div></div>
      <FilterInput
        changeFilter={changeFilter}
        changeSorting={changeSorting}
        sortedName={sortedName}
        name='first_name'
        label="Ім'я"
      />
      <FilterInput
        changeFilter={changeFilter}
        changeSorting={changeSorting}
        sortedName={sortedName}
        name='last_name'
        label='Прізвище'
      />
      <FilterInput
        changeFilter={changeFilter}
        changeSorting={changeSorting}
        sortedName={sortedName}
        name='birthday'
        label='Дата народження'
      />
      <FilterInput
        changeFilter={changeFilter}
        changeSorting={changeSorting}
        sortedName={sortedName}
        name='email'
        label='Email'
      />
      <FilterInput
        changeFilter={changeFilter}
        changeSorting={changeSorting}
        sortedName={sortedName}
        name='phone'
        label='Номер телефону'
      />
    </div>
  );
};

export default Filter;
