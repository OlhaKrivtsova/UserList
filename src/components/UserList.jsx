import UserItem from './UserItem';
import styles from './UserList.module.css';

const UserList = ({users, refreshList}) => {
  if (!users[0])
    return (
      <tbody>
        <tr>
          <td className={styles['not-found']} colSpan={7}>
            Користувачів не знайдено
          </td>
        </tr>
      </tbody>
    );

  const rows = users.map(item => (
    <UserItem key={item.id} user={item} refreshList={refreshList} />
  ));
  return <tbody>{rows}</tbody>;
};

export default UserList;
