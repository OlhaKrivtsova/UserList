import styles from './EditIcon.module.css';
import icons from '../../../assets/icons.svg';

const EditIcon = ({className = ''}) => {
  return (
    <svg className={[className, styles.icon].join(' ')}>
      <use href={`${icons}#icon-edit`}></use>
    </svg>
  );
};

export default EditIcon;
