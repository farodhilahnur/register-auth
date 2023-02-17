import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Component/home';
import Login from './Component/login';
import Register from './Component/register';
import Forgot from './Component/forgot';

function App() {
  return (
    <>
    
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot' element={<Forgot />} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
