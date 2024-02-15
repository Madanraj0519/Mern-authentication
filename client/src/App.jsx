import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
// Components :-
import Header from './components/Header';

//Pages :-
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/privateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
           <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App