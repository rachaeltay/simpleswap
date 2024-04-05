import './App.css';
import React from 'react';
import { CircularProgress } from '@mui/material';
import Header from './components/Header';
import Form from './components/Form';
import useCoinGecko from './helper/useCoinGecko';

function App() {
  const [data, error] = useCoinGecko('exchange_rates');

  if (error) {
    return <div>{`Oops! There was an error: ${error.message}`}</div>;
  }
  return (
    <div className='App'>
      <Header />
      {data ? <Form coins={{ ...data.rates }} /> : <CircularProgress />}
    </div>
  );
}

export default App;
