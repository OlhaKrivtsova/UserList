import {useState} from 'react';
import SectionAddUser from './components/layout/AddUserSection';
import SectionUserList from './components/layout/UserListSection';

const App = () => {
  //this state is needed to trigger the sending a request to Firebase in case a user was added or the user's data was changed
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
