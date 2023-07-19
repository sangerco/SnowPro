import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer';
import SkiAreaData from './components/SkiAreas/SkiAreaData';
import User from './components/Users/User';
import UserList from './components/Users/UserList'; 

const store = createStore(rootReducer, applyMiddleware(thunk));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <>
        {/* <SkiAreaData /> */}
        <User username='jane'/>
        <UserList />
      </>
    </Provider>
  );
}

export default App;
