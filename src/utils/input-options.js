import {setMaskForPhone} from './input-validation';

export const inputOptionsForForm = {
  first_name: {
    type: 'text',
    label: 'Ім’я',
    sorted: true, // if data should be sorted on this field (can be omitted if it shouldn't)
    filtered: true, // if data should be filtered on this field (can be omitted if it shouldn't)
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
