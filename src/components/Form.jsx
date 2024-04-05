import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import CoinSelect from './CoinSelect';
import ValueSelect from './ValueSelect';

const Form = ({ coins }) => {
  const [sell, setSell] = useState(0);
  const [get, setGet] = useState(0);
  const [sellCoin, setSellCoin] = useState('btc');
  const [getCoin, setGetCoin] = useState('eth');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      recalculateGet(sell);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [sell, sellCoin, getCoin, coins]);

  const recalculateGet = (val) => {
    if (val) {
      const calculatedGet = (
        (val / coins[sellCoin].value) *
        coins[getCoin].value
      ).toFixed(5);
      setGet(calculatedGet);
    }
  };

  const updateSell = (e) => {
    const newValue = e.target.value;
    setSell(newValue);
    recalculateGet(newValue);
  };

  const updateGet = (e) => {
    setGet(e.target.value);
  };

  const updateCoin = (coin, setCoin, otherCoin) => {
    if (coin === otherCoin) {
      setCoin(sellCoin);
    }
    setCoin(coin);
    recalculateGet(sell);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // initiate exchange
    setGet(0);
    setSell(0);
  };

  const valueSellProps = {
    name: 'sell',
    label: 'You sell',
    text: sell,
    updateValue: updateSell,
  };

  const coinSellProps = {
    coins,
    coin: sellCoin,
    updateCoin: (coin) => updateCoin(coin, setSellCoin, getCoin),
  };

  const valueBuyProps = {
    text: get,
    updateValue: updateGet,
    name: 'get',
    label: 'You get approximately',
    readOnly: true,
  };

  const coinBuyProps = {
    coins,
    coin: getCoin,
    updateCoin: (coin) => updateCoin(coin, setGetCoin, sellCoin),
  };

  return (
    <Grid>
      <form onSubmit={handleSubmit}>
        <Grid item sx={{ mt: 2, mb: 2 }}>
          <ValueSelect {...valueSellProps} />
          <CoinSelect {...coinSellProps} />
        </Grid>
        <Grid item sx={{ mt: 2, mb: 2 }}>
          <ValueSelect {...valueBuyProps} />
          <CoinSelect {...coinBuyProps} />
        </Grid>
        <Button variant='contained' type='submit'>
          Exchange
        </Button>
      </form>
    </Grid>
  );
};

export default Form;
