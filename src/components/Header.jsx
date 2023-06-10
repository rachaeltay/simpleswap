import React from 'react';
import logo from '../logo.svg';

function Header() {
  return (
    <header className="App-header">
      <h1>
        Simpleswap
      </h1>
      <p>
        Made in
        <img src={logo} className="App-logo" alt="logo" />
      </p>
    </header>
  );
}

export default Header;
