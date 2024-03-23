import React from 'react';
import { CircularProgress } from '@mui/material';
import Form from './Form';
import useCoinGecko from '../helper/useCoinGecko';

const Exchange = () => {
    const [data, error] = useCoinGecko('exchange_rates');

    if (error) {
        return <div>{`Oops! There was an error: ${error.message}`}</div>;
    }

    if (!data) {
        return <CircularProgress />;
    }

    return <Form coins={{ ...data.rates }} />;
};

export default Exchange;
