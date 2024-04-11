import styles from './UserList.module.css';

const UserList = ({users}) => {
  if (!users[0])
    return <p className={styles['not-found']}>Користувачів не знайдено</p>;

  const list = users.map(item => (
    <li key={item.id}>
      {item.first_name} {item.last_name}
    </li>
  ));
  return <ul>{list}</ul>;
};

export default UserList;
