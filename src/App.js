import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// import pages
import Home from './pages/Home' 
import Login from './pages/Login'
import Register from './pages/Register'
import PageNotFound from './pages/PageNotFound'
import Dashboard from './pages/Dashboard'
import CreateWorkout from './pages/CreateWorkout'
import CreateHabit from './pages/CreateHabit'
import ViewHabit from './pages/ViewHabit';
import UpdateHabit from './pages/UpdateHabit';
import ViewWorkout from './pages/ViewWorkout'
import UpdateWorkout from './pages/UpdateWorkout'
import Graph from './pages/Graph'

// import components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if(localStorage.getItem('token')){
      setAuthenticated(true);
      setName(localStorage.getItem('name'));
    }
  }, []);

  const onAuthenticated = (auth, token, user) => {
    setAuthenticated(auth);
    if(auth){
      setName(user);
      localStorage.setItem('token', token);
      localStorage.setItem('name', user);
    }
    else {
      localStorage.removeItem('token');
      localStorage.removeItem('name');

    }

  };

  return (
    <Router>
      <NavBar authenticated={authenticated} onAuthenticated={onAuthenticated} name={name}/>
      <Routes>
        <Route path="/" element={<Home authenticated={authenticated} onAuthenticated={onAuthenticated} />} />
        <Route path="Login" element={<Login authenticated={authenticated} onAuthenticated={onAuthenticated} />} />
        <Route path="Register" element={<Register />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="CreateWorkout" element={<CreateWorkout />} />
        <Route path="CreateHabit" element={<CreateHabit />} />
        <Route path="ViewHabit" element={<ViewHabit />} />
        <Route path="UpdateHabit/:id" element={<UpdateHabit />} />
        <Route path="ViewWorkout" element={<ViewWorkout />} />
        <Route path="UpdateWorkout/:id" element={<UpdateWorkout />} />
        <Route path="Graph" element={<Graph />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
}
export default App