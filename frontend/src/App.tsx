import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import SkiAreaData from './components/SkiAreas/SkiAreaData';
import CreateNewUser from './components/Users/CreateNewUser';
import User from './components/Users/User';
import UserList from './components/Users/UserList'; 
import store from './redux/store';



const App: React.FC = () => {
  return (
    <Provider store={store}>
      <>
        <SkiAreaData />
        <CreateNewUser />
        <User username='jane'/>
        <UserList />
      </>
    </Provider>
  );
}

export default App;
