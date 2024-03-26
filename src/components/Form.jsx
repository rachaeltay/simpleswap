import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import CoinSelect from './CoinSelect';

const Form = ({ coins }) => {
    const [sell, setSell] = useState(0);
    const [get, setGet] = useState(0);
    const [sellCoin, setSellCoin] = useState('btc');
    const [getCoin, setGetCoin] = useState('eth');

    const recalculateGet = (val) => {
        if (val) {
            setGet(
                ((val / coins[sellCoin].value) * coins[getCoin].value).toFixed(
                    5
                )
            );
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

    const coinSellProps = {
        coins,
        coin: sellCoin,
        updateCoin: updateSellCoin,
        text: sell,
        updateText: updateSell,
        name: 'sell',
        label: 'You sell',
    };

    const coinBuyProps = {
        coins,
        coin: getCoin,
        updateCoin: updateGetCoin,
        text: get,
        updateText: updateGet,
        name: 'get',
        label: 'You get approximately',
        readOnly: true, // Adding the readOnly prop
    };

    return (
        <Grid>
            <form onSubmit={handleSubmit}>
                <CoinSelect {...coinSellProps} />
                <CoinSelect {...coinBuyProps} />
                <Button variant='contained' type='submit'>
                    Exchange
                </Button>
            </form>
        </Grid>
    );
};

export default Form;
