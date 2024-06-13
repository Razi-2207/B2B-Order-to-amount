import React from "react";
import abclogo from "../Assests/abclogo.svg";
import hrclogo from "../Assests/hrclogo.svg";
import '../App.css';

const Header = () => {
    return (
      <header>
        
         <div >
          <img className="abclogo" src={abclogo} alt="abclogo" style={{ float: 'left',marginTop: '30px',marginLeft: '20px'}}/>
          <img className="abclogo" src={hrclogo} alt="abclogo" style={{ float: 'center',marginRight:'226px',marginTop: '30px' }} />
         </div>
         <h1 style={{ textAlign: 'left',marginLeft: '20px',color:'red'}}>Invoice List</h1>
        
      </header>
    );
  }
  
  export default Header;