import React, { Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Game } from './pages/game/game';

import './scss/index.scss';

const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return (
    <HashRouter>
      <Suspense>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
