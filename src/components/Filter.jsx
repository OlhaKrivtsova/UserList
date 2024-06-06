import FilterInput from './FilterInput';

const Filter = ({
  inputOptions,
  changeFilter,
  changeSorting,
  sorting,
  filter,
}) => {
  const inputs = [];
  for (const key in inputOptions) {
    const input = {name: key, label: inputOptions[key].label};
    if (inputOptions[key].sorted) {
      input.changeSorting = changeSorting;
      input.sorting = sorting;
      input.filter = filter;
    }
    if (inputOptions[key].filtered) {
      input.changeFilter = changeFilter;
      input.filter = filter;
    }
    inputs.push(input);
  }

  const filterInputs = inputs.map(item => (
    <FilterInput key={item.name} {...item} />
  ));

  return (
    <thead>
      <tr>
        <th></th>
        {filterInputs}
        <th></th>
      </tr>
    </thead>
  );
};

export default Filter;
