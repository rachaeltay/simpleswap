import React, { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
    Fade,
    Slide,
} from '@mui/material';
import {
    SwapHoriz,
    TrendingUp,
    AccountBalanceWallet,
} from '@mui/icons-material';
import CoinSelect from './CoinSelect';
import ValueSelect from './ValueSelect';

const Form = ({ coins }) => {
    const [sell, setSell] = useState(0);
    const [get, setGet] = useState(0);
    const [sellCoin, setSellCoin] = useState('btc');
    const [getCoin, setGetCoin] = useState('eth');
    const [showSwap, setShowSwap] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            recalculateGet(sell);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [sell, sellCoin, getCoin, coins]);

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
        setShowSwap(true);
        // Simulate swap animation
        setTimeout(() => {
            setGet(0);
            setSell(0);
            setShowSwap(false);
        }, 2000);
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
        readOnly: true,
    };

    const coinBuyProps = {
        coins,
        coin: getCoin,
        updateCoin: updateGetCoin,
    };

    return (
        <Fade in timeout={800}>
            <Box>
                <Card
                    elevation={3}
                    sx={{ borderRadius: 3, overflow: 'hidden' }}
                >
                    <CardContent
                        sx={{ p: 4 }}
                        display='flex'
                        alignItems='center'
                    >
                        <Box display='flex' alignItems='center' mb={3}>
                            <AccountBalanceWallet
                                sx={{ mr: 1, color: 'primary.main' }}
                            />
                            <Typography
                                variant='h5'
                                component='h2'
                                fontWeight='600'
                            >
                                Crypto Exchange
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            {/* Value Inputs */}
                            <Grid container spacing={3} sx={{ mb: 3 }}>
                                <Grid item xs={12} md={6}>
                                    <ValueSelect {...valueSellProps} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <ValueSelect {...valueBuyProps} />
                                </Grid>
                            </Grid>

                            {/* Coin Selection with Exchange Icon */}
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                gap={2}
                                sx={{ mb: 3 }}
                            >
                                {/* Sell Coin Select */}
                                <Box sx={{ minWidth: 200 }}>
                                    <CoinSelect {...coinSellProps} />
                                </Box>

                                {/* Exchange Icon */}
                                <Box
                                    sx={{
                                        p: 1,
                                        borderRadius: '50%',
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 40,
                                        height: 40,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                    onClick={() => {
                                        // Swap the coins
                                        const tempCoin = sellCoin;
                                        setSellCoin(getCoin);
                                        setGetCoin(tempCoin);
                                        recalculateGet(sell);
                                    }}
                                >
                                    <SwapHoriz />
                                </Box>

                                {/* Get Coin Select */}
                                <Box sx={{ minWidth: 200 }}>
                                    <CoinSelect {...coinBuyProps} />
                                </Box>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* Exchange Rate Info */}
                            {sell > 0 && get > 0 && (
                                <Slide direction='up' in timeout={500}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            mb: 3,
                                            borderRadius: 2,
                                            backgroundColor: 'info.light',
                                            color: 'info.contrastText',
                                        }}
                                    >
                                        <Box display='flex' alignItems='center'>
                                            <TrendingUp sx={{ mr: 1 }} />
                                            <Typography variant='body2'>
                                                Exchange Rate: 1{' '}
                                                {sellCoin.toUpperCase()} ={' '}
                                                {(
                                                    coins[getCoin].value /
                                                    coins[sellCoin].value
                                                ).toFixed(6)}{' '}
                                                {getCoin.toUpperCase()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Slide>
                            )}

                            {/* Submit Button */}
                            <Box display='flex' justifyContent='center'>
                                <Button
                                    variant='contained'
                                    type='submit'
                                    size='large'
                                    disabled={!sell || sell <= 0}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        minWidth: 200,
                                    }}
                                >
                                    {showSwap
                                        ? 'Processing...'
                                        : 'Exchange Now'}
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Fade>
    );
};

export default Form;
