import React from  'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './pages/layout';
import Dashboard from './pages/dashboard';
import Voters from './pages/voters';
import Events from './pages/events';
import Login from './components/auth/login';
import Vote from './pages/vote';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path='voters' element={<Voters />}></Route>
            <Route path='candidates' element={<Events />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/vote' element={<Vote />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;