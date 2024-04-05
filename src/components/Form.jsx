import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import CoinSelect from './CoinSelect';
import ValueSelect from './ValueSelect';

const Form = ({ coins }) => {
  const itemStyle = { mt: 2, mb: 2 };
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
      setGet(((val / coins[sellCoin].value) * coins[getCoin].value).toFixed(5));
    }
  };

  const updateSell = (e) => {
    setSell(e.target.value);
    recalculateGet(e.target.value);
  };

  const updateGet = (e) => {
    setGet(e.target.value);
  };

  const updateSellCoin = (e) => {
    // swap when the coin are set to the same
    if (e.target.value === getCoin) {
      setGetCoin(sellCoin);
    }
    setSellCoin(e.target.value);
    recalculateGet(sell);
  };

  const updateGetCoin = (e) => {
    // swap when the coin are set to the same
    if (e.target.value === sellCoin) {
      setSellCoin(getCoin);
    }
    setGetCoin(e.target.value);
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
    updateCoin: updateSellCoin,
  };

  const valueBuyProps = {
    text: get,
    updateValue: updateGet,
    name: 'get',
    label: 'You get approximately',
    readOnly: true, // Adding the readOnly prop
  };

  const coinBuyProps = {
    coins,
    coin: getCoin,
    updateCoin: updateGetCoin,
  };

  return (
    <Grid>
      <form onSubmit={handleSubmit}>
        <Grid item sx={itemStyle}>
          <ValueSelect {...valueSellProps} />
          <CoinSelect {...coinSellProps} />
        </Grid>
        <Grid item sx={itemStyle}>
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
