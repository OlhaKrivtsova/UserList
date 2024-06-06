import {useState} from 'react';
import SectionAddUser from './components/layout/AddUserSection';
import SectionUserList from './components/layout/UserListSection';

const App = () => {
  //this state is used to trigger the request sending to Firebase in case a user has been added or the user's data has been changed
  const [shouldRefresh, setShouldRefresh] = useState(1);

  const refreshListHandler = () => {
    setShouldRefresh(prev => -prev);
  };

  return (
    <main>
      <SectionAddUser refreshList={refreshListHandler} />
      <SectionUserList
        shouldRefresh={shouldRefresh}
        refreshList={refreshListHandler}
      />
    </main>
  );
};

export default App;
