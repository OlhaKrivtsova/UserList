import styles from './Filter.module.css';
import FilterInput from './FilterInput';
import {inputOptions} from './Form';

const Filter = ({changeFilter, changeSorting, sortedName, className}) => {
  const inputs = [];
  for (const key in inputOptions) {
    const input = {name: key, label: inputOptions[key].label};
    if (inputOptions[key].sorted) {
      input.changeSorting = changeSorting;
      input.sortedName = sortedName;
    }
    if (inputOptions[key].filtered) input.changeFilter = changeFilter;
    inputs.push(input);
  }

  const filterInputs = inputs.map(item => (
    <FilterInput key={item.name} {...item} />
  ));

  return (
    <div className={`${styles.row} ${className}`}>
      <div></div>
      {filterInputs}
    </div>
  );
};

export default Filter;
