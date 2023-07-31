import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import SkiAreaData from './components/SkiAreas/SkiAreaData';
import CreateNewUser from './components/Users/CreateNewUser';
import User from './components/Users/User';
import UserList from './components/Users/UserList'; 
import store from './redux/store';
import MessageView from './components/Messages/MessageView';



const App: React.FC = () => {
  return (
    <Provider store={store}>
      <>
        <SkiAreaData />
        <CreateNewUser />
        <User username='user1'/>
        <UserList />
        <MessageView id={'301'} />
      </>
    </Provider>
  );
}

export default App;
