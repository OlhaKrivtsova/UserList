import {useState} from 'react';
import SectionAddUser from './components/layout/AddUserSection';
import SectionUserList from './components/layout/UserListSection';

const App = () => {
  const [refresh, setRefresh] = useState(1);

  const refreshListHandler = () => {
    setRefresh(prev => -prev);
  };

  return (
    <>
      <SectionAddUser refreshList={refreshListHandler} />
      <SectionUserList refresh={refresh} />
    </>
  );
};

export default App;
