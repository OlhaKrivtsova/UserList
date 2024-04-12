import UserItem from './UserItem';
import styles from './UserList.module.css';

const UserList = ({users, refreshList}) => {
  if (!users[0])
    return <p className={styles['not-found']}>Користувачів не знайдено</p>;

  const list = users.map(item => (
    <UserItem key={item.id} user={item} refreshList={refreshList} />
  ));
  return <ul className={styles.row}>{list}</ul>;
};

export default UserList;
