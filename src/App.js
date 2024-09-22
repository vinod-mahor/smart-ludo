import logo from './logo.svg';
import './App.css';
import LudoBoard from './pages/LudoBoard.jsx';
import { Provider } from 'react-redux';
import Store from './App/Store.js'

function App() {
  return (
    <Provider store={Store} >
      <LudoBoard/>
    </Provider>
  );
}

export default App;
