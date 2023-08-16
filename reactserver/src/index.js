import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Create from './components/Create.js';
import Login from './components/Login.js';

function App(){
  axios.defaults.withCredentials = true;
  return(
    <div>
      <Routes>
        <Route path="/create" element={<Create/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
