import logo from './logo.svg';
import './App.css';
import PersonList from './components/PersonList.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Details from "./components/Details";
import HomePage from './components/HomePage.js'
function App() {
return (
  <Router>
    <Routes>
       <Route path="/" element={<HomePage/>} />
       <Route path="/person_list" element={<PersonList />} />
    </Routes>
  </Router>
  
);
}

export default App;
