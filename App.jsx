import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import Datagrid from './Components/Datagrid';
import Header from './Components/Header';
import Footerr from './Components/Footerr';
import HomePage from "./Components/HomePage";
import React from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      {/* <Trial /> */}
      <Footerr />
    </div>
  );
}

export default App;
